import express from "express";
import {
  addProducts,
  addProductToCart,
  deleteProduct,
  getProducts,
  placeOrder,
  removeProductFromCart,
  updateProduct,
} from "../controllers/product.js";
const router = express.Router();

router.post("/addProduct", addProducts);
router.get("/", getProducts);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);

router.post("/addToCart", addProductToCart);
router.post("/removeFromCart", removeProductFromCart);

router.post("/placeOrder", placeOrder);
export default router;
