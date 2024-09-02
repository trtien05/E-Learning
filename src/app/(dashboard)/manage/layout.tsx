import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const AminLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId }: { userId: string | null } = auth()

  if (!userId) return redirect('/sign-in')
  return (
    <div>
      {children}
    </div>
  )
}

export default AminLayout