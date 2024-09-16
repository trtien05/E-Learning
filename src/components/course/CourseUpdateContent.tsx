'use client'
import React, { MouseEvent } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { IconDelete, IconEdit } from '@/components/icons'
import { Button } from '@/components/ui/button';
import { createLecture, updateLecture } from '@/lib/actions/lecture.action';
import { toast } from 'react-toastify';

const CourseUpdateContent = ({ course }: { course: any }) => {
  const lectures = course.lectures;
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        course: course._id,
        title: 'Gioi thieu khoa hoc',
        order: lectures.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`
      })
      if (res?.sucess) {
        toast.success('Them chuong moi thanh cong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
    e.stopPropagation();
    try {
      await updateLecture({
        lectureId,
        updateData: {
          _destroy: true,
          path: `manage/course/update-content?slug=${course.slug}`,
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        {lectures.map((lecture: any) => (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" key={lecture._id}>
              <AccordionTrigger>
                <div className='flex items-center gap-3 justify-between pr-5 w-full'>
                  <div>Chương 1: Gioi thieu khoa hoc</div>
                  <div className='flex gap-2'>
                    <span className='border-[2px] p-2 rounded-md'>
                      <IconEdit className='size-5' />
                    </span>
                    <span className='border-[2px] p-2 rounded-md' onClick={(e) => handleDeleteLecture(e, lecture._id)}>
                      <IconDelete className='size-5' />
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        ))}
      </div>


      <Button className='mt-5' onClick={handleAddNewLecture}>Thêm chương mới</Button>
    </>

  )
}

export default CourseUpdateContent