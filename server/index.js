import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

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

app.get("/home", (req, res) => {
  res.send("Welcome to pharmacy app");
});
