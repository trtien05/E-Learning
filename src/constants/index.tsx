
import {
  IconPlay,
  IconExplore,
  IconCourse,
  IconOrder,
  IconUser,
  IconComment
} from '@/components/icons/index'

export const menuItems: {
  url: string,
  title: string,
  icon: React.ReactNode
}[] = [
    {
      url: '/',
      title: 'Khám phá',
      icon: <IconPlay className="size-5" />
    },
    {
      url: '/study',
      title: 'Khư vực học tập',
      icon: <IconExplore className="size-5" />
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