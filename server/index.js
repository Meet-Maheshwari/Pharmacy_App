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

const allowOrigins = ["mypharma-three.vercel.app"];

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: allowOrigins, credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error while connecting to database", err));

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", chatbotRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/home", (req, res) => {
  res.send("Welcome to pharmacy app");
});
