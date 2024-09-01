import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CourseItem = () => {
  return (
    <div className='bg-white border border-gray-200 p-5 rounded-2xl'>
      <Link href={'/'} className='block h-[200px]'>
        <Image
          alt='course_image'
          width={300}
          height={400}
          src={'https://images.unsplash.com/photo-1530092285049-1c42085fd395?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          className='w-full h-full object-cover rounded-sm'
          sizes='@media(min-width: 640px) 300px, 100vw'
          priority={true}
        />
      </Link>
    </div>
  )
}

export default CourseItem