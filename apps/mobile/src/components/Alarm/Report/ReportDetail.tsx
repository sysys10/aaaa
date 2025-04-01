import { useEffect } from 'react'

import { Skeleton } from '@components/Skeleton'
import { NewsChartTable } from '@components/answers/charts/NewsChartTable'
import DayPicker from '@components/common/datePicker/DayPicker'
import MonthPicker from '@components/common/datePicker/MonthPicker'
import WeekPicker from '@components/common/datePicker/WeekPicker'

import {
  getMonthReportDate,
  getWeekReportDate,
  useReport
} from '@hooks/useReport'

export default function ReportDetail({ type }: { type: string }) {
  const { report, isReportLoading, handleGetReport } = useReport()
  useEffect(() => {
    if (type === 'dd') {
      handleGetReport(undefined, undefined, 'D')
    } else if (type === 'ww') {
      handleGetReport(undefined, undefined, 'W')
    } else if (type === 'mm') {
      handleGetReport(undefined, undefined, 'M')
    } else if (type === 'all') {
      handleGetReport(undefined, undefined, 'A')
    }
  }, [])

  let a = 0
  return (
    <div className='pt-4 px-2'>
      <p className='text-lg font-medium'>조회하실 날짜를 선택해주세요</p>
      {type === 'dd' && (
        <DayPicker
          onClose={(startDate) => {
            handleGetReport(startDate, undefined, 'D')
          }}
          initialDate={new Date(new Date().setDate(new Date().getDate() - 1))}
        />
      )}
      {type === 'ww' && (
        <WeekPicker
          onClose={(startDate, endDate) => {
            handleGetReport(startDate, endDate, 'W')
          }}
          initialDate={getWeekReportDate()[0]}
        />
      )}
      {type === 'mm' && (
        <MonthPicker
          initialDate={getMonthReportDate()[0]}
          onClose={(month) => {
            handleGetReport(month, undefined, 'M')
          }}
        />
      )}
      {type === 'all' && (
        <DayPicker
          onClose={(startDate) => {
            handleGetReport(startDate, undefined, 'A')
          }}
          initialDate={new Date(new Date().setDate(new Date().getDate() - 1))}
        />
      )}
      <div className='flex flex-col gap-y-2 pt-4'>
        {isReportLoading ? (
          <div className='flex flex-col gap-y-2'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-40 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-40 w-full' />
          </div>
        ) : report && report.map((v) => v.data).some((v) => v.length > 0) ? (
          report?.map((v, i) => {
            if (v.data.length === 0 || typeof v.data !== 'object') return null
            if (!v.answer.match(/^[1-9]/)) return null
            if (v.key !== 'ACCT_REC_8' && v.key !== 'ACCT_REC_9')
              return <NewsChartTable data={v} idx={a++} key={i} />
          })
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>
    </div>
  )
}
