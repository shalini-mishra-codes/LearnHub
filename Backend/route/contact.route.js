
import express from "express";
import Contact from "../model/Contact.model.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Save message + send email
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Save to database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email (only if EMAIL credentials are set)
    if (process.env.EMAIL && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.EMAIL,
          to: process.env.EMAIL,
          subject: "New Contact Message from BookStore",
          html: `
            <h3>New Message from BookStore Contact Form</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Message:</b> ${message}</p>
            <hr>
            <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
          `,
          replyTo: email
        });
      } catch (emailError) {
        console.log("Email sending failed (but message saved):", emailError.message);
        // Continue - message is already saved in DB
      }
    }

    res.status(201).json({ 
      success: true, 
      message: "Message sent successfully" 
    });

  } catch (error) {
    console.error("Contact Route Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error. Please try again later." 
    });
  }
});

// Admin get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    console.error("Get Messages Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching messages" 
    });
  }
});

// Get single message by ID
router.get("/:id", async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: "Message not found" 
      });
    }
    res.status(200).json({
      success: true,
      data: message
    });
  } catch (err) {
    console.error("Get Message Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching message" 
    });
  }
});

// Delete message by ID
router.delete("/:id", async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: "Message not found" 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: "Message deleted successfully" 
    });
  } catch (err) {
    console.error("Delete Message Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error deleting message" 
    });
  }
});

export default router;