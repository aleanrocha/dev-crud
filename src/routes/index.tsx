import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../layout'
import { Home } from '../screens/Home'
import { Projects } from '../screens/Projects'
import { Devs } from '../screens/Devs'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/projetos',
        element: <Projects />,
      },
      {
        path: '/desenvolvedores',
        element: <Devs />,
      },
    ],
  },
])
