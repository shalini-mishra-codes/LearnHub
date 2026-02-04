import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const hashPassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullname: fullname,
      email: email,
      password: hashPassword,
    });
    
    await createdUser.save();
    
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "your_secret_key", {
      expiresIn: "7d",
    });
    
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { fullname, email } = req.body;
    
    // Check if email already exists (excluding current user)
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: req.userId } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { fullname, email },
      { new: true }
    ).select("-password");
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};