import './App.css'
import { BrowserRouter, Router, useRoutes } from 'react-router-dom'
import routes from 'route'

function App() {
  const RenderRoutes = useRoutes(routes)
  return <>{RenderRoutes}</>
}

export default App
