import LessonNavigation from '@/app/(dashboard)/[course]/lesson/LessonNavigation'
import PageNotFound from '@/app/not-found'
import LessonItem from '@/components/lesson/LessonItem'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getCourseBySlug } from '@/lib/actions/course.actions'
import { findAllLessons, getLessonBySlug } from '@/lib/actions/lesson.actions'
import { TUpdateCourseLecture } from '@/types'
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
  return (
    <div className='grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen'>
      <div>
        <div className='relative aspect-video mb-5'>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className='w-full h-full object-fill'
          ></iframe>
        </div>
        <div className="flex items-center justify-between">
          <LessonNavigation
            prevLesson={!prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`}
            nextLesson={!nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`}
          >
          </LessonNavigation>
          <div>

          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-3">
          {lectures.map((lecture: TUpdateCourseLecture) => (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              key={lecture._id}
            >
              <AccordionItem value={lecture._id.toString()}>
                <AccordionTrigger>
                  <div className='flex items-center gap-3 justify-between pr-5 w-full'>
                    <div>{lecture.title}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='!bg-transparent border-none p-0'>
                  <div className='flex flex-col gap-3'>
                    {lecture.lessons.map((lesson) => (
                      <LessonItem
                        key={lesson._id}
                        lesson={lesson}
                        url={`/${course}/lesson?slug=${lesson.slug}`}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

      </div>
    </div>
  )
}

export default page