import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { IconButton } from '@/components/icon-button'
import { Skeleton } from '@/components/ui/skeleton'

export function AttendeePaginationSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-[92px]" />

      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-[76px]" />

        <div className="flex gap-1.5">
          <IconButton disabled>
            <ChevronsLeft className="size-4" />
          </IconButton>
          <IconButton disabled>
            <ChevronLeft className="size-4" />
          </IconButton>
          <IconButton disabled>
            <ChevronRight className="size-4" />
          </IconButton>
          <IconButton disabled>
            <ChevronsRight className="size-4" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
