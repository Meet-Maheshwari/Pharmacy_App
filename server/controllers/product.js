import Product from "../models/Product.js";
import moment from "moment";
import { getUser } from "../utils.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

export const searchByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const products = await Product.find({ category });
    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log("Error in search Controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchProductByName = async (req, res) => {
  try {
    const { prodName } = req.query;

    if (!prodName) {
      return res.status(400).json("Product name is unavailable");
    }

    const product = await Product.findOne({
      prodTitle: { $regex: new RegExp(prodName, "i") },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error in searchProductByName controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, inStock, brands } = req.query;

    let filter = {};

    const rawSearch = req.query.search?.trim();
    if (req.query.search) {
      const searchRegex = new RegExp(rawSearch, "i");
      filter.$or = [
        { prodTitle: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
      ];
    }

    // Category filter
    if (category && category !== "All") {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    // Price filter — filter by price.org
    if (minPrice || maxPrice) {
      filter["price.org"] = {};
      if (minPrice) filter["price.org"].$gte = Number(minPrice);
      if (maxPrice) filter["price.org"].$lte = Number(maxPrice);
    }

    // Availability filter — assuming you add an inStock field later
    if (inStock === "true") {
      filter.inStock = true;
    }

    // Brand filter
    if (brands) {
      const brandList = Array.isArray(brands)
        ? brands
        : brands.split(",").map((b) => b.trim());
      filter.brand = { $in: brandList.map((b) => new RegExp(`^${b}$`, "i")) };
    }

    if (req.query.prodTitle) {
      filter.prodTitle = { $regex: new RegExp(req.query.prodTitle, "i") };
    }

    const products = await Product.find(filter);

    if (!products.length) {
      return res.status(404).json({ message: "No products match the filters" });
    }

    res.status(200).json(products || []);
  } catch (error) {
    console.error("Error in searchProducts controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

//CART Controllers

export const getCartItems = async (req, res) => {
  try {
    let user = await getUser(req, res);
    const cartItems = user.cart;
    if (!cartItems) {
      return res.status(400).json({ message: "Cart in not available" });
    }
    return res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in getCartItems controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

      if (user.cart[existingCartItemIdx].quantity <= 0) {
        user.cart.splice(existingCartItemIdx, 1); // Remove the product if quantity <= 0
      }
    } else {
      if (quantity === 0) {
        user.cart.pop({ product: productId, quantity });
      } else {
        user.cart.push({ product: productId, quantity });
      }
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
    const { formData, total } = req.body;

    if (
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.zipCode ||
      !formData.paymentMethod ||
      !total
    ) {
      return res.status(400).json("All fields are required");
    }

    let user = await getUser(req, res);

    const order = new Order({
      user,
      total_price: total,
      customerAddress: {
        deliveryAdd: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
      },
      paymentMethod: formData.paymentMethod,
      products: user.cart,
    });

    await order.save();

    if (!order) {
      return res
        .status(400)
        .json({ message: "Unable to place order, please try again!" });
    }

    user.orders.push(order);
    user.cart = [];
    await user.save();

    res.status(200).json("Order Placed successfully");
  } catch (error) {
    console.log("Error in placeOrder controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const placeDirectOrder = async (req, res) => {
  try {
    const { formData, product, quantity, total } = req.body;

    if (
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.zipCode ||
      !formData.paymentMethod ||
      !total
    ) {
      return res.status(400).json("All fields are required");
    }

    let user = await getUser(req, res);

    const order = new Order({
      user,
      total_price: total,
      customerAddress: {
        deliveryAdd: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
      },
      paymentMethod: formData.paymentMethod,
      products: {
        product: product._id,
        quantity: quantity,
      },
    });

    await order.save();

    if (!order) {
      return res
        .status(400)
        .json({ message: "Unable to place order, please try again!" });
    }

    user.orders.push(order);
    await user.save();

    res.status(200).json("Order Placed successfully");
  } catch (error) {
    console.log("Error in placeDirectOrder controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const showProduct = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("Error is showProduct controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
