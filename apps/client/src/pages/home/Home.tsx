import { useAdmin, useRecentQuestions, useSearchHook } from '@hooks'
import { useUserStore } from '@stores'
import { useEffect } from 'react'

import CustomIcons from '@components/common/CustomIcons'
import FreeBuyScreen from '@components/layout/FreeScreen'
import Sidebar from '@components/layout/LeftSidebar'
import Topbar from '@components/layout/Topbar'
import { MainContent } from '@components/main/MainContent'

import useRefreshMutation from '@hooks/query/useRefreshMutation'

export default function HomePage() {
  const { user, isBolcked } = useUserStore()
  const { mutate: refresh } = useRefreshMutation()

  const {
    recentQuestions,
    handleGetRecentQuestion,
    handleRemoveRecentQuestion
  } = useRecentQuestions()

  const {
    handleSearchSubmit,
    handleResetResults,
    recommend,
    searchIsSuccess,
    ...rest
  } = useSearchHook({
    handleGetRecentQuestion
  })

  useEffect(() => {
    if (!user || !user.userId) {
      window.location.href = '/login'
    }
  }, [user])

  const { handleToggleAdmin, adminUrl, handleCloseAdmin, isAdminLoading } =
    useAdmin(handleResetResults, refresh)

  return (
    <div className='flex h-screen text-primary z-0'>
      <Sidebar
        {...{
          recentQuestions,
          handleGetRecentQuestion,
          handleRemoveRecentQuestion,
          handleToggleAdmin,
          handleCloseAdmin,
          user: user!,
          handleSearchSubmit
        }}
      />
      <div className='flex max-h-screen overflow-hidden flex-1 flex-col duration-300'>
        <Topbar
          {...{
            handleToggleAdmin,
            handleSearchSubmit
          }}
        />
        <main className='w-full h-full pt-[var(--topbar-height)]'>
          {adminUrl || isAdminLoading ? (
            <AdminScreen {...{ isAdminLoading, adminUrl, handleCloseAdmin }} />
          ) : isBolcked ? (
            <FreeBuyScreen />
          ) : (
            <MainContent
              {...{ searchIsSuccess, handleSearchSubmit, recommend, ...rest }}
            />
          )}
        </main>
      </div>
    </div>
  )
}

function AdminScreen({
  isAdminLoading,
  adminUrl,
  handleCloseAdmin
}: {
  isAdminLoading: boolean
  adminUrl: string
  handleCloseAdmin: () => void
}) {
  return (
    <div className='relative w-full h-full flex flex-col'>
      <div className='w-full p-1'>
        <div className='w-full rounded-lg py-2 bg-background-sidebar flex items-center justify-between px-4'>
          <div className='text-sm text-aicfo'>사용설정</div>
          <div>
            <CustomIcons
              name='close'
              onClick={handleCloseAdmin}
              className='w-4 h-4 text-gray-500'
            />
          </div>
        </div>
      </div>
      {isAdminLoading ? (
        <div className='w-full flex-1 flex flex-col items-center justify-center gap-4'>
          <div className='flex items-center justify-center gap-2'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='w-4 h-4 rounded-full bg-aicfo animate-bounce'
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
          <p className='text-sm text-gray-500'>사용설정을 불러오는 중입니다.</p>
        </div>
      ) : (
        <iframe src={adminUrl} className='w-full flex-1 border-0' />
      )}
    </div>
  )
}
