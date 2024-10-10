'use server'

import Order from "@/database/oder.model";
import { connectToDatabase } from "@/lib/mongoose"
import { TCreateOrderParams } from "@/types";

export async function createOrder(params: TCreateOrderParams) {
  try {
    connectToDatabase();
    const newOrder = Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error)
  }
}