import mongoose from "mongoose";

const sellerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    storeName: String,
    whatsapp: String,
    address: String,
    city: String,
  },
  { timestamps: true }
);

export default mongoose.models.SellerProfile ||
  mongoose.model("SellerProfile", sellerProfileSchema);
