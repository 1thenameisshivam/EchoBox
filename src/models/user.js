import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: [true, "username is already taken"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    lowercase: true,
    unique: [true, "email is already registered"],
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "email is invalid"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "varifyCode is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCodeExpires: {
    type: Date,
    required: [true, "varifyCodeExpires is required"],
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
