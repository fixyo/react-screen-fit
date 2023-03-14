import { useRoutes, Outlet } from 'react-router-dom'
import ScaleScreen from 'pages/ScaleScreen/ScaleScreen'
import Index from 'pages/Index'
import Shuffle from 'pages/Shuffle'

const routes = [
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: 'scale-screen',
        element: <ScaleScreen />,
      },
      {
        path: 'shuffle-animate',
        element: <Shuffle />,
      },
    ],
  },
]

export default routes
