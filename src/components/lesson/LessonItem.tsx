import { IconPlay } from '@/components/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const LessonItem = ({
  lesson,
  url,
  isActive
}: {
  lesson: {
    title: string,
    duration: number
  },
  url?: string,
  isActive?: boolean
}) => {
  return (
    <div className={cn('flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-3 text-sm font-medium',
      isActive ? "text-primary font-semibold pointer-events-none" : ""
    )}>
      <IconPlay className='size-5 flex-shrink-0' />
      {url ? (
        <Link href={url} className='line-clamp-1'>
          {lesson.title}
        </Link>
      ) : <h4 className='line-clamp-1'>{lesson.title}</h4>}
      <span className='ml-auto text-xs font-semibold flex-shrink-0'>
        {lesson.duration} phút
      </span>
    </div>
  )
}

export default LessonItem