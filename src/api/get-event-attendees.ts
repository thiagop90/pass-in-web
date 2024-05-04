import { api } from '@/lib/axios'

export type GetEventAttendeesParams = {
  eventId: string | undefined
}

export type GetEventAttendeesQuery = {
  pageIndex?: number | null
  query?: string | null
}

export type GetEventAttendeesResponse = {
  attendees: {
    id: string
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
  }[]
  total: number
}

export async function getEventAttendees(
  { eventId }: GetEventAttendeesParams,
  { pageIndex, query }: GetEventAttendeesQuery,
) {
  const response = await api.get<GetEventAttendeesResponse>(
    `/events/${eventId}/attendees`,
    {
      params: {
        pageIndex,
        query,
      },
    },
  )

  return response.data
}
