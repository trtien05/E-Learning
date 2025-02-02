"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heading, StatusBadge } from "@/components/common";
import { orderStatus } from "@/constants";
import { cn } from "@/lib/utils";
import { IconCancel, IconCheck } from "@/components/icons";
import Swal from "sweetalert2";
import { EOrderStatus } from "@/types/enum";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryString } from "@/components/hooks/useQueryString";
import { debounce } from "lodash";
import { updateOrder } from "@/lib/actions/order.action";
import { toast } from "react-toastify";
interface IOrderManageProps {
  _id: string;
  code: string;
  total: number;
  amount: number;
  discount: number;
  status: EOrderStatus;
  coupon: {
    code: string;
  };
  course: {
    title: string;
  };
  user: {
    name: string;
  };
}
const OrderManage = ({
  orders = [],
}: {
  orders: IOrderManageProps[];
}) => {
  const { createQueryString, router, pathname } = useQueryString();

  const handleUpdateOrder = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: EOrderStatus;
  }) => {
    try {
      if (status === EOrderStatus.CANCELED) {
        Swal.fire({
          title: "Bạn có chắc muốn hủy đơn hàng không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Hủy luôn",
          cancelButtonText: "Hủy",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await updateOrder({ orderId, status });
          }
        });
      }
      if (status === EOrderStatus.COMPLETED) {
        const res = await updateOrder({ orderId, status });
        if (res?.success) {
          toast.success("Cập nhật đơn hàng thành công");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchOrder = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(
        `${pathname}?${createQueryString("search", e.target.value)}`
      );
    },
    500
  );
  const handleSelectStatus = (status: EOrderStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm đơn hàng ..."
              onChange={(e) => handleSearchOrder(e)}
            />
          </div>
          <Select onValueChange={handleSelectStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {orderStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hoạt động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 &&
            orders.map((order) => {
              const orderStatusItem = orderStatus.find(
                (status) => status.value === order.status
              );
              return (
                <TableRow key={order.code}>
                  <TableCell>{order.code}</TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{order.amount.toLocaleString()}</span>
                      {order.discount > 0 && (
                        <span>
                          {order.discount.toLocaleString("us-US")}
                        </span>
                      )}
                      <strong
                        className={cn(
                          orderStatusItem?.className,
                          "bg-transparent"
                        )}
                      >
                        {order.total.toLocaleString("us-US")}
                      </strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <strong>{order.coupon?.code || ""}</strong>
                  </TableCell>
                  <TableCell>
                    <StatusBadge item={orderStatusItem} />
                  </TableCell>
                  <TableCell>
                    {order.status !== EOrderStatus.CANCELED && (
                      <div className="flex gap-3">
                        {order.status !== EOrderStatus.COMPLETED && (
                          <button
                            type="button"
                            className="border-[2px] p-2 rounded-md"
                            onClick={() =>
                              handleUpdateOrder({
                                status: EOrderStatus.COMPLETED,
                                orderId: order._id,
                              })
                            }
                          >
                            <IconCheck className="size-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          className="border-[2px] p-2 rounded-md"
                          onClick={() =>
                            handleUpdateOrder({
                              status: EOrderStatus.CANCELED,
                              orderId: order._id,
                            })
                          }
                        >
                          <IconCancel className="size-4" />
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderManage;
