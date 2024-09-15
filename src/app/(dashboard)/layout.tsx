import Sidebar, { MenuItem } from '@/components/layout/Sidebar'
import { menuItems } from '@/constants'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper pb-20 lg:pb-0 block lg:grid grid-cols-[300px,minmax(0,1fr)] h-screen">
      <Sidebar />
      <div className='hidden lg:block'></div>

      <ul className='flex p-3 bgDarkMode border-t borderDarkMode lg:hidden fixed bottom-0 left-0 w-full gap-5 justify-center h-16'>
        {menuItems.map((item, index) => (
          <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} onlyIcon />
        ))}
      </ul>

      <main className='p-5'>{children}</main>
    </div>
  )
}

export default layout