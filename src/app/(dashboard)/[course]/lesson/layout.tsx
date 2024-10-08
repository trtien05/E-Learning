import LoadingOutline from '@/app/(dashboard)/[course]/lesson/@outline/LoadingOutline';
import LoadingPlayer from '@/app/(dashboard)/[course]/lesson/@player/LoadingPlayer';
import LessonWrapper from '@/app/(dashboard)/[course]/lesson/LessonWrapper';
import PageNotFound from '@/app/not-found';
import { getUserInfo } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react'

const Layout = async ({
  outline,
  player
}: {
  outline: React.ReactNode,
  player: React.ReactNode
}
) => {
  const { userId } = auth();
  if (!userId) return <PageNotFound />
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />

  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </LessonWrapper>
  )
}

export default Layout