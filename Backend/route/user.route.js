
import express from "express";
import { signup, login, getUserProfile } from "../controller/user.controller.js";
import { authenticate } from "../middleware/auth.js";
import User from "../model/user.model.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticate, getUserProfile);


// Get all users (Admin only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});


export default router;