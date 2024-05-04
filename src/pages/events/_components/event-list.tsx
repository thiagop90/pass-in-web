import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { getEvents } from '@/api/get-events'

import { EventCard } from './event-card'
import { EventCreateDialog } from './event-create-dialog'
import { EventListSkeleton } from './event-list-skeleton'

export function EventList() {
  const { t } = useTranslation()

  const { data: result, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  return (
    <div className="flex flex-col gap-4 pb-6 sm:pt-6">
      <div className="sticky top-14 z-40 -mx-4 flex h-16 items-center border-b bg-background/60 px-4 backdrop-blur-lg sm:relative sm:top-0 sm:mx-0 sm:h-fit sm:border-b-0 sm:p-0">
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-2xl font-bold">{t('EVENT.TITLE')}</h1>

          <EventCreateDialog />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result &&
          result.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        {isLoading && <EventListSkeleton />}
      </div>
    </div>
  )
}
