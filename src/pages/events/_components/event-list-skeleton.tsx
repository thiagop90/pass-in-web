import { Skeleton } from '@/components/ui/skeleton'

export function EventListSkeleton() {
  return Array.from({ length: 6 }).map((_, i) => {
    return (
      <div
        className="min-h-[212px] overflow-hidden rounded-lg border bg-secondary/60"
        key={i}
      >
        <div className="flex flex-col gap-0.5 border-b p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="size-7 rounded-md" />
          </div>
        </div>

        <div className="space-y-4 p-4 pt-2.5">
          <div className="h-[64px] space-y-2.5">
            <Skeleton className="h-3.5 w-56" />
            <Skeleton className="h-3.5 w-40" />

            <Skeleton className="h-3.5 w-40" />
          </div>
          <div className="h-[56px] rounded-md bg-secondary/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-3.5 w-11" />

              <Skeleton className="h-3.5 w-7" />
            </div>
            <Skeleton className="h-2 rounded-full" />
          </div>
        </div>
      </div>
    )
  })
}
