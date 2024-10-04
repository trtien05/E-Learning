import React from 'react'

const LoadingOutline = () => {
  return (
    <div>
      <div className='w-full rounded-full skeleton mb-2 h-3' />
      <div className='flex flex-col gap-5'>
        <div className='w-full h-14 skeleton rounded-lg' />
        <div className='w-full h-14 skeleton rounded-lg' />
      </div>
    </div>
  )
}

export default LoadingOutline