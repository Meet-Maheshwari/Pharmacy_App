import mongoose from "mongoose";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { getUser } from "../utils.js";

export const getOrders = async (req, res) => {
  try {
    const user = await getUser(req, res);

    const orders = await Order.find({ user: user._id }).populate(
      "products.product"
    );

    if (!orders) {
      return res.status(400).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getOrders controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Order ID is required" });
    }
    console.log(id);

    const user = await getUser(req, res);
    const userId = user._id;
    console.log(userId);

    await Order.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { orders: id } });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log("Error in deleteOrder controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
