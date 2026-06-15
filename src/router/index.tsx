import { createBrowserRouter } from 'react-router-dom'

import Layout     from '../components/layout/Layout'
import Dashboard  from '../pages/Dashboard'
import Jobs       from '../pages/Jobs'
import JobNew     from '../pages/JobNew'
import JobDetail  from '../pages/JobDetail'
import JobEdit    from '../pages/JobEdit'
import NotFound   from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,           element: <Dashboard /> },
      { path: 'jobs',          element: <Jobs /> },
      { path: 'jobs/new',      element: <JobNew /> },
      { path: 'jobs/:id',      element: <JobDetail /> },
      { path: 'jobs/:id/edit', element: <JobEdit /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])
