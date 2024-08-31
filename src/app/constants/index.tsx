import IconExplore from "@/app/components/icons/IconExplore"
import IconPlay from "@/app/components/icons/IconPlay"

export const menuItems: {
  url: string,
  title: string,
  icon: React.ReactNode
}[] = [
    {
      url: '/',
      title: 'Khu vực học tập',
      icon: <IconPlay className="size-5" />
    },
    {
      url: '/',
      title: 'Khám phá',
      icon: <IconExplore className="size-5" />
    }
  ]