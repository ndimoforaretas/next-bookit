import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    //maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    //   match: [
    //     // eslint-disable-next-line no-useless-escape
    //     /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //     "Please enter a valid email address",
    //   ],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
    //   public_id: {
    //     type: String,
    //     required: true,
    //   },
    //   url: {
    //     type: String,
    //     required: true,
    //   },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
