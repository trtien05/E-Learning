import LessonNavigation from '@/app/(dashboard)/[course]/lesson/LessonNavigation'
import LessonSaveUrl from '@/app/(dashboard)/[course]/lesson/LessonSaveUrl'
import PageNotFound from '@/app/not-found'
import { Heading } from '@/components/common'
import LessonContent from '@/components/lesson/LessonContent'
import { getCourseBySlug } from '@/lib/actions/course.actions'
import { getHistories } from '@/lib/actions/history.actions'
import { findAllLessons, getLessonBySlug } from '@/lib/actions/lesson.actions'
import { getUserInfo } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async ({ searchParams, params }:
  {
    params: {
      course: string
    },
    searchParams: {
      slug: string
    }
  }
) => {
  const { userId } = auth();
  if (!userId) return <PageNotFound />
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />
  const course = params.course;
  const slug = searchParams.slug;
  if (!course || !slug) return <PageNotFound />
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lessonDetails = await getLessonBySlug({
    slug: slug,
    course: courseId || ""
  })
  if (!lessonDetails) return null;
  const videoId = lessonDetails.video_url?.split('v=').at(-1);
  const listLesson = await findAllLessons({ course: courseId || "" });
  const currentLesson = listLesson?.findIndex((el) => el.slug === lessonDetails.slug) || 0;
  const prevLesson = listLesson?.[currentLesson - 1];
  const nextLesson = listLesson?.[currentLesson + 1];
  const lectures = findCourse?.lectures;
  const histories = await getHistories({ course: courseId })
  const completePercentage = ((histories?.length || 0) / (listLesson?.length || 1)) * 100;
  if (
    !findUser.courses.includes(courseId as any)
    // || findUser.role !== EUserRole.ADMIN
  )
    return <PageNotFound />

  return (
    <div className='block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start'>
      <LessonSaveUrl course={course} url={`${course}/lesson?slug=${slug}`} />
      <div>
        <div className='relative aspect-video mb-5'>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className='w-full h-full object-fill'
          ></iframe>
        </div>
        <div className="flex items-center justify-between mb-5">
          <LessonNavigation
            prevLesson={!prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`}
            nextLesson={!nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`}
          >
          </LessonNavigation>
          <div></div>
        </div>
        <Heading className='mb-10'>{lessonDetails.title}</Heading>
        <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}
          ></div>
        </div>
      </div>

      <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
        <div className='w-full rounded-full bgDarkMode border borderDarkMode mb-2 h-3'>
          <div className='bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-300'
            style={{
              width: `${completePercentage}%`
            }}
          ></div>
        </div>
        <LessonContent
          lectures={lectures}
          course={course}
          slug={slug}
          histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
        />
      </div>
    </div>
  )
}

export default page