
import {
  IconPlay,
  IconStudy,
  IconCourse,
  IconOrder,
  IconUser,
  IconComment
} from '@/components/icons/index'
import { ECourseLevel, ECourseStatus } from '@/types/enum'

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
  paginationButton: 'size-10 rounded-md border-[2px] borderDarkMode bgDarkMode flex items-center justify-center hover:border-primary transition-all hover:text-primary'
}