'use client'
import { Button } from '@/components/ui/button'
import { IUser } from '@/database/user.model'
import { createOrder } from '@/lib/actions/order.action'
import { createOderCode } from '@/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const ButtonEnroll = ({
  user,
  amount,
  courseId
}: {
  user: IUser | undefined | null,
  amount: number,
  courseId: string
}) => {
  const router = useRouter();

  const handleEnrollCourse = async () => {
    if (!user?.name) {
      toast.error("Vui lòng đăng nhập để mua khóa học")
      return
    }
    const newOrder = await createOrder({
      code: createOderCode(),
      user: user._id,
      course: courseId,
      total: amount,
      amount: amount
    })
    if (newOrder.code) {
      router.push(`/order/${newOrder.code}`)
    }
  }

  return (
    <Button variant='primary' className='w-full' onClick={handleEnrollCourse}>Mua Khóa Học</Button>
  )
}

export default ButtonEnroll