import { REPORT_LIST } from '@constants/report.constant'
import { useState } from 'react'

import { useReport } from '@hooks/useReport'

import { ReportHeader } from './ReportHeader'
import { ReportItem } from './ReportItem'
import ReportModal from './ReportModal'

export default function ReportList() {
  const { report, isReportLoading, handleGetReport, handleResetReport } =
    useReport()
  const [isNewsOpen, setIsNewsOpen] = useState('')

  const handleToggleNews = (reportType: string) => {
    setIsNewsOpen(reportType)

    switch (reportType) {
      case '자금일보':
        handleGetReport(undefined, undefined, 'D')
        break
      case '자금주보':
        handleGetReport(undefined, undefined, 'W')
        break
      case '자금월보':
        handleGetReport(undefined, undefined, 'M')
        break
      case '일일시재마감':
        handleGetReport(undefined, undefined, 'A')
        break
    }
  }

  const handleCloseModal = () => {
    setIsNewsOpen('')
    handleResetReport()
  }

  return (
    <>
      <ReportHeader />
      <div className='flex flex-col gap-1 p-2 w-full'>
        <ReportModal
          handleCloseModal={handleCloseModal}
          isNewsOpen={isNewsOpen}
          report={report}
          handleGetReport={handleGetReport}
          isReportLoading={isReportLoading}
        />
        {REPORT_LIST.map((reportItem, index) => (
          <ReportItem
            key={index}
            item={reportItem}
            isActive={isNewsOpen === reportItem.title}
            onSelect={handleToggleNews}
          />
        ))}
      </div>
    </>
  )
}
