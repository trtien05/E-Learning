"use server";

import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import {
  TCouponParams,
  TCreateCouponParams,
  TUpdateCouponParams,
} from "@/types";

export async function createCoupon(params: TCreateCouponParams) {
  try {
    connectToDatabase();
    const existingCoupon = await Coupon.findOne({
      code: params.code,
    });
    if (existingCoupon) {
      return { error: "Mã giảm giá đã tồn tại" };
    }
    const couponRegex = /^[A-Z0-9]{3,10}$/;
    if (!couponRegex.test(params.code)) {
      return { error: "Mã giảm giá không hợp lệ" };
    }
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
    const coupons = await Coupon.find(params).sort({ createdAt: -1 });
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
    const coupon = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });
    return JSON.parse(JSON.stringify(coupon));
  } catch (error) {
    console.log(error);
  }
}
export async function updateCoupon(params: TUpdateCouponParams) {
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
export async function getValidateCoupon(
  params: any
): Promise<TCouponParams | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));
    const couponCourses = coupon?.courses.map(
      (course: any) => course._id
    );
    let isActive = true;
    if (!couponCourses.includes(params.courseId)) isActive = false;
    if (coupon.active === false) {
      isActive = false;
    }
    if (coupon?.used > coupon?.limit) {
      isActive = false;
    }
    if (
      coupon?.start_date &&
      new Date(coupon?.start_date) > new Date()
    ) {
      isActive = false;
    }
    if (coupon?.end_date && new Date(coupon?.end_date) < new Date()) {
      isActive = false;
    }

    return isActive ? coupon : undefined;
  } catch (error) {
    console.log(error);
  }
}
