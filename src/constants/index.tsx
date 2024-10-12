
import {
  IconPlay,
  IconStudy,
  IconCourse,
  IconOrder,
  IconUser,
  IconComment
} from '@/components/icons/index'
import { ECourseLevel, ECourseStatus, EOrderStatus } from '@/types/enum'

export const menuItems: {
  url: string,
  title: string,
  icon: React.ReactNode
}[] =
  [
    {
      url: '/',
      title: 'Khám phá',
      icon: <IconPlay className="size-5" />
    },
    {
      url: '/study',
      title: 'Khư vực học tập',
      icon: <IconStudy className="size-5" />
    },
    {
      url: '/manage/course',
      title: 'Quản lý khóa học',
      icon: <IconCourse className="size-5" />
    },
    {
      url: '/manage/user',
      title: 'Quản lý thành viên',
      icon: <IconUser className="size-5" />
    },
    {
      url: '/manage/order',
      title: 'Quản lý đơn hàng',
      icon: <IconOrder className="size-5" />
    },
    {
      url: '/manage/comment',
      title: 'Quản lý bình luận',
      icon: <IconComment className="size-5" />
    }
  ]

export const courseStatus: {
  title: string,
  value: ECourseStatus,
  className?: string
}[] =
  [
    {
      title: 'Đã duyệt',
      value: ECourseStatus.APPROVED,
      className: 'text-green-500 bg-green-500'
    },
    {
      title: 'Chờ duyệt',
      value: ECourseStatus.PENDING,
      className: 'text-orange-500 bg-orange-500'
    },
    {
      title: 'Từ chối',
      value: ECourseStatus.REJECTED,
      className: 'text-red-500 bg-red-500'
    },
  ]
export const orderStatus: {
  title: string,
  value: EOrderStatus,
  className?: string
}[] =
  [
    {
      title: 'Đã duyệt',
      value: EOrderStatus.COMPLETED,
      className: 'text-green-500 bg-green-500'
    },
    {
      title: 'Chờ duyệt',
      value: EOrderStatus.PENDING,
      className: 'text-orange-500 bg-orange-500'
    },
    {
      title: 'Đã hủy',
      value: EOrderStatus.CANCELED,
      className: 'text-red-500 bg-red-500'
    },
  ]
export const courseLevel: {
  title: string,
  value: ECourseLevel,
}[] =
  [
    {
      title: 'Dễ',
      value: ECourseLevel.BEGINNER,
    },
    {
      title: 'Trung bình',
      value: ECourseLevel.INTERMEDIATE,
    },
    {
      title: 'Khó',
      value: ECourseLevel.ADVANCED,
    },
  ]

export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Dễ",
  [ECourseLevel.INTERMEDIATE]: "Trung bình",
  [ECourseLevel.ADVANCED]: "Khó",
}

export const commonClassName = {
  status: 'bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 whitespace-nowrap',
  paginationButton:
    "size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary p-2.5",
  btnPrimary:
    "flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-primary h-12 button-primary"
}

export const editorOptions = (field: any, theme: any) => ({
  initialValue: "",
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === "dark" ? "oxide-dark" : "oxide",
    height: 300,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "codesample",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "heading",
    ],
    toolbar:
      "undo redo | " +
      "codesample | bold italic forecolor | alignleft aligncenter |" +
      "alignright alignjustify | bullist numlist |" +
      "image |" +
      "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
      "link",
    content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,

  },
});

export const lastLessonKey = "lastLesson"