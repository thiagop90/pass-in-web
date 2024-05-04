import { api } from '@/lib/axios'

type DeleteEventParams = {
  eventId: string
}

export async function deleteEvent({ eventId }: DeleteEventParams) {
  await api.delete(`/events/${eventId}`)
}
