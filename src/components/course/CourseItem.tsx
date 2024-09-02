import { IconClock, IconEye, IconStar } from '@/components/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const courseInfo = [
  {
    title: '3000',
    icon: (className: string) => <IconEye className={className} />
  },
  {
    title: '5',
    icon: (className: string) => <IconStar className={className} />
  },
  {
    title: '3h25m',
    icon: (className: string) => <IconClock className={className} />
  },
]

const CourseItem = () => {
  return (
    <div className='bg-white border dark:bg-grayDarker dark:border-opacity-10 border-gray-200 p-4 rounded-2xl'>
      <Link href={'/'} className='block h-[180px] relative'>
        <Image
          alt='course_image'
          width={300}
          height={200}
          src={'https://images.unsplash.com/photo-1530092285049-1c42085fd395?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          className='w-full h-full object-cover rounded-lg'
          sizes='@media(min-width: 640px) 300px, 100vw'
          priority={true}
        />
        <span className='inline-block absolute py-1 px-3 bg-green-500 top-3 right-3 rounded-full z-10 text-white font-medium text-sm'>
          New
        </span>
      </Link>
      <div className="pt-4">
        <h3 className='font-bold mb-3 text-base'>
          Khóa học NextJS Pro - Xây dựng EduVerse system hoàn chỉnh
        </h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark">
          {courseInfo.map((item, index) => (
            <div className="flex items-center gap-1" key={index}>
              {item.icon('size-4')}
              <span>{item.title}</span>
            </div>
          ))}
          <span className='font-bold text-primary ml-auto text-base'>
            799.000
          </span>
        </div>
        <Link
          href={"#"}
          className='flex items-center justify-center w-full mt-10 rounded-lg text-white bg-primary font-semibold h-9'
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}

export default CourseItem