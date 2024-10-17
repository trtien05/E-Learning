"use client";
import ButtonEnroll from "@/app/(dashboard)/course/[slug]/ButtonEnroll";
import { IconPlay, IconStudy, IconUser } from "@/components/icons";
import React, { useState } from "react";
import CouponForm from "./CouponForm";

const CourseWidget = ({
  data,
  findUser,
}: {
  data: any;
  findUser: any;
}) => {
  const [price, setPrice] = useState<number>(data.price);
  return (
    <div className="bgDarkMode border borderDarkMode rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <strong className="text-primary font-bold text-xl">
          {price.toLocaleString()}đ
        </strong>
        <span className="text-slate-500 line-through">
          {data.sale_price.toLocaleString()}đ
        </span>
        <span className="bg-primary text-primary bg-opacity-10 px-3 py-1 rounded-lg ml-auto inline-block font-semibold text-sm">
          {Math.floor((price / data.sale_price) * 100)}%
        </span>
      </div>
      <h3 className="font-bold mb-3">Khóa học gồm có:</h3>
      <ul className="flex flex-col gap-3 text-sm mb-3 text-slate-500">
        <li className="flex items-center gap-2">
          <IconPlay className="size-4" />
          <span>30h học</span>
        </li>
        <li className="flex items-center gap-2">
          <IconPlay className="size-4" />
          <span>Video Full HD</span>
        </li>
        <li className="flex items-center gap-2">
          <IconUser className="size-4" />
          <span>Có nhóm hổ trợ</span>
        </li>
        <li className="flex items-center gap-2">
          <IconStudy className="size-4" />
          <span>Tài liệu kèm theo</span>
        </li>
      </ul>
      <ButtonEnroll
        user={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
        courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
        amount={price}
      ></ButtonEnroll>
      <CouponForm price={price} setPrice={setPrice} />
    </div>
  );
};

export default CourseWidget;
