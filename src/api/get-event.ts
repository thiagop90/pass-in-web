import { api } from '@/lib/axios'

export type GetEventParams = {
  slug: string | undefined
}

export type GetEventResponse = {
  id: string
  title: string
  slug: string
  details: string | null
  maximumAttendees: number | null
  attendeesAmount: number
}

export async function getEvent({ slug }: GetEventParams) {
  const response = await api.get<GetEventResponse>(`/events/${slug}`)

  return response.data
}
