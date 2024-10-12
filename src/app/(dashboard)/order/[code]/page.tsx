import PageNotFound from '@/app/not-found'
import { getOrderDetail } from '@/lib/actions/order.action'
import React from 'react'

const page = async ({ params }: { params: { code: string } }) => {
  const orderDetails = await getOrderDetail({ code: params.code })
  if (!orderDetails) return <PageNotFound />
  return (
    <div className='flex flex-col gap-5'>
      <p>
        Cám ơn bạn đã mua khóa học{" "}
        <strong className="text-primary">{orderDetails.title}</strong>{" "}
        với số tiền là{" "}
        <strong className="text-primary">{orderDetails.total}</strong>
      </p>
      <p>
        Bạn vui lòng thanh toán theo thông tin tài khoản dưới đây với nội dung{" "}
        <strong className="text-primary">{orderDetails.code}</strong>
      </p>
    </div>
  )
}

export default page