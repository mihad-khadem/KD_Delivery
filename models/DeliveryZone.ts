import { Schema, model, models } from "mongoose";

const deliveryZoneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    areas: {
      type: [String],
      default: [],
    },
    deliveryFee: {
      type: Number,
      required: true,
      min: 0,
    },
    minimumOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    estimatedDeliveryMinutes: {
      type: Number,
      default: 30,
      min: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const DeliveryZoneModel =
  models.DeliveryZone || model("DeliveryZone", deliveryZoneSchema);

export default DeliveryZoneModel;
