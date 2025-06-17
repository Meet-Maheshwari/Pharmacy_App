import express from "express";
import { deleteOrder, getOrders } from "../controllers/orders.js";

const router = express.Router();

router.get("/", getOrders);

router.delete("/order/:id", deleteOrder);

export default router;
