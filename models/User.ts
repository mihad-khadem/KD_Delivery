import { Schema, model, models } from "mongoose";

const addressSchema = new Schema(
  {
    label: {
      type: String,
      default: "Home",
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
  },
  { timestamps: false },
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "rider"],
      default: "customer",
      required: true,
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const UserModel = models.User || model("User", userSchema);

export default UserModel;
