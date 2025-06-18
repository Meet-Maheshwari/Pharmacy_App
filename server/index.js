import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/orders.js";
import chatbotRoutes from "./routes/chatbot.js";
import paymentRoutes from "./routes/payment.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const allowOrigins = ["https://mypharma-psi.vercel.app"];

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: allowOrigins, credentials: true }));
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Error while connecting to database", err.message);
    process.exit(1);
  }
}

startServer();


app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", chatbotRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/home", (req, res) => {
  res.send("Welcome to pharmacy app");
});
