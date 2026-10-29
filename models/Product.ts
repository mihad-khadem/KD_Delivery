import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    menuItemId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    prices: {
      one: {
        type: Number,
        required: true,
        min: 0,
      },
      three: {
        type: Number,
        required: true,
        min: 0,
      },
      five: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const ProductModel = models.Product || model("Product", productSchema);

export default ProductModel;
