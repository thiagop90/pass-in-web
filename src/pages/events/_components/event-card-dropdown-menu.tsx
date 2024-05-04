import { Edit, MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { EventDeleteDialog } from './event-delete-dialog'

type EventDropdownMenuProps = {
  eventId: string
}

export function EventCardDropdownMenu({ eventId }: EventDropdownMenuProps) {
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border-white/10 bg-secondary/60 backdrop-blur-lg"
        align="end"
      >
        <DropdownMenuLabel>{t('ACTIONS')}</DropdownMenuLabel>
        <DropdownMenuItem className="focus:bg-stone-900">
          <Edit className="mr-2 size-4" />
          {t('EVENT.EDIT_BUTTON')}
        </DropdownMenuItem>

        <EventDeleteDialog eventId={eventId} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
