'use client'
import { lastLessonKey } from '@/constants';
import { useEffect } from 'react'

const LessonSaveUrl = ({ course, url }: { course: string, url: string }) => {
  useEffect(() => {
    let courses: any[] = JSON.parse(localStorage.getItem(lastLessonKey) || "[]") || [];
    const item = {
      course,
      lesson: url
    }
    courses = courses.filter(el => el.course !== course);
    courses.push(item);
    localStorage.setItem(lastLessonKey, JSON.stringify(courses));
  }, [course, url])
  return null
}

export default LessonSaveUrl