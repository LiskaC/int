import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Layout } from './components/Layout'

/**
 * Router configuration for the application
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Oops, can't find this page</div>,
    children: [{ index: true, element: <App /> }],
  },
])
