'use client'
import { IconLeftArrow, IconRightArrow } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const LessonNavigation = ({ prevLesson, nextLesson }: { prevLesson: string, nextLesson: string }) => {
  const router = useRouter();
  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-3"
        disabled={!prevLesson}
        onClick={() => router.push(prevLesson)}>
        <IconLeftArrow />
      </Button>
      <Button
        className="size-10 p-3"
        disabled={!nextLesson}
        onClick={() => router.push(nextLesson)}
      >
        <IconRightArrow />
      </Button>
    </div>
  )
}

export default LessonNavigation