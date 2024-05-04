import { Settings } from 'lucide-react'
import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useTranslation } from 'react-i18next'

import i18n from '@/language'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function SettingMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const changeLanguage = (language: 'en' | 'pt') => {
    i18n.changeLanguage(language)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="size-8">
          <Settings
            className={cn(
              'size-4 transition-transform duration-200',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border-white/10 bg-secondary/80 backdrop-blur-lg"
        align="end"
      >
        <DropdownMenuLabel>{t('LANGUAGE')}</DropdownMenuLabel>
        <DropdownMenuItem
          className={cn(
            'focus:bg-stone-900',
            i18n.language === 'en' && 'bg-stone-900',
          )}
          onSelect={() => changeLanguage('en')}
        >
          <ReactCountryFlag countryCode="US" svg className="mr-2" />
          {t('ENGLISH')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            'focus:bg-stone-900',
            i18n.language === 'pt' && 'bg-stone-900',
          )}
          onSelect={() => changeLanguage('pt')}
        >
          <ReactCountryFlag countryCode="BR" svg className="mr-2" />
          {t('PORTUGUESE')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
