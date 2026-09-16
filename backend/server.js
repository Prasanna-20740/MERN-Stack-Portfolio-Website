const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend is Running");
});

// Contact API
app.post("/api/contact", async (req, res) => {
  console.log("Contact API Called");

  try {
    const { name, email, subject, message } = req.body;

    console.log("Received Data:", {
      name,
      email,
      subject,
      message,
    });

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await newContact.save();

    console.log("Message Saved Successfully");

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.log("Contact Save Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save message",
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});