import { useState } from 'react'

import { AlarmType } from '@types'

import { useAlarmReadMutation } from './query'
import { useFdsQuery } from './query/useFdsMutation'
import { useUnreadFdsPush } from './query/useFdsMutation'

export function useFdsAlarmCnt() {
  const [fdsAlarmCnt, setFdsAlarmCnt] = useState(0)
  const { mutate: getFdsAlarmCnt } = useUnreadFdsPush({ setFdsAlarmCnt })

  return { fdsAlarmCnt, getFdsAlarmCnt }
}

export function useFdsLists(getFdsAlarmCnt: () => void) {
  const [fdsLists, setFdsLists] = useState<AlarmType[]>([])

  const { mutate: postAlarmRead, isPaused: isLoading } = useAlarmReadMutation(
    setFdsLists,
    getFdsAlarmCnt
  )

  const { mutate: getFdsLists } = useFdsQuery({ setFdsLists })
  const handleGetFdsLists = ({
    startDate,
    endDate,
    page
  }: {
    startDate?: string
    endDate?: string
    page: number
  }) => {
    getFdsLists({ startDate, endDate, page })
  }

  const handleSetAlarmRead = (pushNotificationHistorySeq?: number) => {
    postAlarmRead(pushNotificationHistorySeq)
  }
  return { fdsLists, isLoading, handleGetFdsLists, handleSetAlarmRead }
}
