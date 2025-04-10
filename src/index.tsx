import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { setupStore } from './state/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

let container = document.getElementById('app')!
let root = createRoot(container)

root.render(
  <StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
