
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
  value: ECourseStatus
}[] =
  [
    {
      title: 'Đã duyệt',
      value: ECourseStatus.APPROVED
    },
    {
      title: 'Chờ duyệt',
      value: ECourseStatus.PENDING
    },
    {
      title: 'Từ chối',
      value: ECourseStatus.REJECTED
    },
  ]

export const courseLevel: {
  title: string,
  value: ECourseLevel
}[] =
  [
    {
      title: 'Dễ',
      value: ECourseLevel.BEGINNER
    },
    {
      title: 'Trung bình',
      value: ECourseLevel.INTERMEDIATE
    },
    {
      title: 'Khó',
      value: ECourseLevel.ADVANCED
    },
  ]

export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Dễ",
  [ECourseLevel.INTERMEDIATE]: "Trung bình",
  [ECourseLevel.ADVANCED]: "Khó",
}