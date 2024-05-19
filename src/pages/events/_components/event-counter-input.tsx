import { t } from 'i18next'
import { Minus, Plus } from 'lucide-react'
import { ChangeEvent, useImperativeHandle, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { IconButton } from '@/components/icon-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { EventCreateSchema } from './event-create-dialog'

export function EventCounterInput() {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<EventCreateSchema>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register('maximumAttendees')
  const [maximumAttendees, setMaximumAttendees] = useState(1)

  useImperativeHandle(ref, () => inputRef.current)

  function handleChangeMaximumAttendees(event: ChangeEvent<HTMLInputElement>) {
    let value = Number(event.target.value)
    if (value <= 0) {
      value = 1
    }
    setMaximumAttendees(value)
  }

  function decreaseAttendees() {
    setMaximumAttendees(maximumAttendees - 1)
    inputRef.current?.focus()
  }

  function increaseAttendees() {
    setMaximumAttendees(maximumAttendees + 1)
    inputRef.current?.focus()
  }

  return (
    <div className="col-span-2 space-y-2">
      <Label htmlFor="maximumAttendees">
        {t('EVENT.LABEL_MAXIMUM_ATTENDEES')}
      </Label>

      <div className="relative flex items-center">
        <IconButton
          onClick={decreaseAttendees}
          disabled={maximumAttendees <= 1 || isSubmitting}
          className="absolute left-1 z-10 rounded-sm active:scale-[.98]"
        >
          <Minus className="size-4 text-primary" />
        </IconButton>
        <Input
          {...rest}
          id="maximumAttendees"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          ref={inputRef}
          value={maximumAttendees}
          onChange={handleChangeMaximumAttendees}
          className="text-center"
          disabled={isSubmitting}
        />
        <IconButton
          onClick={increaseAttendees}
          className="absolute right-1 z-10 rounded-sm active:scale-[.98]"
          disabled={isSubmitting}
        >
          <Plus className="size-4 text-primary" />
        </IconButton>
      </div>
    </div>
  )
}
