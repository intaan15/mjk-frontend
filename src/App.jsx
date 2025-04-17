import React from 'react'

import './App.css'
import Splashscreen from './pages/Splashscreen'
import Loginakun from './pages/Loginakun'
import Dashboard from './pages/Dashboard'
import Artikel from './pages/Artikel'
import Konsultasi from './pages/Konsultasi'
import Dokter from './pages/Dokter'
import Bar from './components/Bar/Bar'
import Jadwal from './pages/Jadwal'


function App() {
 return(
  <Splashscreen/>,
  <Loginakun/>,
  <Dashboard/>,
  <Artikel/>,
  <Konsultasi/>,
  <Dokter/>,
  <Bar/>,
  <Jadwal/>
 )
}

export default App;
