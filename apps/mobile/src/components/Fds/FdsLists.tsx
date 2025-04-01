import { useEffect } from 'react'

import CustomDatePicker from '@components/common/datePicker/DatePicker'

import { useFdsLists } from '@hooks/useFds'

import FdsItem from './FdsItem'

export function FdsLists({ getFdsAlarmCnt }: { getFdsAlarmCnt: () => void }) {
  const { fdsLists, isLoading, handleSetAlarmRead, handleGetFdsLists } =
    useFdsLists(getFdsAlarmCnt)

  useEffect(() => {
    handleGetFdsLists({
      page: 1
    })
  }, [])

  return (
    <>
      <div className='px-2 mb-2'>
        <CustomDatePicker
          onClose={(startDate, endDate) => {
            handleGetFdsLists({ startDate, endDate, page: 1 })
          }}
        />
      </div>
      <div
        style={{ scrollbarWidth: 'none', flex: '1 1 0' }}
        className='overflow-y-auto space-y-1 px-1'
      >
        {isLoading && <>로딩중입니다</>}
        {fdsLists && fdsLists.length > 0 ? (
          fdsLists.map((alarm) => (
            <FdsItem
              alarm={alarm}
              onClick={() =>
                handleSetAlarmRead(alarm.pushNotificationHistorySeq)
              }
            />
          ))
        ) : (
          <div className='flex items-center justify-center h-full'>
            <p className='text-xs text-gray-400'>이상거래 알림이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  )
}
