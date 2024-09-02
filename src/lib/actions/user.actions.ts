'user server'

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";

export default async function createUser(params: IUser) {
  try {
    connectToDatabase();
    //gọi tới sẽ tạo ra collection trong database
    const newUser = await User.create(params);
    return newUser
  } catch (error) {

  }
}