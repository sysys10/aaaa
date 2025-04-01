import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import CustomIcons from '@components/common/CustomIcons'
import { VocModal } from '@components/layout/Topbar/Voc/VocModal'

import { Accordion, Popover } from '@packages/components'

// 타입 정의
interface TableDataHeader {
  change_title: string
  align: string
  type: string
}

interface TableData {
  key: {
    desc?: string
    title?: string
    subtitle?: string
  }
  data: Record<string, any>[]
  data_header: Record<string, TableDataHeader>
}

interface AIResponseFooterProps {
  utterance?: string
  sqlQuery?: string
  sessionId?: string
  chainId?: string
  dateInfo?: string[]
  table_data?: Record<string, any>[]
}

function AIResponseFooter({
  utterance,
  sqlQuery,
  sessionId,
  chainId,
  dateInfo,
  table_data
}: AIResponseFooterProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [likeActive, setLikeActive] = useState(false)
  const [dislikeActive, setDislikeActive] = useState(false)

  const handleDownloadCSV = () => {
    // table_data가 존재하는 경우 이를 사용하여 CSV 다운로드
    if (table_data && Array.isArray(table_data) && table_data.length > 0) {
      // 모든 데이터 항목 모으기
      const allData: Record<string, any>[] = []

      // 각 테이블 데이터 처리
      for (const tableItem of table_data) {
        // 테이블 식별 정보 (desc, title, subtitle 중 존재하는 것 사용)
        const tableInfo: Record<string, string> = {}

        if (tableItem.key) {
          if (tableItem.key.desc) {
            tableInfo.table_title = tableItem.key.desc
          } else if (tableItem.key.title) {
            tableInfo.table_title = tableItem.key.title
          }

          if (tableItem.key.subtitle) {
            tableInfo.table_subtitle = tableItem.key.subtitle
          }
        }

        // 데이터 행에 테이블 정보 추가하여 allData에 합치기
        if (tableItem.data && Array.isArray(tableItem.data)) {
          tableItem.data.forEach((row) => {
            allData.push({
              ...tableInfo,
              ...row
            })
          })
        }
      }

      if (allData.length > 0) {
        // 모든 가능한 헤더 키 수집
        const allHeaderKeys = new Set<string>()

        // 테이블의 헤더 정보와 제목 관련 키 수집
        allHeaderKeys.add('table_title')
        allHeaderKeys.add('table_subtitle')

        // 각 테이블의 데이터 헤더 키 수집
        for (const tableItem of table_data) {
          if (tableItem.data_header) {
            Object.keys(tableItem.data_header).forEach((key) => {
              allHeaderKeys.add(key)
            })
          }
        }

        // 모든 헤더 키 배열로 변환
        const headerKeys = Array.from(allHeaderKeys)

        // 헤더 제목 매핑 준비
        const headerTitles: Record<string, string> = {
          table_title: '테이블',
          table_subtitle: '부제목'
        }

        // 데이터 헤더에서 change_title 값을 가져와 헤더 제목 맵핑
        for (const tableItem of table_data) {
          if (tableItem.data_header) {
            Object.entries(tableItem.data_header).forEach(([key, header]) => {
              headerTitles[key] = (header as any).change_title
            })
          }
        }

        // CSV 헤더 행 생성
        const csvHeader = headerKeys
          .map((key) => headerTitles[key] || key)
          .join(',')

        // 각 데이터 행을 CSV 형식으로 변환
        const csvRows = allData
          .map((row) =>
            headerKeys
              .map((key) => {
                const value = row[key] !== undefined ? row[key].toString() : ''
                // 쉼표나 큰따옴표가 포함된 값은 적절히 처리
                return value.includes(',') || value.includes('"')
                  ? `"${value.replace(/"/g, '""')}"`
                  : value
              })
              .join(',')
          )
          .join('\n')

        // 최종 CSV 내용 생성
        const csvContent = `${csvHeader}\n${csvRows}`

        // CSV 파일 다운로드
        const blob = new Blob(['\ufeff' + csvContent], {
          type: 'text/csv;charset=utf-8;'
        })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)

        link.href = url
        link.setAttribute(
          'download',
          `${utterance || '데이터'} ${new Date().toLocaleDateString()}.csv`
        )
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        return
      }
    }

    // 기존 HTML 테이블 기반 다운로드 로직
    const tables = document.querySelectorAll('table')
    const allRows: Record<string, string>[] = []

    tables.forEach((table) => {
      // 테이블의 제목과 부제목 가져오기
      const tableContainer = table.closest('.my-4')
      let title = '',
        subtitle = ''
      if (tableContainer) {
        const titleElement = tableContainer.querySelector('.text-primary')
        if (titleElement) {
          const titleText = titleElement.textContent || ''
          const matches = titleText.match(/(.*?)\s*(\(.*?\))?$/)
          if (matches) {
            title = matches[1]?.trim() || ''
            subtitle = matches[2]?.replace(/[()]/g, '').trim() || ''
          }
        }
      }

      // 헤더 행 가져오기
      const headers = Array.from(table.querySelectorAll('thead th')).map(
        (th) => th.textContent?.trim() || ''
      )

      // 데이터 행 가져오기
      const rows = Array.from(table.querySelectorAll('tbody tr')).map(
        (row) => Array.from(row.children) as HTMLTableCellElement[]
      )

      rows.forEach((row) => {
        const rowData: Record<string, string> = {}

        // title과 subtitle이 있는 경우에만 추가
        if (title) rowData['title'] = title
        if (subtitle) rowData['subtitle'] = subtitle

        // 각 셀의 데이터 추가
        row.forEach((cell, index) => {
          // 헤더가 비어있지 않은 경우에만 데이터 추가
          if (headers[index]?.trim()) {
            rowData[headers[index]] = cell.textContent?.trim() || ''
          }
        })

        // 모든 값이 비어있지 않은 경우에만 추가
        if (Object.values(rowData).some((value) => value !== '')) {
          allRows.push(rowData)
        }
      })
    })

    if (allRows.length > 0) {
      // 모든 가능한 헤더 수집 (중복 제거)
      const allHeaders = [
        ...new Set(allRows.flatMap((row) => Object.keys(row)))
      ]

      // CSV 헤더 행 생성
      const csvHeader = allHeaders.join(',')

      // 각 데이터 행을 CSV 형식으로 변환
      const csvRows = allRows
        .map((row) =>
          allHeaders
            .map((header) => {
              const value = row[header] || ''
              // 쉼표나 큰따옴표가 포함된 값은 적절히 처리
              return value.includes(',') || value.includes('"')
                ? `"${value.replace(/"/g, '""')}"`
                : value
            })
            .join(',')
        )
        .join('\n')

      // 최종 CSV 내용 생성
      const csvContent = `${csvHeader}\n${csvRows}`

      // CSV 파일 다운로드
      const blob = new Blob(['\ufeff' + csvContent], {
        type: 'text/csv;charset=utf-8;'
      })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.href = url
      link.setAttribute(
        'download',
        `${utterance || '데이터'} ${new Date().toLocaleDateString()}.csv`
      )
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  const handleOpenReportModal = () => {
    setIsReportModalOpen(true)
  }
  const handleCloseReportModal = () => {
    setIsReportModalOpen(false)
  }

  const handleLikeClick = () => {
    if (dislikeActive) {
      setDislikeActive(false)
    }
    setLikeActive(!likeActive)
  }

  const handleDislikeClick = () => {
    if (likeActive) {
      setLikeActive(false)
    }
    setDislikeActive(!dislikeActive)
  }
  const isProduction = import.meta.env.VITE_DAQUV_ENV === 'production'

  return (
    <>
      <VocModal
        isOpen={isReportModalOpen}
        handleClose={handleCloseReportModal}
        isDefault={false}
        chainId={chainId}
        sessionId={sessionId}
        utterance={utterance}
      />
      <div className='flex flex-col justify-between'>
        <div className='flex justify-between px-1'>
          {dateInfo && (
            <Popover
              trigger={
                <ExclamationCircleIcon className='w-6 h-6 cursor-pointer text-gray-500' />
              }
              className='border-[#767676] border rounded-lg'
            >
              <div className='flex flex-col gap-y-2 w-80'>
                <h2 className='text-lg font-semibold text-[#0F0F0F]'>
                  출처 정보
                </h2>
                <div className='flex flex-col gap-y-2 text-disabled'>
                  {dateInfo?.length ? (
                    <>
                      조회 기준 시점{' '}
                      {dateInfo[0]?.replace(
                        /(\d{4})(\d{2})(\d{2})/,
                        '$1-$2-$3'
                      )}{' '}
                      ~{' '}
                      {dateInfo[1]?.replace(
                        /(\d{4})(\d{2})(\d{2})/,
                        '$1-$2-$3'
                      )}
                    </>
                  ) : (
                    <p>조회 기준 시점이 없습니다.</p>
                  )}
                </div>
              </div>
            </Popover>
          )}
          <div className='flex items-center gap-x-4'>
            <CustomIcons
              name='csvDownload'
              iconClassName='w-5 h-5 text-gray-100'
              onClick={handleDownloadCSV}
            />
            <CustomIcons
              name='like'
              onClick={handleLikeClick}
              fill={`${likeActive ? 'text-blue-500 fill-current' : 'text-gray-100'}`}
            />
            <CustomIcons
              name='bad'
              onClick={handleDislikeClick}
              fill={`${dislikeActive ? 'text-red-500 fill-current' : 'text-gray-100'}`}
            />
            <CustomIcons
              onClick={handleOpenReportModal}
              name='alert'
              description='답변신고'
              tooltipWidth='w-20'
            />
          </div>
        </div>
        <div className='flex flex-col pb-2 ml-3 gap-y-2 mt-2'>
          {!isProduction && (
            <>
              {sqlQuery ? (
                <Accordion
                  items={[
                    {
                      title: 'SQL Query',
                      content: (
                        <div>
                          {sqlQuery ? (
                            <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto'>
                              <code>{sqlQuery}</code>
                            </pre>
                          ) : (
                            <p>SQL Query가 없습니다.</p>
                          )}
                        </div>
                      )
                    }
                  ]}
                />
              ) : (
                <p>SQL Query가 없습니다.</p>
              )}
              {sessionId && (
                <div className='flex items-end gap-x-2'>
                  <Link
                    to={`https://aicfoprm-dev.appplay.co.kr/main/llmadmin/daquv03/conversation/${sessionId}/${chainId && `chain/${chainId}`}`}
                    target='_blank'
                    className='text-sm text-gray-500'
                  >
                    {`https://aicfoprm-dev.appplay.co.kr/main/llmadmin/daquv03/conversation/${sessionId}/${chainId && `chain/${chainId}`}`}
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export { AIResponseFooter }
