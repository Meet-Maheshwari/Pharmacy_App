import Product from "../models/Product.js";
import moment from "moment";
import { getUser } from "../utils.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

export const addProducts = async (req, res) => {
  try {
    if (!req.body.product) {
      return res.status(400).json({ message: "Product is required" });
    }
    if (req.body.product.expiry) {
      req.body.product.expiry = moment(
        req.body.product.expiry,
        "DD/MM/YYYY"
      ).toDate();
    }
    const product = req.body.product;
    const newProduct = new Product(product);
    await newProduct.save();

    if (!newProduct) {
      return res.status(400).json({ message: "Cannot add product" });
    }

    res.status(200).json({ message: "Product added successfully" });
  } catch (err) {
    console.log("Error in addProducts controller", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    let allProducts = await Product.find();

    if (!allProducts) {
      return res.status(400).send({ message: "Unable to fetch allProducts" });
    }

    res.status(200).json(allProducts);
  } catch (error) {
    console.log("Error in getProducts controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(400).json({ message: "Unable to delete product" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }

    if (!req.body.product) {
      return res.status(400).json({ message: "Product is required" });
    }
    if (req.body.product.expiry) {
      req.body.product.expiry = moment(
        req.body.product.expiry,
        "DD/MM/YYYY"
      ).toDate();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...req.body.product },
      { new: true }
    );

    if (!updateProduct) {
      return res.status(400).json({ message: "Unable to update product" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.log("Error in updateProduct", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//adding products to cart

export const addProductToCart = async (req, res) => {
  try {
    let { productId, quantity = 1 } = req.body;

    let user = await getUser(req, res);

    const existingCartItemIdx = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );
    if (existingCartItemIdx !== -1) {
      user.cart[existingCartItemIdx].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity: quantity });
    }
    await user.save();

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.log("Error in addProductToCart controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    let { productId, quantity = 1 } = req.body;

    let user = await getUser(req, res);

    const existingCartItemIdx = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );

    if (existingCartItemIdx !== -1) {
      user.cart[existingCartItemIdx].quantity -= quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.log("Error in removeProductFromCart controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//order
export const placeOrder = async (req, res) => {
  try {
    const { products, address, total } = req.body;

    if (!products || !address || !total) {
      return res.status(400).json("All fields are required");
    }

    const user = await getUser(req, res);

    const order = new Order({
      user,
      total_price: total,
      address,
      products,
    });

    await order.save();
    user.orders.push(order);
    user.cart = [];
    await user.save();

    if (!order) {
      return res
        .status(400)
        .json({ message: "Unable to place order, please try again!" });
    }

    res.status(200).json("Order Placed successfully");
  } catch (error) {
    console.log("Error in createOrder controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
