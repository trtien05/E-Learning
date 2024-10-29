import VideoPlayer from '@/app/(dashboard)/[course]/lesson/@player/VideoPlayer'
import LessonSaveUrl from '@/app/(dashboard)/[course]/lesson/LessonSaveUrl'
import PageNotFound from '@/app/not-found'
import { Heading } from '@/components/common'
import { getCourseBySlug } from '@/lib/actions/course.actions'
import { findAllLessons } from '@/lib/actions/lesson.actions'
import React from 'react'
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

const page = async ({
  searchParams,
  params
}: {
  params: {
    course: string
  },
  searchParams: {
    slug: string
  }
}) => {
  const { userId } = auth();
  const findUser = await getUserInfo({ userId: userId! });
  const course = params.course;
  const slug = searchParams.slug;
  if (!course || !slug) return <PageNotFound />
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const listLesson = await findAllLessons({ course: courseId || "" });
  const lessonDetails = listLesson?.find((el) => el.slug === slug);
  if (!lessonDetails) return null;
  const videoId = lessonDetails.video_url?.split('v=').at(-1);
  const currentLessonIndex = listLesson?.findIndex((el) => el.slug === slug) || 0;
  const prevLesson = listLesson?.[currentLessonIndex - 1];
  const nextLesson = listLesson?.[currentLessonIndex + 1];
  return (
    <div className='mb-5'>
      <LessonSaveUrl course={course} url={`${course}/lesson?slug=${slug}`} />
      <div>
        {/* <div className='relative aspect-video mb-5'>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className='w-full h-full object-fill'
          ></iframe>
          
        </div> */}
        <VideoPlayer
          nextLesson={
            !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
          }
          prevLesson={
            !prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`
          }
          data={{
            userId: findUser?._id.toString() || "",
            courseId,
          }}
        />
        <Heading className='mb-10'>{lessonDetails.title}</Heading>
        <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default page