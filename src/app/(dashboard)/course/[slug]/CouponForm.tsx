"use client";
import { Input } from "@/components/ui/input";
import { getValidateCoupon } from "@/lib/actions/coupon.actions";
import { ECouponType } from "@/types/enum";
import { debounce } from "lodash";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

const CouponForm = ({
  originalPrice,
  setPrice,
  setCouponId,
  courseId,
}: {
  originalPrice: number;
  setPrice: Dispatch<SetStateAction<number>>;
  setCouponId: Dispatch<SetStateAction<string>>;
  courseId: string;
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    setIsApplied(false);
  }, [couponCode]);

  const handleApplyCoupon = async () => {
    if (isApplied) return;
    try {
      const coupon = await getValidateCoupon({
        code: couponCode.toUpperCase(),
        courseId,
      });
      const couponType = coupon?.type;
      if (!coupon) {
        toast.error("Mã giảm giá không tồn tại");
        setCouponCode("");
        setCouponId("");
        return;
      }
      let finalPrice = originalPrice;
      if (couponType === ECouponType.PERCENT) {
        finalPrice =
          originalPrice - (originalPrice * coupon?.value) / 100;
      } else if (couponType === ECouponType.AMOUNT) {
        finalPrice = originalPrice - coupon?.value;
      }
      setPrice(finalPrice);
      toast.success("Áp dụng mã giảm giá thành công");
      setCouponId(coupon._id);
      setIsApplied(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCode = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCouponCode(e.target.value);
    },
    500
  );
  return (
    <div className="mt-5 relative">
      <Input
        placeholder="Nhập mã giảm giá"
        className="pr-20 uppercase font-semibold"
        onChange={handleChangeCode}
        defaultValue={couponCode}
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
