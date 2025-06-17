import User from "../models/User.js";
import { generateToken } from "../utils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are necessary" });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "This email already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      await user.save();
      generateToken(user._id, res);
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log("Error in signup controller", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const exist = await bcrypt.compare(password, user.password);

    if (!exist) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    generateToken(user._id, res);

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Token not found, please login" });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token!" });
    }

    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUser controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
