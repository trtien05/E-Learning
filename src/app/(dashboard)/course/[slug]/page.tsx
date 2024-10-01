import PageNotFound from '@/app/not-found'
import { IconPlay, IconStudy, IconUser } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { courseLevelTitle } from '@/constants'
import { getCourseBySlug } from '@/lib/actions/course.actions'
import { ECourseStatus } from '@/types/enum'
import Image from 'next/image'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import LessonContent from '@/components/lesson/LessonContent'

const page = async ({
  params
}: {
  params: {
    slug: string
  }
}) => {
  const data = await getCourseBySlug({ slug: params.slug })
  if (!data) {
    return null
  }
  const lectures = data.lectures || [];
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />
  const videoId = data?.intro_url.split('v=')[1];
  return (
    <div className='grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen'>
      <div>
        <div className='relative aspect-video mb-5'>
          {data.intro_url ?
            <>
              <iframe
                width="1519"
                height="569"
                src={`https://www.youtube.com/embed/${videoId}`}
                title=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className='w-full h-full object-fill'
              ></iframe>
            </>
            :
            <Image
              src={data.image}
              alt='coure_image'
              fill
              className='w-full h-full object-cover rounded-lg'
            />
          }

        </div>
        <h1 className="font-bold text-3xl mb-5">
          Khóa học lập trình
        </h1>
        <BoxSection title='Mô tả'>
          <div className='leading-normal'>{data.desc}</div>
        </BoxSection>

        <BoxSection title='Thông tin'>
          <div className='grid grid-cols-4 mb-10 gap-5 '>
            <BoxInfor title='Bài học'>100</BoxInfor>
            <BoxInfor title='Lượt xem'>{data.views.toLocaleString()}</BoxInfor>
            <BoxInfor title='Trình độ'>{courseLevelTitle[data.level]}</BoxInfor>
            <BoxInfor title='Thời lượng'>1h30m</BoxInfor>
          </div>
        </BoxSection>

        <BoxSection title='Nội dung khóa học'>
          <LessonContent lectures={lectures} course='' slug='' histories={[]} />
        </BoxSection>

        <BoxSection title='Yêu cầu'>
          {data.info.requirements.map((r, index) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>

        <BoxSection title='Lợi ích'>
          {data.info.benefits.map((b, index) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </span>
              <span>{b}</span>
            </div>
          ))}
        </BoxSection>

        <BoxSection title='Q.A'>
          {data.info.qa.map((qa, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value={qa.question}>
                <AccordionTrigger>{qa.question}</AccordionTrigger>
                <AccordionContent>
                  {qa.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>

      </div>
      <div>
        <div className="bgDarkMode border borderDarkMode rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <strong className="text-primary font-bold text-xl">
              {data.price.toLocaleString()}đ
            </strong>
            <span className="text-slate-500 line-through">
              {data.sale_price.toLocaleString()}đ
            </span>
            <span className='bg-primary text-primary bg-opacity-10 px-3 py-1 rounded-lg ml-auto inline-block font-semibold text-sm'>
              {Math.floor((data.price / data.sale_price) * 100)}%
            </span>
          </div>
          <h3 className='font-bold mb-3'>Khóa học gồm có:</h3>
          <ul className='flex flex-col gap-3 text-sm mb-3 text-slate-500'>
            <li className='flex items-center gap-2'>
              <IconPlay className='size-4' />
              <span>30h học</span>
            </li>
            <li className='flex items-center gap-2'>
              <IconPlay className='size-4' />
              <span>Video Full HD</span>
            </li>
            <li className='flex items-center gap-2'>
              <IconUser className='size-4' />
              <span>Có nhóm hổ trợ</span>
            </li>
            <li className='flex items-center gap-2'>
              <IconStudy className='size-4' />
              <span>Tài liệu kèm theo</span>
            </li>
          </ul>
          <Button variant='primary' className='w-full'>Mua Khóa Học</Button>
        </div>
      </div>
    </div>
  )
}

function BoxSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <>
      <h2 className='font-bold text-xl mb-5'>{title}</h2>
      <div className='mb-10'>{children}</div>
    </>
  )
}

function BoxInfor({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <>
      <div className="bgDarkMode border borderDarkMode p-5 rounded-lg">
        <h4 className='text-sm text-slate-400 font-normal'>{title}</h4>
        <h3 className='font-bold'>{children}</h3>
      </div>
    </>
  )
}
export default page