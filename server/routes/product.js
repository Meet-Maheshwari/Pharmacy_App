import express from "express";
import {
  addProducts,
  addProductToCart,
  deleteProduct,
  getCartItems,
  getProducts,
  placeDirectOrder,
  placeOrder,
  removeProductFromCart,
  searchByCategory,
  searchProductByName,
  searchProducts,
  showProduct,
  updateProduct,
} from "../controllers/product.js";
const router = express.Router();

router.post("/addProduct", addProducts);
router.get("/", getProducts);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);

router.get("/cart", getCartItems);
router.post("/addToCart", addProductToCart);
router.post("/removeFromCart", removeProductFromCart);

router.post("/placeOrder", placeOrder);
router.post("/placeDirectOrder", placeDirectOrder);

router.get("/category/:category", searchByCategory);
router.get("/search", searchProducts);

router.get("/searchByName", searchProductByName);
router.get("/:id", showProduct);

export default router;
