import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Loader, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

import { createEvent } from '@/api/create-event'
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

import { EventCounterInput } from './event-counter-input'

const eventCreateSchema = z.object({
  title: z.string().min(4),
  details: z.string().nullable(),
  maximumAttendees: z.coerce.number().int().positive().nullable(),
})

export type EventCreateSchema = z.infer<typeof eventCreateSchema>

export function EventCreateDialog() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<EventCreateSchema>({
    resolver: zodResolver(eventCreateSchema),
    defaultValues: {
      maximumAttendees: 1,
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = methods

  const { mutateAsync: createEventFn } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  })

  async function handleCreateEvent(data: EventCreateSchema) {
    try {
      await createEventFn({
        title: data.title,
        details: data.details,
        maximumAttendees: data.maximumAttendees,
      })

      reset()
      setIsOpen(!isOpen)
      toast.success(t('EVENT.TOAST_SUCCESS'))
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(t('EVENT.TOAST_ERROR'))
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-1.5 size-4" />
          {t('EVENT.CREATE_BUTTON')}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('EVENT.DIALOG_TITLE')}</DialogTitle>
          <DialogDescription>{t('EVENT.DIALOG_DESCRIPTION')}</DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleCreateEvent)}>
            <div className="space-y-4 px-4 pb-6">
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="title">{t('EVENT.LABEL_TITLE')}</Label>
                  <Input
                    id="title"
                    placeholder={t('EVENT.TITLE_PLACEHOLDER')}
                    {...register('title')}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('EVENT.TITLE_REQUIRED')}
                  </p>
                </div>
                <EventCounterInput />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">{t('EVENT.LABEL_DETAILS')}</Label>
                <Input
                  id="details"
                  placeholder={t('EVENT.DETAILS_PLACEHOLDER')}
                  {...register('details')}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  {t('EVENT.CANCEL_BUTTON')}
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting && (
                  <Loader className="mr-2 size-4 animate-spin" />
                )}
                {t('EVENT.CREATE_BUTTON')}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
