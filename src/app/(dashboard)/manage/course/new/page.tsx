import { CourseAddNew } from '@/components/course/CourseAddNew'
import { Heading } from '@/components/common'
import React from 'react'

const page = () => {
  return (
    <>
      <Heading>Tạo khóa học mới</Heading>
      <CourseAddNew />
    </>

  )
}

export default page