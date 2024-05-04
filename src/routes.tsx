import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Attendees } from './pages/events/attendees/attendees'
import { Events } from './pages/events/events'
import { AppLayout } from './pages/layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Navigate to="/events" replace /> },
      { path: '/events', element: <Events /> },
      { path: '/events/:slug/attendees', element: <Attendees /> },
    ],
  },
])
