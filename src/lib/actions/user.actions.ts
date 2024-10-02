"use server"
import Course, { ICourse } from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateUserParams } from "@/types";
import { ECourseStatus } from "@/types/enum";
import { auth } from "@clerk/nextjs/server";

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

export async function getUserCourses(): Promise<ICourse[] | undefined | null> {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: 'courses',
      model: Course,
      match: {
        status: ECourseStatus.APPROVED,
      },
      populate: {
        path: "lectures",
        model: Lecture,
        select: "lessons",
        populate: {
          path: "lessons",
          model: Lesson,
          select: "slug",
        },
      },
    });
    if (!findUser) return null;
    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}