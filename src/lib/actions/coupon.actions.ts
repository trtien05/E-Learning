"use server";

import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose";

export async function createCoupon(
  params: ICoupon
): Promise<ICoupon | undefined> {
  try {
    connectToDatabase();
    const newCoupon = await Coupon.create(params);
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}
