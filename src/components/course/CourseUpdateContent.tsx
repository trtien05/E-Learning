'use client'
import React, { MouseEvent, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { IconCancel, IconCheck, IconDelete, IconEdit } from '@/components/icons'
import { Button } from '@/components/ui/button';
import { createLecture, updateLecture } from '@/lib/actions/lecture.action';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Input } from '@/components/ui/input';
import { TCourseUpdateParams, TUpdateCourseLecture } from '@/types';
import { createLesson, updateLesson } from '@/lib/actions/lesson.actions';
import { ILesson } from '@/database/lesson.model';
import slugify from 'slugify';
import LessonItemUpdate from '@/components/lesson/LessonItemUpdate';

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const lectures = course.lectures;
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");
  const [lectureEdit, setLectureEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");


  // Lecture
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        course: course._id,
        title: 'Chương mới',
        order: lectures.length + 1,
        path: `/manage/course/update-content?slug=${course.slug}`
      })
      if (res?.sucess) {
        toast.success('Thêm chương mới thành công.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
    e.stopPropagation();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
              path: `/manage/course/update-content?slug=${course.slug}`,
            }
          })
          toast.success('Xóa chương thành công.')
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateLecture = async (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content?slug=${course.slug}`,
        }
      })
      if (res?.success) {
        toast.success('Cập nhật chương thành công.')
        setLectureEdit("");
        setLectureIdEdit("");
      }
    } catch (error) {
      console.log(error)
    }
  }
  // End Lecture

  // Lesson
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        title: "Tiêu đề bài học mới",
        lecture: lectureId,
        course: courseId,
        slug: `tieu-de-bai-hoc-moi-${new Date()
          .getTime()
          .toString()
          .slice(-3)}`,
        path: `/manage/course/update-content?slug=${course.slug}`,
      })
      if (res?.success) {
        toast.success('Tạo bài học thành công')
        return;
      }
      toast.error('Tạo khóa học thất bại')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateLesson = async (e: MouseEvent<HTMLSpanElement>, lessonId: string) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[*+~.()'"!:@]/g,
          }),
          path: `/manage/course/update-content?slug=${course.slug}`,
        }
      })
      if (res?.success) {
        toast.success("Cập nhật bài học thành công")
        setLessonEdit("");
        setLessonIdEdit("")
      }
    } catch (error) {

    }
  }
  const handleDeleteLesson = async (e: MouseEvent<HTMLSpanElement>, lessonId: string) => {

  }

  //End Lesson
  return (
    <>
      <div className="flex flex-col gap-3">
        {lectures.map((lecture: TUpdateCourseLecture) => (
          <div key={lecture._id}>
            <Accordion
              type="single"
              collapsible={!lectureIdEdit}
              className="w-full"
              key={lecture._id}
            >
              <AccordionItem value={lecture._id}>
                <AccordionTrigger>
                  <div className='flex items-center gap-3 justify-between pr-5 w-full'>
                    {lectureIdEdit === lecture._id ? (
                      <>
                        <div className='w-full' onClick={(e) => e.stopPropagation()}>
                          <Input
                            placeholder='Tên chương'
                            defaultValue={lecture.title}
                            onChange={(e) => setLectureEdit(e.target.value)}
                          />
                        </div>
                        <div className='flex gap-2'>
                          <span
                            className='border-[2px] p-2 rounded-md text-green-500'
                            onClick={(e) => handleUpdateLecture(e, lecture._id)}
                          >
                            <IconCheck className='size-5' />
                          </span>
                          <span
                            className='border-[2px] p-2 rounded-md text-red-500'
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEdit("");
                            }}
                          >
                            <IconCancel className='size-5' />
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{lecture.title}</div>
                        <div className='flex gap-2'>
                          <span
                            className='border-[2px] p-2 rounded-md text-blue-500'
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEdit(lecture._id)
                            }}>
                            <IconEdit className='size-5' />
                          </span>
                          <span className='border-[2px] p-2 rounded-md text-red-500'
                            onClick={(e) => handleDeleteLecture(e, lecture._id)}>
                            <IconDelete className='size-5' />
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className='border-none !bg-transparent'>
                  <div className="flex flex-col gap-5">
                    {lecture.lessons.map((lesson: ILesson) => (
                      <Accordion
                        type="single"
                        collapsible={!lessonEdit}
                        className="w-full"
                        key={lesson._id}
                      >
                        <AccordionItem value={lesson._id}>
                          <AccordionTrigger>
                            <div className='flex items-center gap-3 justify-between pr-5 w-full'>
                              {lessonIdEdit === lesson._id ? (
                                <>
                                  <div className='w-full' onClick={(e) => e.stopPropagation()}>
                                    <Input
                                      placeholder='Tên bài học'
                                      defaultValue={lesson.title}
                                      onChange={(e) => setLessonEdit(e.target.value)}
                                    />
                                  </div>
                                  <div className='flex gap-2'>
                                    <span
                                      className='border-[2px] p-2 rounded-md text-green-500'
                                      onClick={(e) => handleUpdateLesson(e, lesson._id)}
                                    >
                                      <IconCheck className='size-5' />
                                    </span>
                                    <span
                                      className='border-[2px] p-2 rounded-md text-red-500'
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit("");
                                      }}
                                    >
                                      <IconCancel className='size-5' />
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>{lesson.title}</div>
                                  <div className='flex gap-2'>
                                    <span
                                      className='border-[2px] p-2 rounded-md text-blue-500'
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit(lesson._id)
                                      }}>
                                      <IconEdit className='size-5' />
                                    </span>
                                    <span className='border-[2px] p-2 rounded-md text-red-500'
                                      onClick={(e) => handleDeleteLesson(e, lesson._id)}>
                                      <IconDelete className='size-5' />
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <LessonItemUpdate lesson={lesson} />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className='ml-auto w-fit mt-5 block'>
              <Button onClick={() => handleAddNewLesson(lecture._id, course._id)}>Thêm bài học</Button>
            </div>
          </div>
        ))}
      </div>
      <Button className='mt-5' onClick={handleAddNewLecture}>Thêm chương mới</Button>
    </>

  )
}

export default CourseUpdateContent