import mongoose, { Document, Model } from "mongoose";


export interface ImageHashDocument extends Document {
  imageHash: string;
  diagnosisResult: string;
  confidenceLevel: string;
  createdAt: Date;
}

const ImageHashSchema = new mongoose.Schema(
  {
    imageHash: {
      type: String,
      required: true,
      unique: true,
    },
    diagnosisResult: {
      type: String,
      required: true,
    },
    confidenceLevel: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ImageHash: Model<ImageHashDocument> =
  mongoose.models.ImageHash ||
  mongoose.model<ImageHashDocument>("ImageHash", ImageHashSchema);

export default ImageHash;
