import { useMemo } from 'react'

import { ReportData } from '@types'

import { NewsTable } from '@packages/components'

export function NewsChartTable({
  data,
  idx
}: {
  data: ReportData
  idx: number
}) {
  const columns = useMemo(() => {
    if (!data.data_header || !data.data?.[0]) return []
    const availableKeys = Object.keys(data.data?.[0])
    return availableKeys.map((field: any) => {
      return {
        id: field,
        header: data.data_header[field]?.change_title || field,
        accessorKey: field,
        meta: {
          align: data.data_header[field]?.align,
          type: data.data_header[field]?.type
        }
      }
    })
  }, [data.data_header, data.data])

  return (
    <div className='my-8'>
      {data.data.length > 0 && (
        <div className='text-primary mb-2 text-lg'>
          {idx + 1}. {data.answer.split('.')[1] || ''}
        </div>
      )}
      <NewsTable data={data.data} columns={columns as any} />
    </div>
  )
}
