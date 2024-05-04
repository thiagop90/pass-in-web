import { api } from '@/lib/axios'

export type GetEventsResponse = {
  events: {
    id: string
    title: string
    slug: string
    details: string | null
    maximumAttendees: number | null
    attendeesAmount: number
  }[]
}

export async function getEvents() {
  const response = await api.get<GetEventsResponse>('/events')

  return response.data
}
