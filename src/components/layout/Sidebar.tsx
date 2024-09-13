'use client'
import { ActiveLink } from '@/components/common'
import { IconUser } from '@/components/icons'
import { ModeToggle } from '@/components/ModeToggle'
import { menuItems } from '@/constants'
import { TMenuItems } from '@/types'
import { useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

import React from 'react'

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className='hidden p-5 border-r lg:flex flex-col bgDarkMode borderDarkMode fixed top-0 left-0 bottom-0 w-[300px]'>
      <a href="/" className='font-bold text-3xl inline-block mb-5'>
        <span className='text-primary'>E</span>
        duVerse
      </a>
      <ul className='flex flex-col gap-2'>
        {menuItems.map((item, index) => (
          <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} />
        ))}
      </ul>
      <div className='flex mt-auto justify-end items-center gap-5'>
        {!userId ? (
          <Link
            href="/sign-in"
            className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1"
          >
            <IconUser />
          </Link>
        ) : (
          <UserButton />
        )}
        <ModeToggle />
      </div>
    </div>

  )
}

function MenuItem({ url = "/", title = "", icon }: TMenuItems) {

  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  )
}

export default Sidebar