import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import enUS from 'dayjs/locale/en'
import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { t } from 'i18next'
import { ChevronsUpDown, Clipboard, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import i18n from '@/language'

import { AttendeeCheckIn } from './attendee-check-in'
import { AttendeeDeleteDialog } from './attendee-delete-dialog'

dayjs.extend(relativeTime)

export type Attendee = {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

export const attendeeTableColumns = (
  eventId: string,
): ColumnDef<Attendee>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: t('ATTENDEES.CODE'),
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('ATTENDEES.SINGULAR')}
          <ChevronsUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const attendeeEmail = row.original.email

      return (
        <div>
          <p className="mb-0.5 font-semibold">{row.getValue('name')}</p>
          <p className="text-muted-foreground">
            {attendeeEmail.toLocaleLowerCase()}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <div className="text-right">{t('ATTENDEES.DATE_OF_INSCRIPTION')}</div>
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {dayjs()
          .locale(i18n.language === 'en' ? enUS : ptBR)
          .to(row.getValue('createdAt'))}
      </div>
    ),
  },
  {
    accessorKey: 'checkedInAt',
    header: () => (
      <div className="text-right">{t('ATTENDEES.STATUS_OF_CHECK_IN')}</div>
    ),
    cell: ({ row }) => {
      const checkedIn = row.original.checkedInAt

      return (
        <div className="text-right font-medium">
          {checkedIn === null ? (
            <Badge variant="warning">
              {t('ATTENDEES.UNREALIZED_CHECK_IN')}
            </Badge>
          ) : (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Badge variant="success">
                    {t('ATTENDEES.REALIZED_CHECK_IN')}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {dayjs()
                    .locale(i18n.language === 'en' ? enUS : ptBR)
                    .to(row.getValue('checkedInAt'))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const attendee = row.original

      function copyIDAttendee() {
        navigator.clipboard.writeText(attendee.name)
        toast(
          <>
            <span>{t('ATTENDEES.TOAST_COPY_NAME')}:</span>
            <span className="text-primary">{attendee.name}</span>
          </>,
        )
      }

      return (
        <DropdownMenu key={attendee.id}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('ACTIONS')}</DropdownMenuLabel>
            {attendee.checkedInAt === null && (
              <AttendeeCheckIn attendeeId={attendee.id} />
            )}

            <DropdownMenuItem onClick={copyIDAttendee}>
              <Clipboard className="mr-2 size-4" />
              {t('ATTENDEES.DROPDOWN_MENU_ITEM_2')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <AttendeeDeleteDialog attendee={attendee} eventId={eventId} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
