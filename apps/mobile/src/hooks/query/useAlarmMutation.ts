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

const useAlarmReadMutation = (setAlarm: any, getAlarmCnt: any) => {
  return createMutation({
    mutationFn: setAlarmRead,
    onSuccess: (data, variables) => {
      if (data.success) {
        setAlarm((prev: AlarmType[]) =>
          prev.map((alarm) => {
            if (alarm.pushNotificationHistorySeq === variables) {
              return { ...alarm, useReadYn: 'Y' }
            }
            return alarm
          })
        )
        getAlarmCnt()
      }
    }
  })
}

export { useGetAlarmMutation, useAlarmReadMutation }
