import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { getEvent } from '@/api/get-event'
import { Skeleton } from '@/components/ui/skeleton'

import { AttendeeRegisterDialog } from './_components/attendee-create-dialog'
import { AttendeeList } from './_components/attendee-list'

export function Attendees() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { slug } = useParams()

  const { data: event, isLoading: isLoadingEvent } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => getEvent({ slug }),
  })

  if (!event) {
    navigate('/events')
  }

  return (
    <>
      <Helmet title="Attendees" />
      <div className="flex flex-col pb-[118px] sm:gap-4 sm:pt-6">
        <div className="sticky top-14 z-40 -mx-4 flex h-16 items-center border-b bg-background/60 px-4 backdrop-blur-lg sm:relative sm:top-0 sm:mx-0 sm:h-fit sm:border-b-0 sm:p-0">
          {event && (
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h1
                  className="text-lg font-bold sm:text-xl md:text-2xl"
                  translate="no"
                >
                  {event.title}
                </h1>
                <h2 className="text-xs font-medium text-muted-foreground md:text-sm">
                  {event.attendeesAmount} {t('ATTENDEES.PLURAL').toLowerCase()}
                </h2>
              </div>

              <AttendeeRegisterDialog eventId={event.id} />
            </div>
          )}

          {isLoadingEvent && (
            <div className="flex flex-1 items-center justify-between">
              <div>
                <Skeleton className="mb-1.5 h-4 w-[120px] sm:h-5 sm:w-[150px]" />
                <Skeleton className="h-3.5 w-[100px] md:h-4" />
              </div>

              <Skeleton className="h-9 w-[170px] rounded-md" />
            </div>
          )}
        </div>

        <AttendeeList eventId={event?.id ?? ''} />
      </div>
    </>
  )
}
