import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  prodTitle: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: {
      org: { type: Number },
      mrp: { type: Number },
      off: { type: Number },
    },
    default: { org: 0.0, mrp: 0.0, off: 0 },
  },
  expiry: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ["Pain Relievers", "Allergy", "Protein & Vitamins", "Skin Care"],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  desc: {
    type: String,
  },
  benefits: {
    type: [String],
    default: [],
  },
  ingredients: {
    type: [String],
    default: [],
  },
  uses: {
    type: [String],
    default: [],
  },
  sideEffects: {
    type: [String],
    default: [],
  },
  direction: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
