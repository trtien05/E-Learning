import PageNotFound from '@/app/not-found';
import LessonContent from '@/components/lesson/LessonContent';
import { getCourseBySlug } from '@/lib/actions/course.actions';
import { getHistories } from '@/lib/actions/history.actions';
import { countLessonByCourseId } from '@/lib/actions/lesson.actions';
import React from 'react'

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
}
) => {
  const course = params.course;
  const slug = searchParams.slug;
  if (!course || !slug) return <PageNotFound />
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lectures = findCourse?.lectures;
  const histories = await getHistories({ course: courseId })
  const listCourse = await countLessonByCourseId({ courseId });
  const completePercentage = ((histories?.length || 0) / (listCourse || 1)) * 100;

  return (
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
  )
}

export default page