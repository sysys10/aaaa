import { useState } from 'react'

import { ReportData } from '@types'

import { useReportMutation } from './query/useReportMutation'

export const useReport = () => {
  const [report, setReport] = useState<ReportData[]>()
  const { mutate: getReport, isPending: isReportLoading } = useReportMutation({
    setReport
  })

  const handleGetDayReport = (startDate?: string) => {
    getReport({
      startDate:
        startDate ||
        new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split('T')[0],
      endDate:
        startDate ||
        new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split('T')[0],
      option: 'D'
    })
  }
  const handleResetReport = () => {
    setReport(undefined)
  }
  const handleGetWeekReport = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) {
      const [lastMonday, thisSunday] = getWeekReportDate()

      startDate = lastMonday.toISOString().split('T')[0]
      endDate = thisSunday.toISOString().split('T')[0]
    }
    getReport({ startDate, endDate, option: 'W' })
  }

  const handleGetMonthReport = (date?: string) => {
    let startDate: string
    let endDate: string
    if (!date) {
      const [lastMonth, lastMonthEnd] = getMonthReportDate()
      startDate = lastMonth.toISOString().split('T')[0]
      endDate = lastMonthEnd.toISOString().split('T')[0]
    } else {
      const month = new Date(date)
      startDate = new Date(month.getFullYear(), month.getMonth(), 2)
        .toISOString()
        .split('T')[0]
      endDate = new Date(month.getFullYear(), month.getMonth() + 1)
        .toISOString()
        .split('T')[0]
    }
    getReport({
      startDate,
      endDate,
      option: 'M'
    })
  }

  const handleGetAllReport = (date?: string) => {
    getReport({
      startDate:
        date ||
        new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split('T')[0],
      endDate:
        date ||
        new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split('T')[0],
      option: 'A'
    })
  }
  const handleGetReport = (date?: string, endDate?: string, type?: string) => {
    if (type === 'D') {
      handleGetDayReport(date)
    } else if (type === 'W') {
      handleGetWeekReport(date, endDate)
    } else if (type === 'M') {
      handleGetMonthReport(date)
    } else if (type === 'A') {
      handleGetAllReport(date)
    }
  }
  return {
    report,
    setReport,
    isReportLoading,
    handleResetReport,
    handleGetReport
  }
}

export function getWeekReportDate() {
  const today = new Date()
  const lastMonday = new Date(today)
  lastMonday.setDate(today.getDate() - today.getDay() - 6)
  const thisSunday = new Date(today)
  thisSunday.setDate(today.getDate() - today.getDay())

  return [lastMonday, thisSunday]
}

export function getMonthReportDate() {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)

  return [lastMonth, lastMonthEnd]
}
