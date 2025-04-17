import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import Loginakun from './pages/Loginakun.jsx'
import Splashscreen from './pages/Splashscreen.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Artikel from './pages/Artikel.jsx'
import Konsultasi from './pages/Konsultasi.jsx'
import Dokter from './pages/Dokter.jsx'
import Jadwal from './pages/Jadwal.jsx'



const Router = createBrowserRouter([
  { path: '/', 
    element: <Splashscreen/>, },
  { path: '/login', 
    element: <Loginakun/>, },
  { path: '/dashboardadmin', 
    element: <Dashboard/>, },
  { path: '/artikel', 
    element: <Artikel/>, },
  { path: '/Konsultasi', 
    element: <Konsultasi/>, },
  { path: '/dokter/datadokter', 
    element: <Dokter/>, },
  { path: '/dokter/jadwal', 
    element: <Jadwal/>, }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
);
