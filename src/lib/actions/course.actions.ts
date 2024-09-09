"use server";
import Course from "@/database/course.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateCourseParams } from "@/types";

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