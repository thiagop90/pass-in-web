import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLink } from './nav-link'
import { SettingMenu } from './settings-menu'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function Header() {
  const { t } = useTranslation()

  return (
    <div className="sticky top-0 z-50 h-14 border-b bg-background/60 px-4 backdrop-blur-lg">
      <div className="mx-auto flex h-full max-w-[1216px] items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={nlwUniteIcon} alt="Icon" />
            <h2 className="text-sm font-medium text-primary" translate="no">
              Pass In
            </h2>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <NavLink to="/events">{t('EVENT.TITLE')}</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="icon" className="size-8">
            <Link to="https://github.com/thiagop90" target="_blank">
              <GitHubLogoIcon
                className="size-4 transition-colors"
                strokeWidth="1.5"
              />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="icon" className="size-8">
            <Link to="https://linkedin.com/in/psthiago" target="_blank">
              <LinkedInLogoIcon
                className="size-4 transition-colors"
                strokeWidth="1.5"
              />
            </Link>
          </Button>

          <Separator orientation="vertical" className="mx-0.5 h-4" />

          <SettingMenu />
        </div>
      </div>
    </div>
  )
}
