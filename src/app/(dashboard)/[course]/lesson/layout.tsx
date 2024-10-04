import LoadingOutline from '@/app/(dashboard)/[course]/lesson/@outline/LoadingOutline';
import LoadingPlayer from '@/app/(dashboard)/[course]/lesson/@player/LoadingPlayer';
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
    <div className='block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start'>
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </div>
  )
}

export default Layout