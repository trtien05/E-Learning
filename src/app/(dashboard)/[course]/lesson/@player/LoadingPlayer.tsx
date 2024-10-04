import React from 'react'

const LoadingPlayer = () => {
  return (
    <div>
      <div className="aspect-video rounded-lg mb-5 skeleton"></div>
      <div className="flex gap-3 mb-5">
        <div className="size-10 rounded-lg skeleton"></div>
        <div className="size-10 rounded-lg skeleton"></div>
      </div>
      <div className="w-full skeleton h-9 mb-10"></div>
    </div>
  )
}

export default LoadingPlayer