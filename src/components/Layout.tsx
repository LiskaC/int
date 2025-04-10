import { FC } from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Layout component that serves as a wrapper for the main content of the
 * application. It uses the `Outlet` component from `react-router-dom` to
 * render the child routes.
 */
export const Layout: FC = () => (
  <div id='layout'>
    <main>
      <Outlet />
    </main>
  </div>
)
