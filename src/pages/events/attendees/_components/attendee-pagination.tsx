import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { IconButton } from '@/components/icon-button'

type PaginationProps = {
  attendeesCount: number
  pageIndex: number
  totalCount: number
  onPageChange: (pageIndex: number) => void
}

export function AttendeePagination({
  attendeesCount,
  pageIndex,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const { t } = useTranslation()
  const noResults = attendeesCount === 0
  const totalPage = Math.ceil(totalCount / 10)

  return (
    <div className="flex items-center justify-between text-sm font-medium ">
      <div>
        <span className="font-semibold text-primary">
          {attendeesCount} {t('OF')} {totalCount} {t('ITEMS')}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="shrink-0">
          {t('PAGE')} {pageIndex} {t('OF')} {totalPage}
        </span>

        <div className="flex gap-1.5">
          <IconButton
            className="lg:hover:border-primary lg:hover:text-primary"
            onClick={() => onPageChange(1)}
            disabled={pageIndex === 1 || noResults}
          >
            <ChevronsLeft className="size-4" />
          </IconButton>
          <IconButton
            className="lg:hover:border-primary lg:hover:text-primary"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 1 || noResults}
          >
            <ChevronLeft className="size-4" />
          </IconButton>
          <IconButton
            className="lg:hover:border-primary lg:hover:text-primary"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex === totalPage || noResults}
          >
            <ChevronRight className="size-4" />
          </IconButton>
          <IconButton
            className="lg:hover:border-primary lg:hover:text-primary"
            onClick={() => onPageChange(totalPage)}
            disabled={pageIndex === totalPage || noResults}
          >
            <ChevronsRight className="size-4" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
