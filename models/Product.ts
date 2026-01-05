import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  sellerId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductSchema: Schema = new Schema(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: "SellerProfile" },
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String,
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
