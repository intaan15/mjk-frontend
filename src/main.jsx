import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Loginakun from './pages/Loginakun.jsx'
import Splashscreen from './pages/Splashscreen.jsx'
import Dashboard from './pages/Dashboard.jsx'


const Router = createBrowserRouter([
  { path: '/', 
    element: <Splashscreen/>, },
  { path: '/login', 
    element: <Loginakun/>, },
  { path: '/dashboardadmin', 
    element: <Dashboard/>, },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
);
