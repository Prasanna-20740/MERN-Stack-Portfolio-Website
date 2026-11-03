import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { name, email, subject, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ success: false, message: "Your name is required." });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ success: false, message: "A valid email is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message content cannot be empty." });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject && subject.trim() ? subject.trim() : "Portfolio Direct Message";
    const cleanMessage = message.trim();

    const smtpUser = process.env.SMTP_USER || "prasannaperiyasamy20@gmail.com";
    const smtpPass = process.env.SMTP_PASS || "gurtmfxhrdxpwggv";
    const receiver = process.env.RECEIVER_EMAIL || "prasanna812005@gmail.com";

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    function escapeHtml(str) {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    const mailOptions = {
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      to: receiver,
      subject: `[Portfolio Inquiry] ${cleanSubject} - from ${cleanName}`,
      text: `You received a new message from your portfolio:

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
Date: ${submissionTime}

Message:
${cleanMessage}
`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #059669 0%, #0284c7 100%); padding: 24px; color: #ffffff;">
            <h2 style="margin: 0 0 6px; font-size: 20px;">New Direct Message</h2>
            <p style="margin: 0; font-size: 13px; opacity: 0.9;">Received via MERN Portfolio website</p>
          </div>
          <div style="padding: 20px;">
            <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></p>
            <p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
            <p><strong>Date:</strong> ${escapeHtml(submissionTime)}</p>
            <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-left: 4px solid #10b981; border-radius: 6px;">
              <strong>Message:</strong><br/>
              <p style="white-space: pre-wrap; margin: 6px 0 0;">${escapeHtml(cleanMessage)}</p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${escapeHtml(cleanEmail)}" style="background: #059669; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Reply to ${escapeHtml(cleanName)}</a>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully. Thank you for reaching out!",
    });
  } catch (error) {
    console.error("Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to deliver message via email.",
    });
  }
}
