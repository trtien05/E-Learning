import OrderManage from '@/components/order/OrderManage'
import { getAllOrders } from '@/lib/actions/order.action'
import { EOrderStatus } from '@/types/enum'
import React from 'react'

const page = async ({ searchParams }: {
  searchParams: {
    page: number,
    search: string,
    status: EOrderStatus
  }
}) => {
  const orders = await getAllOrders({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status
  })
  return (
    <>
      <OrderManage orders={orders ? JSON.parse(JSON.stringify(orders)) : []} />
    </>
  )
}

export default page