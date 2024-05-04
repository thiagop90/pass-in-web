import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function AttendeeListSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <TableRow key={i} className="h-[60px]">
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-10 " />
        </TableCell>
        <TableCell>
          <div className="min-w-[224px]">
            <Skeleton className="mb-1 h-4 w-[100px]" />
            <Skeleton className="h-4 w-[168px]" />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex justify-end">
            <Skeleton className="h-4 w-20" />
          </div>
        </TableCell>
        <TableCell>
          <div className="flex justify-end">
            <Skeleton className="h-4 w-20" />
          </div>
        </TableCell>
        <TableCell>
          <Skeleton className="size-7 rounded-md" />
        </TableCell>
      </TableRow>
    )
  })
}
