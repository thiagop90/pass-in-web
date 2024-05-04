import { api } from '@/lib/axios'

type DeleteEventAttendeesParams = {
  attendeeId: string
  eventId: string
}

export async function deleteEventAttendees({
  attendeeId,
  eventId,
}: DeleteEventAttendeesParams) {
  await api.delete(`/events/${eventId}/${attendeeId}`)
}
