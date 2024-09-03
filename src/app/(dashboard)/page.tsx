import { CourseGrid } from '@/components/common'
import CourseItem from '@/components/course/CourseItem'
import Heading from '@/components/typography/Heading'
import createUser from '@/lib/actions/user.actions'
import React from 'react'

const page = async () => {
  const vac = await createUser({
    clerkId: 'fds',
    name: 'tien',
    username: 'trantien',
    email: 'trantien100700@gmail.com',
    avatar: 'bcd'
  })
  return (
    <>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </>

  )
}

export default page