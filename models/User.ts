import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: String,

    
    subscription: {
      type: Boolean,
      default: false,
    },

    
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },

    resetOtp: String,
    resetOtpExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
