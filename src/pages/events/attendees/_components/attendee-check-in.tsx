import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { checkIn } from '@/api/check-in'
import { GetEventAttendeesResponse } from '@/api/get-event-attendees'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type AttendeeCheckInProps = {
  attendeeId: string
}

export function AttendeeCheckIn({ attendeeId }: AttendeeCheckInProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  function updateCheckInOnCache(attendeeId: string) {
    const attendeeListCache =
      queryClient.getQueriesData<GetEventAttendeesResponse>({
        queryKey: ['attendees'],
      })

    attendeeListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetEventAttendeesResponse>(cacheKey, {
        ...cacheData,
        attendees: cacheData.attendees.map((attendee) => {
          if (attendee.id === attendeeId) {
            return { ...attendee, checkedInAt: new Date().toISOString() }
          }

          return attendee
        }),
      })
    })
    toast.success(t('EVENT.TOAST_CHECK_IN'))
  }

  const { mutateAsync: checkInFn } = useMutation({
    mutationFn: checkIn,
    async onSuccess(_, { attendeeId }) {
      updateCheckInOnCache(attendeeId)
    },
  })

  return (
    <DropdownMenuItem onClick={() => checkInFn({ attendeeId })}>
      <CheckCircle className="mr-2 size-4" />
      {t('ATTENDEES.DROPDOWN_MENU_ITEM_1')}
    </DropdownMenuItem>
  )
}
