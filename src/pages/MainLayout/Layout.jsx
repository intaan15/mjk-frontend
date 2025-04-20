import React from 'react'
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from "@uidotdev/usehooks";

import Sidebar from '../../components/Sidebar/Sidebar'
import Dashboard from '../Dashboard'


const Layout = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);

    useEffect(() => {
      setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);


  return (
    
    <div className='flex flex-row min-h-screen'>
        <div className='min-w-1/6 bg-white h-screen fixed md:static '>
            <Sidebar/>
        </div>
        <div className='flex-1 ml-64 md:ml-0 bg-gray-100 overflow-y-auto'>
            <Outlet/>
        </div>

      
    </div>
  )
}

export default Layout
  