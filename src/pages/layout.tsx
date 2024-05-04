import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <>
      <Header />
      <div className="h-full w-full px-4">
        <div className="mx-auto min-h-[calc(100svh-56px)] max-w-[1216px]">
          <Outlet />
        </div>
      </div>
    </>
  )
}
