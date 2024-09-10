"use server";
import Course, { ICourse } from "@/database/course.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateCourseParams, TUpdateCoureParams } from "@/types";
import { revalidatePath } from "next/cache";

//Fetching
export async function getCourseBySlug({ slug }: { slug: string }) {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug });
    return findCourse;
  } catch (error) {
    console.log(error)
  }
}

export async function getAllCourses(): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log(error)
  }
}

//CRUD
export async function createCourse(params: TCreateCourseParams) {
  try {
    connectToDatabase();
    const course = await Course.create(params);
    return {
      status: true,
      data: JSON.parse(JSON.stringify(course))
    }
  } catch (error) {
    console.log(error)
  }
}

export async function updateCourse(params: TUpdateCoureParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return null;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true
    })
    revalidatePath('/')
    return {
      success: true,
      message: 'Cập nhật khóa học thành công'
    }
  } catch (error) {
    console.log(error)
  }
}