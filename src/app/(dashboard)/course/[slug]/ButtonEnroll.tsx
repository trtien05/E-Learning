'use client'
import { Button } from '@/components/ui/button'
import { IUser } from '@/database/user.model'
import { createOrder } from '@/lib/actions/order.action'
import { createOderCode } from '@/utils'
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

  const handleEnrollCourse = async () => {
    console.log("user", user);
    console.log("amount", amount);
    console.log("courseId", courseId);
    if (!user?.name) {
      toast.error("Vui lòng đăng nhập để mua khóa học")
      return
    }
    const newOrderCourse = await createOrder({
      code: createOderCode(),
      user: user._id,
      course: courseId,
      total: amount,
      amount: amount
    })
    console.log("new Oder", newOrderCourse)
  }

  return (
    <Button variant='primary' className='w-full' onClick={handleEnrollCourse}>Mua Khóa Học</Button>
  )
}

export default ButtonEnroll