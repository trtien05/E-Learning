import { Heading } from '@/components/common'
import { getUserCourses } from '@/lib/actions/user.actions';
import StudyCourses from '@/app/(dashboard)/study/StudyCourses';

const page = async () => {
  const courses = await getUserCourses();
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyCourses courses={courses ? JSON.parse(JSON.stringify(courses)) : []} />
    </>
  )
}

export default page