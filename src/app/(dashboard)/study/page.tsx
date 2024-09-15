import { CourseGrid } from '@/components/common'
import CourseItem from '@/components/course/CourseItem'
import { Heading } from '@/components/common'
import { getAllCourses } from '@/lib/actions/course.actions'

const page = async () => {
  const courses = await getAllCourses() || [];

  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <CourseGrid>
        {courses.length > 0 && courses?.map((item) => (
          <CourseItem key={item.slug} data={item} />
        ))}
      </CourseGrid>
    </>
  )
}

export default page