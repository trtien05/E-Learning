"use client";
import TableActionItem from "@/components/common/TableActionItem";
import { deleteCoupon } from "@/lib/actions/coupon.actions";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ActionDeleteButton = ({ code }: { code: string }) => {
  const handleDeleteCoupon = async (code: string) => {
    try {
      Swal.fire({
        title: "Bạn có chắc muốn xóa coupon này không?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa luôn",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCoupon(code);
          toast.success("Xóa coupon thành công.");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableActionItem
      type="delete"
      onClick={() => handleDeleteCoupon(code)}
    />
  );
};

export default ActionDeleteButton;
