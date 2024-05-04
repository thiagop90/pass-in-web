import { api } from '@/lib/axios'

type RegisterForEventBody = {
  name: string
  email: string
}

type RegisterForEventParams = {
  eventId: string
}

export async function registerForEvent(
  { eventId }: RegisterForEventParams,
  { name, email }: RegisterForEventBody,
) {
  await api.post(`/events/${eventId}/attendees`, {
    name,
    email,
  })
}
