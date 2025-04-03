import { NewsChartTable } from '@components/answers/charts/NewsChartTable'
import DayPicker from '@components/common/datePicker/DayPicker'
import MonthPicker from '@components/common/datePicker/MonthPicker'
import WeekPicker from '@components/common/datePicker/WeekPicker'
import { Skeleton } from '@components/ui/skeleton/Skeleton'

import { getWeekReportDate } from '@hooks/useReport'
import { getMonthReportDate } from '@hooks/useReport'

import { ReportData } from '@types'

import { Button } from '@packages/components'

export default function ReportModal({
  handleCloseModal,
  isNewsOpen,
  report,
  handleGetReport,
  isReportLoading
}: {
  handleCloseModal: () => void
  isNewsOpen: string
  report: ReportData[] | undefined
  handleGetReport: (date?: string, endDate?: string, type?: string) => void
  isReportLoading: boolean
}) {
  let a = 0
  return (
    <div
      style={{ visibility: isNewsOpen ? 'visible' : 'hidden' }}
      className='w-[calc(100vw-19.5rem)] ml-0 md:ml-[19.5rem] h-[calc(100vh-var(--topbar-height))] -z-50 mt-[var(--topbar-height)] fixed inset-0 bg-white '
    >
      <div className='flex flex-col h-full'>
        <div className='overflow-y-auto flex-1 p-8'>
          <h1 className='text-xl font-bold text-aicfo mb-4'>
            "{isNewsOpen} 조회일을 선택해주세요."
          </h1>
          <div className='border-t border-black flex mb-2'>
            <div className='w-40 p-4 bg-background-secondary'>
              <p>조회일</p>
            </div>
            <div className='flex-1 flex flex-col p-4'>
              <div className='z-50 relative'>
                {isNewsOpen === '자금일보' ? (
                  <DayPicker
                    onClose={(startDate) => {
                      handleGetReport(startDate, undefined, 'D')
                    }}
                    initialDate={
                      new Date(new Date().setDate(new Date().getDate() - 1))
                    }
                  />
                ) : isNewsOpen === '자금주보' ? (
                  <WeekPicker
                    onClose={(startDate, endDate) => {
                      handleGetReport(startDate, endDate, 'W')
                    }}
                    initialDate={getWeekReportDate()[0]}
                  />
                ) : isNewsOpen === '자금월보' ? (
                  <MonthPicker
                    initialDate={getMonthReportDate()[0]}
                    onClose={(month) => {
                      handleGetReport(month, undefined, 'M')
                    }}
                  />
                ) : (
                  <DayPicker
                    onClose={(startDate) => {
                      handleGetReport(startDate, undefined, 'A')
                    }}
                    initialDate={
                      new Date(new Date().setDate(new Date().getDate() - 1))
                    }
                  />
                )}
              </div>
              <p className='text-sm mt-1 text-blue-100'>
                {/* yyyy년 mm월 dd일 ~ yyyy년 mm월 dd일 기준 */}
              </p>
            </div>
          </div>
          {isReportLoading ? (
            <div className='flex flex-col gap-y-2'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-40 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-40 w-full' />
            </div>
          ) : report && report.map((v) => v.data).some((v) => v.length > 0) ? (
            report?.map((v, i) => {
              if (v.data.length === 0) return null
              if (typeof v.data !== 'object') return null
              if (!v.answer.match(/^[1-9]/)) return null
              if (v.key !== 'ACCT_REC_8' && v.key !== 'ACCT_REC_9')
                return <NewsChartTable data={v} idx={a++} key={i} />
            })
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>
        <div className='flex pb-10 pt-4 justify-center items-center'>
          <Button
            onClick={handleCloseModal}
            className='text-base'
            size='md'
            variant='filled'
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}
