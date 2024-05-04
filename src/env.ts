import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_EVENT_ID_1: z.string().uuid(),
  VITE_EVENT_ID_2: z.string().uuid(),
})

export const env = envSchema.parse(import.meta.env)
