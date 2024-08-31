import React from 'react'

const Sidebar = () => {
  return (
    <div className='p-5 border-r border-r-gray-200'>
      <a href="/" className='font-bold text-3xl inline-block mb-5'>
        LearnX
      </a>
      <ul>
        <MenuItem url="/" title='Khu vực học tập' />
        <MenuItem url="/explore" title='Khám phá' />

      </ul>
    </div>

  )
}

function MenuItem({ url = "/", title = "" }: { url: string, title: string }) {
  return (
    <li>
      <a href={url} className='p-3 rounded-md flex items-center'>
        {title}
      </a>
    </li>
  )
}

export default Sidebar