"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heading, StatusBadge } from "@/components/common";
import Image from "next/image";
import { commonClassName, courseStatus } from "@/constants";
import {
  IconDelete,
  IconEdit,
  IconEye,
  IconLeftArrow,
  IconRightArrow,
  IconStudy,
} from "@/components/icons";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enum";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import { useQueryString } from "@/components/hooks/useQueryString";

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const { createQueryString, router, pathname } = useQueryString();
  const [page, setPage] = useState(1);

  const handleDeleteCourse = async (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      await updateCourse({
        slug,
        updateData: {
          status: ECourseStatus.REJECTED,
          _destroy: true,
        },
        path: "/manage/course",
      });
      if (result.isConfirmed) {
        toast.success("Your course has been deleted.");
      }
    });
  };

  const handleChangeStatus = async (
    slug: string,
    status: ECourseStatus
  ) => {
    try {
      Swal.fire({
        title: "Bạn có chắc muốn đổi trạng thái không?",
        showCancelButton: true,
        confirmButtonText: "Cập nhật",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status:
                status === ECourseStatus.PENDING
                  ? ECourseStatus.APPROVED
                  : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công!");
          router.push(
            `${pathname}?${createQueryString(
              "status",
              ""
            )}&${createQueryString("search", "")}`
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectStatus = (status: ECourseStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };

  const handleSearchCourse = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(
        `${pathname}?${createQueryString("search", e.target.value)}`
      );
      setPage(1);
    },
    500
  );

  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    if (type === "prev") setPage((prev) => prev - 1);
    if (type === "next") setPage((prev) => prev + 1);
  };

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString("page", page.toString())}`
    );
  }, [page, createQueryString, pathname, router]);

  return (
    <div>
      <Link
        href={"/manage/course/new"}
        className="bg-primary text-white fixed flexCenter rounded-full animate-bounce right-5 bottom-5 size-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý khóa học</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm khóa học ..."
              onChange={(e) => handleSearchCourse(e)}
            />
          </div>
          <Select onValueChange={handleSelectStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseStatus.map((status) => (
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
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((course) => {
              const courseStatusItem = courseStatus.find(
                (item) => item.value === course.status
              );
              return (
                <TableRow key={course.slug}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={`${course.image}`}
                        width={80}
                        height={80}
                        alt=""
                        className="flex-shrink-0 rounded-lg size-16 object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-sm lg:text-base whitespace-nowrap">
                          {course.title}
                        </h3>
                        <h4 className="text-xs lg:text-sm text-slate-500">
                          {new Date(
                            course.created_at
                          ).toLocaleDateString("vi-Vi")}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-sm lg:text-base">
                      {course.price.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      item={courseStatusItem}
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={`/manage/course/update-content?slug=${course.slug}`}
                        className="border-[2px] p-2 rounded-md"
                      >
                        <IconStudy className="size-5" />
                      </Link>
                      <Link
                        href={`/course/${course.slug}`}
                        target="_blank"
                        className="border-[2px] p-2 rounded-md"
                      >
                        <IconEye className="size-5" />
                      </Link>
                      <Link
                        href={`/manage/course/update?slug=${course.slug}`}
                        className="border-[2px] p-2 rounded-md"
                      >
                        <IconEdit className="size-5" />
                      </Link>
                      <button
                        className="border-[2px] p-2 rounded-md"
                        onClick={() =>
                          handleDeleteCourse(course.slug)
                        }
                      >
                        <IconDelete className="size-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button
          className={commonClassName.paginationButton}
          onClick={() => handleChangePage("prev")}
        >
          <IconLeftArrow />
        </button>
        <button
          className={commonClassName.paginationButton}
          onClick={() => handleChangePage("next")}
        >
          <IconRightArrow />
        </button>
      </div>
    </div>
  );
};

export default CourseManage;
