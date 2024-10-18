"use server";

import Coupon from "@/database/coupon.model";
import Course from "@/database/course.model";
import Order from "@/database/oder.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateOrderParams } from "@/types";
import { EOrderStatus } from "@/types/enum";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

export async function createOrder(params: TCreateOrderParams) {
  try {
    connectToDatabase();
    const newOrder = await Order.create(params);
    if (params.coupon) {
      await Coupon.findByIdAndUpdate(params.coupon, {
        $inc: { used: 1 },
      });
    }
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}

//Fetching
export async function getAllOrders(params: any) {
  try {
    connectToDatabase();
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      (query as any).$or = [
        { code: { $regex: search, $options: "i" } },
      ];
    }
    if (status) {
      (query as any).status = status;
    }
    const orders = Order.find(query)
      .populate({
        path: "course",
        model: Course,
        select: "title",
      })
      .populate({
        path: "user",
        model: User,
        select: "name",
      })
      .populate({
        path: "coupon",
        select: "code",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return orders;
  } catch (error) {
    console.log(error);
  }
}

//Update Order
export async function updateOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: EOrderStatus;
}) {
  try {
    connectToDatabase();

    const findOrder = await Order.findById(orderId)
      .populate({
        model: Course,
        path: "course",
        select: "_id",
      })
      .populate({
        model: User,
        path: "user",
        select: "_id",
      });
    if (!findOrder) return;
    if (findOrder.staus === EOrderStatus.CANCELED) return;
    const findUser = await User.findById(findOrder.user._id);
    await Order.findByIdAndUpdate(orderId, { status });
    if (
      status === EOrderStatus.CANCELED &&
      findOrder.status === EOrderStatus.COMPLETED
    ) {
      findUser.courses = findUser.courses.filter(
        (course: any) =>
          course.toString() !== findOrder.course._id.toString()
      );
      await findUser.save();
    }
    if (
      status === EOrderStatus.COMPLETED &&
      findOrder.status === EOrderStatus.PENDING
    ) {
      findUser.courses.push(findOrder.course._id);
      await findUser.save();
    }
    revalidatePath("/manage/order");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}

//Get order details
export async function getOrderDetail({ code }: { code: string }) {
  try {
    connectToDatabase();
    const order = await Order.findOne({ code }).populate({
      path: "course",
      select: "title",
    });
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log(error);
  }
}
