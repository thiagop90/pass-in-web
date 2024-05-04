import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { deleteEvent } from '@/api/delete-event'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { env } from '@/env'

type EventDeleteDialogProps = {
  eventId: string
}

export function EventDeleteDialog({ eventId }: EventDeleteDialogProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { mutateAsync: deleteEventAttendeesFn, isPending } = useMutation({
    mutationFn: () => deleteEvent({ eventId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  async function handleDeleteEvent() {
    try {
      await deleteEventAttendeesFn()
      toast.success(t('EVENT.TOAST_DELETE'))
    } finally {
      setOpen(!open)
    }
  }

  const disabledEvents =
    eventId === env.VITE_EVENT_ID_1 || eventId === env.VITE_EVENT_ID_2

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="flex items-center gap-2 text-destructive focus:bg-stone-900 focus:text-destructive"
          onSelect={(e) => e.preventDefault()}
          disabled={disabledEvents}
        >
          <Trash2 className="size-4" strokeWidth="1.75" />
          {t('EVENT.DELETE_BUTTON')}
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('EVENT.ALERT_DIALOG_TITLE')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('EVENT.ALERT_DIALOG_DESCRIPTION')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('EVENT.ALERT_DIALOG_CANCEL_BUTTON')}
          </AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteEvent}
          >
            {isPending && <Loader className="mr-2 size-4 animate-spin" />}
            {t('EVENT.DELETE_BUTTON')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
