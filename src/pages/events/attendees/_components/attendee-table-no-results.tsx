import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

import { TableCell, TableRow } from '@/components/ui/table'

import { Attendee } from './attendee-table-columns'

type AttendeeTableNoResulsProps = {
  isLoading: boolean
  eventId: string
  columns: ColumnDef<Attendee>[]
}

export function AttendeeTableNoResuls({
  columns,
  eventId,
  isLoading,
}: AttendeeTableNoResulsProps) {
  const { t } = useTranslation()

  if (!isLoading && eventId) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          {t('ATTENDEES.TABLE_NO_RESULTS')}
        </TableCell>
      </TableRow>
    )
  }
}
