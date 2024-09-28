import PageNotFound from '@/app/not-found'
import { IconLeftArrow, IconRightArrow } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { getCourseBySlug } from '@/lib/actions/course.actions'
import { getLessonBySlug } from '@/lib/actions/lesson.actions'
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
  const lessonDetails = await getLessonBySlug({
    slug: slug,
    course: findCourse?._id.toString()
  })
  if (!lessonDetails) return null;

  const videoId = lessonDetails.video_url.split('v=')[1];

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
          <div className="flex gap-3">
            <Button className="size-10 p-3">
              <IconLeftArrow />
            </Button>
            <Button className="size-10 p-3">
              <IconRightArrow />
            </Button>
          </div>
          <div></div>
        </div>
      </div>

      <div></div>
    </div>
  )
}

export default page