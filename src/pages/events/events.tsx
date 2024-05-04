import { Helmet } from 'react-helmet-async'

import { EventList } from './_components/event-list'

export function Events() {
  return (
    <>
      <Helmet title="Events" />
      <EventList />
    </>
  )
}
