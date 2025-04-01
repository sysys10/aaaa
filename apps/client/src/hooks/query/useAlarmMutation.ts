import { AlarmResponse, AlarmType } from '@types'

import { getAlarm, setAlarmRead } from '@packages/apis'

import { createMutation } from './mutationUtils'

interface useAlarmProps {
  setAlarms: (alarms: AlarmType[]) => void
}

const useGetAlarmMutation = ({ setAlarms }: useAlarmProps) => {
  return createMutation<AlarmResponse, void>({
    mutationFn: getAlarm,
    onSuccess: (data: AlarmResponse) => {
      if (data.success) {
        setAlarms(data.body.data)
      }
    }
  })
}

const useAlarmReadMutation = (setAlarms: any, getAlarmCnt: () => void) => {
  return createMutation({
    mutationFn: setAlarmRead,
    onSuccess: (data, variables) => {
      if (data.success) {
        setAlarms((prev: any) =>
          prev.map((alarm: any) =>
            alarm.pushNotificationHistorySeq === variables
              ? { ...alarm, useReadYn: 'Y' }
              : alarm
          )
        )
        getAlarmCnt()
      }
    }
  })
}

export { useGetAlarmMutation, useAlarmReadMutation }
