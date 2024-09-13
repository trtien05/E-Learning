'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Heading from '@/components/typography/Heading'
import Image from 'next/image'
import { commonClassName, courseStatus } from '@/constants'
import { cn } from '@/lib/utils'
import { IconDelete, IconEdit, IconEye, IconStudy } from '@/components/icons'
import Link from 'next/link'
import { ICourse } from '@/database/course.model'
import Swal from 'sweetalert2'
import { updateCourse } from '@/lib/actions/course.actions'
import { ECourseStatus } from '@/types/enum'
import { toast } from "react-toastify";
import { Input } from '@/components/ui/input'

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const handleDeleteCourse = async (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      await updateCourse({
        slug,
        updateData: {
          status: ECourseStatus.REJECTED,
          _destroy: true
        },
        path: '/manage/course'
      }
      )
      if (result.isConfirmed) {
        toast.success('Your course has been deleted.')
      }
    });
  }

  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status: status === ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-10'>
        <Heading >Quản lý khóa học</Heading>
        <div className="w-[300px]">
          <Input placeholder='Tìm kiếm khóa học ...' />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 && courses.map(course => {
            const courseStatusItem = courseStatus.find((item) => item.value === course.status);
            return (
              <TableRow key={course.slug}>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Image
                      src={`${course.image}`}
                      width={80}
                      height={80}
                      alt=''
                      className='flex-shrink-0 rounded-lg size-16 object-cover'
                    />
                    <div className='flex flex-col gap-1'>
                      <h3 className='font-bold text-base'>{course.title}</h3>
                      <h4 className='text-slate-500 text-sm'>
                        {new Date(course.created_at).toLocaleDateString('vi-Vi')}
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-base">{course.price.toLocaleString()}đ</span>
                </TableCell>
                <TableCell>
                  <button type='button'
                    className={cn(commonClassName.status, courseStatusItem?.className)}
                    onClick={() => handleChangeStatus(course.slug, course.status)}
                  >
                    {courseStatusItem?.title}
                  </button>
                </TableCell>
                <TableCell>
                  <div className='flex gap-3'>
                    <Link
                      href={`/manage/course/update-content?slug=${course.slug}`}
                      className='border-[2px] p-2 rounded-md'
                    >
                      <IconStudy className='size-5' />
                    </Link>
                    <Link
                      href={`/course/${course.slug}`}
                      target='_blank'
                      className='border-[2px] p-2 rounded-md'
                    >
                      <IconEye className='size-5' />
                    </Link>
                    <Link
                      href={`/manage/course/update?slug=${course.slug}`}
                      className='border-[2px] p-2 rounded-md'
                    >
                      <IconEdit className='size-5' />
                    </Link>
                    <button className='border-[2px] p-2 rounded-md'
                      onClick={() => handleDeleteCourse(course.slug)}>
                      <IconDelete className='size-5' />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className='flex justify-end gap-3 mt-5'>
        <button className={commonClassName.paginationButton}>
          {IconArrowLeft}
        </button>
        <button className={commonClassName.paginationButton}>
          {IconArrowRight}
        </button>
      </div>
    </div>

  )
}
const IconArrowLeft = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
)

const IconArrowRight = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)


export default CourseManage