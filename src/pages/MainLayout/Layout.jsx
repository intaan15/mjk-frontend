import React from 'react'
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from "@uidotdev/usehooks";

import Sidebar from '../../components/Sidebar/Sidebar'
import Dashboard from '../Dashboard/Dashboard'


const Layout = () => {


  return (
    
    <div className='flex flex-row min-h-screen '>
        <div className=' w-1/6 lg:w-64 bg-amber-600 hidden md:block md:h-auto'>
            <Sidebar/>
        </div>
        <div className='h-screen  w-5/6 lg:w-screen overflow-y-auto bg-amber-300'>
            <Outlet/> 
        </div>

    </div>
  )
}

export default Layout
  