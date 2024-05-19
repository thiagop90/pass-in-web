import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Loader, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerForEvent } from '@/api/register-for-event'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type AttendeeRegisterDialogProps = {
  eventId: string
}

const attendeeRegisterSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
})

export type AttendeeRegisterSchema = z.infer<typeof attendeeRegisterSchema>

export function AttendeeRegisterDialog({
  eventId,
}: AttendeeRegisterDialogProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<AttendeeRegisterSchema>({
    resolver: zodResolver(attendeeRegisterSchema),
  })
  const { mutateAsync: registerForEventFn } = useMutation({
    mutationFn: (data: AttendeeRegisterSchema) =>
      registerForEvent({ eventId }, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendees'] })
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  async function handleRegisterForEvent(data: AttendeeRegisterSchema) {
    try {
      await registerForEventFn({
        name: data.name,
        email: data.email,
      })

      reset()
      setIsOpen(!isOpen)
      toast.success(t('ATTENDEES.TOAST_SUCCESS'))
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message
        const emailAlreadyRegistered =
          errorMessage === 'This e-mail is already registered for this event.'
        const maxAttendeesReached =
          errorMessage ===
          'The maximum number of attendees for this event has been reached.'

        if (emailAlreadyRegistered) {
          toast.error(t('ATTENDEES.TOAST_ERROR_1'))
        }

        if (maxAttendeesReached) {
          toast.error(t('ATTENDEES.TOAST_ERROR_2'))
        }
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-1.5 size-4" />
          {t('ATTENDEES.REGISTER_BUTTON')}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('ATTENDEES.DIALOG_TITLE')}</DialogTitle>
          <DialogDescription>
            {t('ATTENDEES.DIALOG_DESCRIPTION')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleRegisterForEvent)}>
          <div className="space-y-4 px-4 pb-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('ATTENDEES.LABEL_NAME')}</Label>
              <Input
                id="name"
                placeholder={t('ATTENDEES.NAME_PLACEHOLDER')}
                {...register('name')}
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                {t('ATTENDEES.NAME_REQUIRED')}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder={t('ATTENDEES.EMAIL_PLACEHOLDER')}
                {...register('email')}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {t('ATTENDEES.CANCEL_BUTTON')}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting && <Loader className="mr-2 size-4 animate-spin" />}
              {t('ATTENDEES.REGISTER_BUTTON')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
