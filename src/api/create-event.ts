import { api } from '@/lib/axios'

type CreateEventBody = {
  title: string
  details: string | null
  maximumAttendees: number | null
}

export async function createEvent({
  title,
  details,
  maximumAttendees,
}: CreateEventBody) {
  await api.post('/events', {
    title,
    details,
    maximumAttendees,
  })
}
