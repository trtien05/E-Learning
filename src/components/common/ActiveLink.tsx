'use client'
import { TActiveLinkProps } from '@/types/index'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const ActiveLink = ({ url, children }: TActiveLinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === url;
  return (
    <Link href={url}
      className={`p-3 rounded-md flex items-center gap-3 dark:text-grayDark text-base transition-all 
        ${isActive ?
          'text-primary bg-primary bg-opacity-10 font-medium svg-animate'
          :
          'hover:text-primary hover:bg-primary hover:bg-opacity-10'
        }`
      }
    >
      {children}
    </Link>
  )
}

export default ActiveLink