import jwt from "jsonwebtoken";
import User from "./models/User.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    sameSite: "None", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export const getUser = async (req, res) => {
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
    const user = await User.findById(userId)
      .populate({
        path: "orders.order",
        populate: {
          path: "products.product",
          model: "Product",
        },
      })
      .populate("cart.product");
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    return user;
  } catch (error) {
    console.log("Error in getUser middleware", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
