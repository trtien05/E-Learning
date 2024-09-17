import { ICourse } from "@/database/course.model"
import { ILecture } from "@/database/lecture.model"

export type TMenuItems = {
    url: string,
    title: string,
    icon?: React.ReactNode,
    onlyIcon?: boolean
}

export type TActiveLinkProps = {
    url: string,
    children: React.ReactNode
}

export type TCreateUserParams = {
    clerkId: string;
    name?: string;
    username: string;
    email: string;
    avatar?: string;
}


//Course
export type TCreateCourseParams = {
    title: string;
    slug: string;
}

export type TUpdateCoureParams = {
    slug: string;
    updateData: Partial<ICourse>;
    path?: string;
}

export interface TCourseUpdateParams extends Omit<ICourse, 'lectures'> {
    lectures: ILecture[];
}
//Lecture
export type TCreateLectureParams = {
    course: string;
    title?: string;
    order?: number;
    path?: string;
}

export type TUpdateLectureParams = {
    lectureId: string;
    updateData: {
        title?: string;
        order?: number;
        _destroy?: boolean;
        path?: string;
    }
}

