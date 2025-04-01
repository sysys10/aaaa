import { useUserStore } from '@stores'
import { useEffect, useMemo } from 'react'

import { SidebarListProps } from '@types'

import { FdsLists } from './Fds/FdsLists'
import { RecentQuestionList } from './RecentQuestion'
import ReportList from './Report'

export function SidebarList({
  sidebarContent,
  handleSearchSubmit,
  handleRemoveRecentQuestion,
  recentQuestions,
  handleGetRecentQuestion,
  getFdsAlarmCnt
}: SidebarListProps) {
  const user = useUserStore((s) => s.user)

  useEffect(() => {
    if (user?.userId) {
      handleGetRecentQuestion()
    }
  }, [user])

  const handleAllRecentQuestionRemove = async () => {
    handleRemoveRecentQuestion({
      type: 'ALL'
    })
    handleGetRecentQuestion()
  }

  return useMemo(
    () => (
      <div className='space-y-2 h-full text-primary flex flex-col'>
        <div className='flex text-sm font-normal flex-col items-start h-full w-full'>
          {sidebarContent === 'recentQuestion' ? (
            <RecentQuestionList
              handleAllRecentQuestionRemove={handleAllRecentQuestionRemove}
              handleSearchSubmit={handleSearchSubmit}
              recentQuestions={recentQuestions}
              handleRemoveRecentQuestion={handleRemoveRecentQuestion}
            />
          ) : sidebarContent === 'brf' ? (
            <ReportList />
          ) : sidebarContent === 'fds' ? (
            <FdsLists
              getFdsAlarmCnt={getFdsAlarmCnt}
              sidebarContent={sidebarContent}
            />
          ) : null}
        </div>
      </div>
    ),
    [sidebarContent, recentQuestions]
  )
}
