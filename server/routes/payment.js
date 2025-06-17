import express from "express";
const router = express.Router();

import {
  getKey,
  checkOut,
  paymentVerification,
} from "../controllers/payment.js";

router.get("/key", getKey);
router.post("/checkout", checkOut);
router.post("/paymentverification", paymentVerification);

export default router;
