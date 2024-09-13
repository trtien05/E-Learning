import { IconClock, IconEye, IconStar } from '@/components/icons'
import { ICourse } from '@/database/course.model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const CourseItem = ({ data }: { data: ICourse }) => {
  const courseInfo = [
    {
      title: data.views,
      icon: (className: string) => <IconEye className={className} />
    },
    {
      title: data.rating[0],
      icon: (className: string) => <IconStar className={className} />
    },
    {
      title: '3h25m',
      icon: (className: string) => <IconClock className={className} />
    },
  ]

  return (
    <div className='bg-white border dark:bg-grayDarker dark:border-opacity-10 border-gray-200 p-4 rounded-2xl'>
      <Link href={`/course/${data.slug}`} className='block h-[180px] relative'>
        <Image
          alt='course_image'
          width={300}
          height={200}
          src={`${data.image}`}
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
          {data.title}
        </h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-grayDark">
          {courseInfo.map((item, index) => (
            <div className="flex items-center gap-1" key={index}>
              {item.icon('size-4')}
              <span>{item.title}</span>
            </div>
          ))}
          <span className='font-bold text-primary ml-auto text-base'>
            {data.price}
          </span>
        </div>
        <Link
          href={`/course/${data.slug}`}
          className='flex items-center justify-center w-full mt-10 rounded-lg text-white bg-primary font-semibold h-9'
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}

export default CourseItem