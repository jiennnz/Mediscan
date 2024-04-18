import mongoose, { Model } from "mongoose";

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  avatarLink?: string;
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    avatarLink: {
      type: String,
    },
  },
  { timestamps: true },
);

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;
