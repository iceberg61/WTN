import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISellerProfile extends Document {
  userId: string;
  storeName: string;
  phone: string;
  products: string[];
}

const SellerProfileSchema: Schema = new Schema(
  {
    userId: String,
    storeName: String,
    phone: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const SellerProfile: Model<ISellerProfile> =
  mongoose.models.SellerProfile ||
  mongoose.model<ISellerProfile>("SellerProfile", SellerProfileSchema);

export default SellerProfile;
