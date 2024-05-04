import { Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

import { EventCardDropdownMenu } from './event-card-dropdown-menu'

export type EventCardProps = {
  event: {
    id: string
    title: string
    slug: string
    details: string | null
    maximumAttendees: number | null
    attendeesAmount: number
  }
}

export function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation()

  const percentage = event.maximumAttendees
    ? (event.attendeesAmount / event.maximumAttendees) * 100
    : 0

  return (
    <div className="relative overflow-hidden rounded-lg border bg-secondary/60">
      <div className="flex flex-col gap-0.5 border-b p-4">
        <div className="flex items-center justify-between">
          <a
            href={`/events/${event.slug}/attendees`}
            className="font-semibold underline underline-offset-4"
            translate="no"
          >
            {event.title}
          </a>

          <EventCardDropdownMenu eventId={event.id} />
        </div>
      </div>

      <div className="space-y-4 p-4 pt-2.5 text-sm font-medium">
        <div className="space-y-0.5">
          <div className="text-sm">
            {event.details ? (
              <p className="truncate" translate="no">
                {event.details}
              </p>
            ) : (
              <i>{t('EVENT.CARD_NO_DETAILS')}</i>
            )}
          </div>
          <div className="text-muted-foreground">
            <span>{t('EVENT.CARD_QTD_ATTENDEES')}: </span>
            <span className="text-foreground">{event.attendeesAmount}</span>
          </div>
          <div className="text-muted-foreground">
            <span>{t('EVENT.CARD_MAX_ATTENDEES')}: </span>
            <span className="text-foreground">{event.maximumAttendees}</span>
          </div>
        </div>

        <div className="rounded-md border border-white/5 bg-secondary p-3">
          <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
            <span className="flex gap-1.5 text-muted-foreground">
              <Users className="size-4" />
              {event.attendeesAmount}/{event.maximumAttendees}
            </span>

            <span className={cn({ 'text-primary': percentage === 100 })}>
              {Math.round(percentage)}%
            </span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full border bg-background/60">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-500 ease-in-out animate-in slide-in-from-left"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
