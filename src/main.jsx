import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Loginakun from './pages/Loginakun.jsx'
import Loginpage from './pages/Loginpage.jsx'


const Router = createBrowserRouter([
  { path: '/', 
    element: <Loginpage/>, },
  { path: '/login', 
    element: <Loginakun/>, },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
);
