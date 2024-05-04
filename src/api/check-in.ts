import { api } from '@/lib/axios'

type CheckInParams = {
  attendeeId: string
}

export async function checkIn({ attendeeId }: CheckInParams) {
  await api.get(`/attendees/${attendeeId}/check-in`)
}
