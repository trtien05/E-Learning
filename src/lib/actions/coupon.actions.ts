"use server";

import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { TCouponParams } from "@/types";

export async function createCoupon(params: any) {
  try {
    connectToDatabase();
    const newCoupon = await Coupon.create(params);
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}
export async function getCoupons(
  params: any
): Promise<ICoupon[] | undefined> {
  try {
    connectToDatabase();
    const coupons = await Coupon.find(params);
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCoupon(code: string) {
  try {
    connectToDatabase();
    await Coupon.findOneAndDelete({ code });
    revalidatePath("/manage/coupon");
  } catch (error) {
    console.log(error);
  }
}
export async function getCouponByCode(
  params: any
): Promise<TCouponParams | undefined> {
  try {
    connectToDatabase();
    const coupons = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}
export async function updateCoupon(params: any) {
  try {
    connectToDatabase();
    const updateCoupon = await Coupon.findByIdAndUpdate(
      params._id,
      params.updateData
    );
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(updateCoupon));
  } catch (error) {}
}
