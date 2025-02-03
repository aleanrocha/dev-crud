import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { DevProjectProvider } from './context/DevProjectContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DevProjectProvider>
      <RouterProvider router={router} />
    </DevProjectProvider>
  </StrictMode>
)
