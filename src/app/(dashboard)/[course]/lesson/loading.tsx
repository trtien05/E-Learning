import React from 'react'

const loading = () => {
  return (
    <div className='block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start'>
      <div>
        <div className="aspect-video mb-5 skeleton"></div>
        <div className="flex gap-3 mb-5">
          <div className="size-10 rounded-lg skeleton"></div>
          <div className="size-10 rounded-lg skeleton"></div>
        </div>
        <div className="w-full skeleton h-9 mb-10"></div>
      </div>
      <div>
        <div className='w-full rounded-full skeleton mb-2 h-3' />
        <div className='flex flex-col gap-5'>
          <div className='w-full h-14 skeleton rounded-lg' />
          <div className='w-full h-14 skeleton rounded-lg' />
        </div>
      </div>

    </div>
  )
}

export default loading