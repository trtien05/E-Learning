import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";
import { ILesson } from "@/database/lesson.model";
import { ECouponType } from "./enum";

export type TMenuItems = {
  url: string;
  title: string;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
};

export type TActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};

export type TCreateUserParams = {
  clerkId: string;
  name?: string;
  username: string;
  email: string;
  avatar?: string;
};

//Course
export type TCreateCourseParams = {
  title: string;
  slug: string;
};

export type TUpdateCoureParams = {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
};

export type TUpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: ILesson[];
};

export interface TCourseUpdateParams
  extends Omit<ICourse, "lectures"> {
  lectures: TUpdateCourseLecture[];
}
export interface StudyCoursesProps extends Omit<ICourse, "lectures"> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}
export type TGetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};
//Lecture
export type TCreateLectureParams = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};

export type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};

//Lesson
export type TCreateLessonParams = {
  lecture: string;
  course: string;
  title?: string;
  order?: string;
  slug?: string;
  path?: string;
};

export type TUpdateLessonParams = {
  lessonId: string;
  updateData: {
    title?: string;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
    path?: string;
  };
};

//History
export type TCreateHistoryParams = {
  course: string;
  lesson: string;
  checked: boolean | string;
  path?: string;
};

//Order
export type TCreateOrderParams = {
  code: string;
  user: string;
  course: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
};

//Coupon
export type TCouponParams = Omit<ICoupon, "courses"> & {
  courses: {
    _id: string;
    title: string;
  }[];
};
export type TCreateCouponParams = {
  title: string;
  code: string;
  type: ECouponType;
  value?: number;
  start_date?: Date;
  end_date?: Date;
  active?: boolean;
  limit?: number;
  courses?: string[];
};
export type TUpdateCouponParams = {
  _id: string;
  updateData: Partial<TCreateCouponParams>;
};
