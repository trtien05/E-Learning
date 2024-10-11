'use server'

import Course from "@/database/course.model";
import Order from "@/database/oder.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose"
import { TCreateOrderParams } from "@/types";
import { FilterQuery } from "mongoose";

export async function createOrder(params: TCreateOrderParams) {
  try {
    connectToDatabase();
    const newOrder = Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error)
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
      (query as any).$or = [{ code: { $regex: search, $options: "i" } }];
    }
    if (status) {
      (query as any).status = status;
    }
    const orders = Order.find(query)
      .populate({
        path: "course",
        model: Course,
        select: "title"
      })
      .populate({
        path: "user",
        model: User,
        select: "name"
      })
      .skip(skip)
      .limit(limit);
    return orders;
  } catch (error) {
    console.log(error)
  }
}