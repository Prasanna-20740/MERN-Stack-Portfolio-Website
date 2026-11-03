const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
      console.log("MongoDB Connection Error:", error.message);
    });
} else {
  console.log("MONGO_URI not configured; continuing without MongoDB");
}

// Nodemailer SMTP Transporter
const createTransporter = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const isSecure = process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const transporter = createTransporter();

// Verify SMTP connection on startup if credentials exist
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter.verify((error) => {
    if (error) {
      console.error("SMTP Configuration Warning:", error.message);
    } else {
      console.log(`SMTP Transporter Ready (${process.env.SMTP_USER})`);
    }
  });
}

// Home Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend is Running");
});

// Helper: Escape HTML to prevent injection in email template
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Contact API
app.post("/api/contact", async (req, res) => {
  console.log("Contact API Called");

  try {
    const { name, email, subject, message } = req.body;

    // Field validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Your name is required.",
      });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required.",
      });
    }

    // Email format regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email format.",
      });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message content cannot be empty.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject && subject.trim() ? subject.trim() : "New Portfolio Contact Inquiry";
    const cleanMessage = message.trim();

    console.log("Processing Contact Submission:", {
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      messageLength: cleanMessage.length,
    });

    // 1. Save to MongoDB (with graceful fallback if DB is down)
    let savedToDb = false;
    try {
      if (mongoose.connection.readyState === 1) {
        const newContact = new Contact({
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
        });
        await newContact.save();
        savedToDb = true;
        console.log("Message Saved to MongoDB Successfully");
      } else {
        console.log("MongoDB not connected; skipping database persistence");
      }
    } catch (dbErr) {
      console.warn("MongoDB Save Warning:", dbErr.message);
    }

    // 2. Deliver via SMTP Email
    const receiver = process.env.RECEIVER_EMAIL || process.env.SMTP_USER || "prasanna812005@gmail.com";
    const senderUser = process.env.SMTP_USER || "prasanna812005@gmail.com";
    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${senderUser}>`,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      to: receiver,
      subject: `[Portfolio Inquiry] ${cleanSubject} - from ${cleanName}`,
      text: `You have received a new message from your portfolio contact form:

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
Date: ${submissionTime}

Message:
${cleanMessage}

---
Reply directly to this email to contact ${cleanName} (${cleanEmail}).
`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 24px; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06); }
            .header { background: linear-gradient(135deg, #059669 0%, #0284c7 100%); padding: 28px 24px; color: #ffffff; }
            .header h1 { margin: 0 0 6px; font-size: 22px; font-weight: 700; letter-spacing: -0.01em; }
            .header p { margin: 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 24px; }
            .field-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; margin-bottom: 12px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; color: #64748b; margin-bottom: 4px; }
            .field-value { font-size: 15px; font-weight: 600; color: #0f172a; word-break: break-word; }
            .field-value a { color: #0284c7; text-decoration: none; }
            .message-box { background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #10b981; border-radius: 8px; padding: 16px; margin-top: 16px; font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-break: break-word; }
            .reply-btn-box { text-align: center; margin-top: 24px; }
            .reply-btn { display: inline-block; background: #059669; color: #ffffff !important; padding: 12px 26px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; box-shadow: 0 2px 6px rgba(5, 150, 105, 0.3); }
            .footer { padding: 18px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Direct Message</h1>
              <p>Received via your MERN Portfolio website contact form</p>
            </div>
            <div class="content">
              <div class="field-card">
                <div class="field-label">Sender Name</div>
                <div class="field-value">${escapeHtml(cleanName)}</div>
              </div>

              <div class="field-card">
                <div class="field-label">Sender Email</div>
                <div class="field-value">
                  <a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a>
                </div>
              </div>

              <div class="field-card">
                <div class="field-label">Subject</div>
                <div class="field-value">${escapeHtml(cleanSubject)}</div>
              </div>

              <div class="field-card">
                <div class="field-label">Received At</div>
                <div class="field-value" style="font-size: 13px; font-weight: 500; color: #475569;">${escapeHtml(submissionTime)}</div>
              </div>

              <div class="field-label" style="margin-top: 18px; margin-bottom: 6px;">Message Body</div>
              <div class="message-box">${escapeHtml(cleanMessage)}</div>

              <div class="reply-btn-box">
                <a href="mailto:${escapeHtml(cleanEmail)}?subject=Re:%20${encodeURIComponent(cleanSubject)}" class="reply-btn">
                  Reply to ${escapeHtml(cleanName)}
                </a>
              </div>
            </div>
            <div class="footer">
              Portfolio Contact Notification • Prasanna P • MERN Full Stack Developer
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const emailInfo = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully! MessageId:", emailInfo.messageId);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully. Thank you for reaching out!",
      savedToDb,
    });
  } catch (error) {
    console.error("Contact Submission Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to deliver message via email. Please try again later.",
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
