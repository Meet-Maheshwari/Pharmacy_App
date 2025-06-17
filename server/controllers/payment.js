import Razorpay from "razorpay";
import crypto from "crypto";
import RazorpayPayment from "../models/payment.js";
import dotenv from "dotenv";

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export const getKey = async (req, res) => {
  res.status(200).json({ key: instance.key_id });
};

export const checkOut = async (req, res) => {
  const options = {
    amount: Number(req.body.total * 100),
    currency: "INR",
  };
  await instance.orders
    .create(options)
    .then((order) => {
      res.status(200).json({
        success: true,
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const shasum = crypto.createHmac("sha256", instance.key_secret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const expected_signature = shasum.digest("hex");
  if (expected_signature === razorpay_signature) {
    const payment = await RazorpayPayment.findOne({
      razorpay_payment_id: razorpay_payment_id,
    });
    if (payment) {
      res.status(200).json({
        success: true,
        message: "Payment already done",
      });
    } else {
      await RazorpayPayment.create({
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
      })
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Payment done",
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            error: err,
          });
        });
    }
  } else {
    res.status(500).json({
      success: false,
      error: "Payment failed",
    });
  }
};
