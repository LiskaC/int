import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { SuspenseWrapper } from './components/SuspenseWrapper'

const HashPage = lazy(() => import('./state/features/hash/HashPage'))

/**
 * Router configuration for the application
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Oops, can't find this page</div>,
    children: [
      { index: true, element: <SuspenseWrapper Component={HashPage} /> },
    ],
  },
])
