'use client'
import React, { useEffect } from 'react'

const LessonSaveUrl = ({ course, url }: { course: string, url: string }) => {
  useEffect(() => {
    const courses: any[] = JSON.parse(localStorage.getItem("lastLesson") || "[]") || [];
    const item = {
      course,
      lesson: url
    }
    if (courses.length > 0 &&
      courses.some(el => el.course === course && el.lesson === url)
    )
      return

    courses.push(item);
    localStorage.setItem("lastLesson", JSON.stringify(courses));
  }, [course, url])
  return null
}

export default LessonSaveUrl