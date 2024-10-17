import { Input } from "@/components/ui/input";
import { getValidateCoupon } from "@/lib/actions/coupon.actions";
import { ECouponType } from "@/types/enum";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const CouponForm = ({
  price,
  setPrice,
}: {
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
}) => {
  const [couponCode, setCouponCode] = useState("");
  const handleApplyCoupon = async () => {
    try {
      const coupon = await getValidateCoupon({
        code: couponCode.toUpperCase(),
      });
      const couponType = coupon?.type;
      if (!coupon) {
        toast.error("Mã giảm giá không tồn tại");
      }
      let finalPrice = price;
      if (couponType === ECouponType.PERCENT) {
        finalPrice = price - (price * coupon?.value) / 100;
      } else if (couponType === ECouponType.AMOUNT) {
        finalPrice = price - coupon?.value;
      }
      setPrice(finalPrice);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-5 relative">
      <Input
        placeholder="Nhập mã giảm giá"
        className="pr-20 uppercase font-semibold"
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-sm"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CouponForm;
