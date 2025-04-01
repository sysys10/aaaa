import { flexRender } from '@tanstack/react-table'
import { memo } from 'react'

import { cn } from '../../lib/utils'
import { TableHeaderCellProps } from './types'

export const TableHeaderCell = memo(
  ({ header, isFirstColumn = false }: TableHeaderCellProps) => {
    const alignment = header.column.columnDef.meta?.align || 'left'
    const isSorted = header.column.getIsSorted()
    return (
      <th
        className={cn(
          'px-3 py-2 font-normal text-[#0f0f0f] cursor-pointer transition-colors whitespace-nowrap',
          'hover:bg-gray-200'
        )}
        onClick={header.column.getToggleSortingHandler()}
        style={{
          textAlign: alignment,
          position: isFirstColumn ? 'sticky' : 'static',
          left: isFirstColumn ? 0 : 'auto',
          zIndex: isFirstColumn ? 2 : 1,
          backgroundColor: '#f5f5f5'
        }}
      >
        <div className=''>
          {flexRender(header.column.columnDef.header, header.getContext())}
          {isSorted && (
            <span className='text-xs ml-1'>
              {isSorted === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
      </th>
    )
  }
)

TableHeaderCell.displayName = 'TableHeaderCell'

export const TableHeader = memo(({ headerGroup }: { headerGroup: any }) => (
  <tr className='divide-x divide-gray-200 text-primary'>
    {headerGroup.headers.map((header: any, idx: number) => (
      <TableHeaderCell
        key={header.id}
        header={header}
        isFirstColumn={idx === 0}
      />
    ))}
  </tr>
))

TableHeader.displayName = 'TableHeader'
