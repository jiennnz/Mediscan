import mongoose, { Document, Model } from "mongoose";

// Define the schema for storing image hashes
interface ImageHashDocument extends Document {
  hash: string;
}

// Define the schema for the image hash collection
const ImageHashSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true, // Enforce uniqueness of hash values
  },
});

// Create the ImageHash model
const ImageHash: Model<ImageHashDocument> =
  mongoose.models.ImageHash ||
  mongoose.model<ImageHashDocument>("ImageHash", ImageHashSchema);

export default ImageHash;
