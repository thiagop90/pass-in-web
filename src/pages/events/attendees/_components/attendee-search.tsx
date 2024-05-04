import { SearchIcon } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Input } from '@/components/ui/input'

type SearchProps = {
  search: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function AttendeeSearch({ search, onChange }: SearchProps) {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="relative flex w-full items-center">
      <SearchIcon className="absolute left-3 size-4 text-primary" />
      <Input
        ref={inputRef}
        value={search}
        onChange={onChange}
        className="pl-9"
        placeholder={t('ATTENDEES.INPUT_SEARCH_PLACEHOLDER')}
      />
    </div>
  )
}
