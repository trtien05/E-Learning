"use server"
import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateUserParams } from "@/types";

export async function createUser(params: TCreateUserParams) {
  try {
    connectToDatabase();
    //gọi tới sẽ tạo ra collection trong database
    const newUser = await User.create(params);
    return newUser
  } catch (error) {
    console.log(error)
  }
}

export async function getUserInfo({ userId }: { userId: string })
  :
  Promise<IUser | null | undefined> {
  try {
    connectToDatabase();
    const findUser = User.findOne({ clerkId: userId });
    if (!findUser) {
      return null;
    }
    return findUser
  } catch (error) {
    console.log(error)
  }
}