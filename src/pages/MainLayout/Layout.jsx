import React from 'react'
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from "@uidotdev/usehooks";

import Sidebar from '../../components/Sidebar/Sidebar'
import Dashboard from '../Dashboard/Dashboard'


const Layout = () => {


  return (
    
    <div className='flex flex-row '>
        <div className=' w-1/6 lg:w-64 h-full shadow-lg hidden md:block md:h-screen'>
            <Sidebar/>
        </div>
        <div className='h-auto w-5/6 lg:w-screen overflow-y-auto'>
            <Outlet/> 
        </div>

    </div>
  )
}

export default Layout
  