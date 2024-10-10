import { EOrderStatus } from "@/types/enum";
import { Document, Schema, model, models } from "mongoose";

export interface IOrder extends Document {
  _id: string;
  code: string;
  total: number;
  amount: number;
  discount: number;
  course: Schema.Types.ObjectId;
  created_at: Date;
  user: Schema.Types.ObjectId;
  status: EOrderStatus;
  coupon: Schema.Types.ObjectId;
}
const orderSchema = new Schema<IOrder>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  total: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  discount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: Object.values(EOrderStatus),
    default: EOrderStatus.PENDING,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },

});

const Order = models.Oder || model<IOrder>("Order", orderSchema);
export default Order;