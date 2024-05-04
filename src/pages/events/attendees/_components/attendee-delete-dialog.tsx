import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { deleteEventAttendees } from '@/api/delete-event-attendees'
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

type AttendeeDeleteDialogProps = {
  attendee: {
    id: string
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
  }
  eventId: string
}

export function AttendeeDeleteDialog({
  attendee,
  eventId,
}: AttendeeDeleteDialogProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const { mutateAsync: deleteEventAttendeesFn, isPending } = useMutation({
    mutationFn: () =>
      deleteEventAttendees({ attendeeId: attendee.id, eventId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendees'] })
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  async function handleDeleteAttendee() {
    try {
      await deleteEventAttendeesFn()
      toast.success(t('ATTENDEES.TOAST_DELETE'))
    } finally {
      setOpen(!open)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="flex items-center gap-2 text-destructive focus:text-destructive"
          onSelect={(e) => e.preventDefault()}
        >
          <Trash2 className="size-4" strokeWidth="1.75" />
          {t('ATTENDEES.DELETE_BUTTON')}
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('ATTENDEES.ALERT_DIALOG_TITLE')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('ATTENDEES.ALERT_DIALOG_DESCRIPTION')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="px-4 py-2 text-sm">
          <p className="mb-2 font-medium">{t('ATTENDEES.ALERT_DIALOG_INFO')}</p>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="truncate">
              <p className="mb-0.5 text-muted-foreground">
                {t('ATTENDEES.ALERT_DIALOG_NAME')}:
              </p>
              <span className="text-foreground">{attendee.name}</span>
            </div>
            <div className="truncate">
              <p className="mb-0.5 text-muted-foreground">E-mail:</p>
              <span className="text-foreground">
                {attendee.email.toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('ATTENDEES.ALERT_DIALOG_CANCEL_BUTTON')}
          </AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteAttendee}
          >
            {isPending && <Loader className="mr-2 size-4 animate-spin" />}
            {t('ATTENDEES.DELETE_BUTTON')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
