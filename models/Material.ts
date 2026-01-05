import mongoose, { Schema, models } from "mongoose";

const MaterialSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    subject: { type: String, required: true },
    level: { type: String, required: true },
    type: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    driveUrl: { type: String, required: true },
    quizUrl: String,
  },
  { timestamps: true }
);

export default models.Material ||
  mongoose.model("Material", MaterialSchema);
