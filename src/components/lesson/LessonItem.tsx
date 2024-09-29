import { IconPlay } from '@/components/icons'
import Link from 'next/link'
import React from 'react'

const LessonItem = ({
  lesson,
  url
}: {
  lesson: {
    title: string,
    duration: number
  },
  url?: string
}) => {
  return (
    <div className='flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-3 text-base font-medium'>
      <IconPlay className='size-5' />
      {url ? <Link href={"/"}>{lesson.title}</Link> : <h4>{lesson.title}</h4>}

      <span className='ml-auto text-xs font-semibold'>
        {lesson.duration} phút
      </span>
    </div>
  )
}

export default LessonItem