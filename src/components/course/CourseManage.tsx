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

const CourseManage = () => {
  return (
    <div>
      <Heading className='mb-10'>Quản lý khóa học</Heading>
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
          <TableRow>
            <TableCell>
              <div className='flex items-center gap-3'>
                <Image
                  src={'https://images.unsplash.com/photo-1519092503391-16a955fda811?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                  width={80}
                  height={80}
                  alt=''
                />
                <div className='flex flex-col gap-1'>
                  <h3 className='font-bold text-base'>Khóa học hướng dẫn Photoshop</h3>
                  <h4 className='text-slate-500 text-sm'>21/06/2024</h4>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="font-bold text-base">499.000</span>
            </TableCell>
            <TableCell>
              <span className={cn(commonClassName.status, courseStatus[0].className)}>
                {courseStatus[0].title}
              </span>
            </TableCell>
            <TableCell>
              <div className='flex gap-3'>
                <Link
                  href={'/mange/course/update-content?slug='}
                  className='border-[2px] p-2 rounded-md'
                >
                  <IconStudy className='size-5' />
                </Link>
                <Link
                  href={'/course/'}
                  target='_blank'
                  className='border-[2px] p-2 rounded-md'
                >
                  <IconEye className='size-5' />
                </Link>
                <Link
                  href={'/mange/course/update?slug='}
                  className='border-[2px] p-2 rounded-md'
                >
                  <IconEdit className='size-5' />
                </Link>
                <button className='border-[2px] p-2 rounded-md'>
                  <IconDelete className='size-5' />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

  )
}

export default CourseManage