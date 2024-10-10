import { CourseGrid, Heading } from '@/components/common'
import CourseItem from '@/components/course/CourseItem'
import { getAllCoursesPublic } from '@/lib/actions/course.actions'
import React from 'react'

const page = async () => {
  const courses = (await getAllCoursesPublic({})) || [];
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