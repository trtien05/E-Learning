import CourseUpdate from '@/components/course/CourseUpdate'
import Heading from '@/components/typography/Heading'
import React from 'react'

const page = ({ searchParams }: { searchParams: { slug: string } }) => {
  return (
    <div>
      <Heading className='mb-8'>Cập nhật khóa học</Heading>
      <CourseUpdate />
    </div>
  )
}

export default page