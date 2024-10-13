import { ECouponType } from "@/types/enum";
import { Document, Schema, model, models } from "mongoose";

export interface ICoupon extends Document {
  _id: string;
  code: string;
  title: string;
  start_date: Date;
  end_date: Date;
  value: number;
  limit: number;
  created_at: Date;
  type: ECouponType;
  courses: Schema.Types.ObjectId[];
  active: boolean;
}
const couponSchema = new Schema<ICoupon>({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  type: {
    type: String,
    enum: Object.values(ECouponType),
    default: ECouponType.PERCENT,
  },
  value: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Coupon = models.Coupon || model<ICoupon>("Coupon", couponSchema);
export default Coupon;