import { useQuery } from '@tanstack/react-query'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ChangeEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { getEventAttendees } from '@/api/get-event-attendees'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody } from '@/components/ui/table'

import { AttendeeListSkeleton } from './attendee-list-skeleton'
import { AttendeePagination } from './attendee-pagination'
import { AttendeePaginationSkeleton } from './attendee-pagination-skeleton'
import { AttendeeSearch } from './attendee-search'
import { attendeeTableColumns } from './attendee-table-columns'
import { AttendeeTableHeader } from './attendee-table-header'
import { AttendeeTableNoResuls } from './attendee-table-no-results'
import { AttendeeTableRow } from './attendee-table-row'

type AttendeeListProps = {
  eventId: string
}

export function AttendeeList({ eventId }: AttendeeListProps) {
  const { t } = useTranslation()
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  const [searchParams, setSearchParams] = useSearchParams()

  const [pageIndex, setPageIndex] = useState(() => {
    if (searchParams.has('page')) {
      return Number(searchParams.get('page'))
    }

    return 1
  })

  const [searchQuery, setSearchQuery] = useState(() => {
    if (searchParams.has('search')) {
      return searchParams.get('search') ?? ''
    }

    return ''
  })

  function setCurrentSearch(search: string) {
    setSearchParams((state) => {
      state.set('search', search)

      return state
    })
    setSearchQuery(search)
  }

  function setCurrentPage(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', String(pageIndex))

      return state
    })
    setPageIndex(pageIndex)
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  const { data: result, isLoading: isLoadingAttendees } = useQuery({
    queryKey: ['attendees', pageIndex, searchQuery],
    queryFn: () =>
      getEventAttendees(
        { eventId },
        {
          pageIndex: pageIndex - 1,
          query: searchQuery,
        },
      ),
    enabled: !!eventId,
  })

  const isLoading = isLoadingAttendees || !eventId

  const data = useMemo(() => result?.attendees ?? [], [result])

  const columns = useMemo(() => attendeeTableColumns(eventId), [eventId])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  return (
    <>
      <div className="w-full">
        <Table>
          <AttendeeTableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => <AttendeeTableRow key={row.id} row={row} />)
            ) : (
              <AttendeeTableNoResuls
                columns={columns}
                eventId={eventId}
                isLoading={isLoadingAttendees}
              />
            )}
            {isLoading && <AttendeeListSkeleton />}
          </TableBody>
        </Table>
        <div className="flex items-center py-4">
          <div className="text-sm text-muted-foreground">
            {isLoading && <Skeleton className="h-4 w-[150px]" />}
            {!isLoading && (
              <>
                {table.getFilteredSelectedRowModel().rows.length} {t('OF')}{' '}
                {table.getFilteredRowModel().rows.length}{' '}
                {t('ATTENDEES.TABLE_ROW_SELECTED')}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="fixed inset-x-2 bottom-2 z-50 mx-auto max-w-[500px] space-y-3 rounded-lg border bg-secondary/60 p-3 backdrop-blur-lg duration-300 animate-in slide-in-from-bottom">
        <AttendeeSearch search={searchQuery} onChange={onSearchInputChanged} />
        {isLoading && <AttendeePaginationSkeleton />}
        {result && (
          <AttendeePagination
            attendeesCount={result.attendees.length}
            pageIndex={pageIndex}
            totalCount={result.total}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  )
}
