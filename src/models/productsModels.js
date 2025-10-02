import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    category:   { type: String, required: true, trim: true },
    price:      { type: Number, required: true, min: 0 },
    status:     { type: String, enum: ["active", "inactive", "out_of_stock"], default: "active" }
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
