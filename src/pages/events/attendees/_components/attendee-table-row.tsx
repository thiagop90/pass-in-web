import { flexRender, Row } from '@tanstack/react-table'

import { TableCell, TableRow } from '@/components/ui/table'

import { Attendee } from './attendee-table-columns'

type AttendeeTableRowProps = {
  row: Row<Attendee>
}

export function AttendeeTableRow({ row }: AttendeeTableRowProps) {
  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}
