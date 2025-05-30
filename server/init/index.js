import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./stockData.js";
import Product from "../models/Product.js";

dotenv.config();

async function main() {
  await mongoose.connect(
    "mongodb+srv://meetmaheshwari2107:IqSQ7iboGHFYsffW@cluster0.icznkwu.mongodb.net/"
  );
}

main()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error while connecting to database", err));

const initDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(data);
  console.log("Data initialized successfully");
};

initDB();
