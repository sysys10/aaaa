import { useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'

import { AlarmType } from '@types'

export default function FdsItem({
  alarm,
  onClick
}: {
  alarm: AlarmType
  onClick: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const handleClickFdsAlarm = () => {
    setIsOpen(!isOpen)
    onClick()
  }
  return (
    <div
      onClick={handleClickFdsAlarm}
      key={alarm.pushNotificationHistorySeq}
      className={`rounded-md shadow-sm border ${
        alarm.useReadYn === 'N' ? 'bg-[rgba(79,99,210,0.10)]' : 'bg-background'
      }`}
    >
      <div className='p-2'>
        <div className='flex items-center justify-between px-2 pt-2'>
          <h3 className='text-base overflow-hidden text-ellipsis font-medium text-gray-900'>
            {alarm.bodyTitle}
          </h3>
          <CustomIcons name='expandMore' className='w-4 h-4' />
        </div>
        <div>
          <div className='flex items-center space-x-1 pb-4 px-2'>
            <span className='text-xs font-medium text-gray-600'>
              {alarm.pushNotificationSendDate}
            </span>
          </div>
        </div>
        {isOpen && (
          <div className='space-x-1 bg-[#F5F5F5] p-2'>
            <div className='flex flex-col text-end space-x-1 p-4 w-full bg-white rounded-md'>
              <span>{alarm.bodyText1}</span>
              <div>{alarm.bodyText2}</div>
            </div>
            <div className='text-sm mt-2 font-medium text-gray-600'>
              {alarm.bodyText3}
            </div>
            <div className='text-xs font-medium text-gray-600'>
              {alarm.bodyText4}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
