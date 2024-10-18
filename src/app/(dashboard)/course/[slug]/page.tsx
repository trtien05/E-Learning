import PageNotFound from "@/app/not-found";
import { IconPlay, IconStudy, IconUser } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { courseLevelTitle } from "@/constants";
import {
  getCourseBySlug,
  getCourseLessonInfo,
  updateCourseView,
} from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enum";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import LessonContent from "@/components/lesson/LessonContent";
import ButtonEnroll from "@/app/(dashboard)/course/[slug]/ButtonEnroll";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import AlreadyEnroll from "@/app/(dashboard)/course/[slug]/AlreadyEnroll";
import CourseWidget from "@/app/(dashboard)/course/[slug]/CourseWidget";
import { formatMinutesToHour } from "@/utils";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  await updateCourseView({ slug: params.slug });
  const { duration, lessons }: any = await getCourseLessonInfo({
    slug: params.slug,
  });
  const data = await getCourseBySlug({ slug: params.slug });
  if (!data) return null;
  const { userId } = auth();
  if (!userId) return null;
  const findUser = await getUserInfo({ userId: userId });
  const userCourses = findUser?.courses.map((course: any) =>
    course.toString()
  );
  const lectures = data.lectures || [];
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />;
  const videoId = data?.intro_url.split("v=")[1];
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          {data.intro_url ? (
            <>
              <iframe
                width="1519"
                height="569"
                src={`https://www.youtube.com/embed/${videoId}`}
                title=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-full object-fill"
              ></iframe>
            </>
          ) : (
            <Image
              src={data.image}
              alt="coure_image"
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        <h1 className="font-bold text-3xl mb-5">
          Khóa học lập trình
        </h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.desc}</div>
        </BoxSection>

        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 mb-10 gap-5 ">
            <BoxInfor title="Bài học">{lessons}</BoxInfor>
            <BoxInfor title="Lượt xem">
              {data.views.toLocaleString()}
            </BoxInfor>
            <BoxInfor title="Trình độ">
              {courseLevelTitle[data.level]}
            </BoxInfor>
            <BoxInfor title="Thời lượng">
              {formatMinutesToHour(duration)}
            </BoxInfor>
          </div>
        </BoxSection>

        <BoxSection title="Nội dung khóa học">
          <LessonContent
            lectures={lectures}
            course=""
            slug=""
            histories={[]}
          />
        </BoxSection>

        <BoxSection title="Yêu cầu">
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

        <BoxSection title="Lợi ích">
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

        <BoxSection title="Q.A">
          {data.info.qa.map((qa, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value={qa.question}>
                <AccordionTrigger>{qa.question}</AccordionTrigger>
                <AccordionContent>{qa.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>
      </div>
      <div>
        {userCourses?.includes(data._id.toString()) ? (
          <AlreadyEnroll />
        ) : (
          <CourseWidget
            data={data ? JSON.parse(JSON.stringify(data)) : null}
            findUser={
              findUser ? JSON.parse(JSON.stringify(findUser)) : null
            }
            duration={formatMinutesToHour(duration)}
          />
        )}
      </div>
    </div>
  );
};

function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

function BoxInfor({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bgDarkMode border borderDarkMode p-5 rounded-lg">
        <h4 className="text-sm text-slate-400 font-normal">
          {title}
        </h4>
        <h3 className="font-bold">{children}</h3>
      </div>
    </>
  );
}
export default page;
