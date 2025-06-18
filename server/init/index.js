import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./stockData.js";
import Product from "../models/Product.js";

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error while connecting to database", err));

const initDB = async () => {
  await Product.deleteMany({});
  const modifiedData = data.map((dt) => ({
    ...dt,
    inStock: true,
  }));
  await Product.insertMany(modifiedData);
  console.log("Data initialized successfully");
};

initDB();
