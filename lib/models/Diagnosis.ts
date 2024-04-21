import mongoose, { Document, Model } from "mongoose";

// Define the interface for the diagnosis document
export interface DiagnosisDocument extends Document {
  userId: mongoose.Types.ObjectId;
  imageName: string;
  imageURL: string;
  diagnosisResult: string;
  confidenceLevel: string;
  createdAt: string;
}

// Define the schema for the diagnosis document
const DiagnosisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    imageName: {
      type: String,
      default: () => `X-RayImage-${Math.random().toString(36).substring(2, 7)}`, // Generate random default imageName
      index: true, // Add index for better performance
    },
    imageURL: {
      type: String,
      required: true,
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

// Define the Diagnosis model
const Diagnosis: Model<DiagnosisDocument> =
  mongoose.models.Diagnosis ||
  mongoose.model<DiagnosisDocument>("Diagnosis", DiagnosisSchema);

export default Diagnosis;
