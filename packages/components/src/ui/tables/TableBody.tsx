import { flexRender } from '@tanstack/react-table'
import { memo } from 'react'

import { TableBodyProps } from './types'

export const TableBody = memo(
  ({ rows, hasNextPage, lastRowRef, headers }: TableBodyProps) => {
    return (
      <>
        {rows.map((row, rowIndex) => (
          <tr
            ref={
              hasNextPage && rowIndex === rows.length - 1 ? lastRowRef : null
            }
            key={row.id}
            className='divide-x divide-gray-200 text-primary hover:bg-gray-50'
          >
            {row.getVisibleCells().map((cell: any, cellIndex: number) => (
              <td
                key={cell.id}
                style={{
                  textAlign: headers[cellIndex].column.columnDef.meta?.align,
                  position: cellIndex === 0 ? 'sticky' : 'static',
                  left: cellIndex === 0 ? 0 : 'auto',
                  zIndex: cellIndex === 0 ? 1 : 'auto',
                  backgroundColor: cellIndex === 0 ? 'white' : 'inherit'
                }}
                className='px-4 py-2 uniform-numbers'
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </>
    )
  }
)

TableBody.displayName = 'TableBody'
