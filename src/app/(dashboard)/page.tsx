import { CourseGrid } from '@/components/common'
import CourseItem from '@/components/course/CourseItem'
import Heading from '@/components/typography/Heading'
import { getAllCourses } from '@/lib/actions/course.actions'
import React from 'react'

const page = async () => {
  const courses = await getAllCourses() || [];
  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses.length > 0 && courses?.map((item) => (
          <CourseItem key={item.slug} data={item} />
        ))}
      </CourseGrid>
    </>

  )
}

export default page