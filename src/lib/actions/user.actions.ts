"use server"
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateUserParams } from "@/types";

export default async function createUser(params: TCreateUserParams) {
  try {
    connectToDatabase();
    //gọi tới sẽ tạo ra collection trong database
    const newUser = await User.create(params);
    return newUser
  } catch (error) {
    console.log(error)
  }
}