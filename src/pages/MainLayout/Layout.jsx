import React from 'react'
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from "@uidotdev/usehooks";

import Sidebar from '../../components/Sidebar/Sidebar'
import Dashboard from '../Dashboard/Dashboard'
import "../../App.css"

const Layout = () => {


  return (
    
    <div className='flex flex-row transition-all duration-300 ease-in-out '>
        <div className=' md:w-2/6 lg:w-64 h-full shadow-lg hidden md:block md:h-screen bg-amber-300 '>
            <Sidebar/>
        </div>
        <div className='h-auto w-5/6 lg:w-screen overflow-y-auto scrollable scrollbar-thin scrollbar-thumb-blue-gray-300 scrollbar-track-blue-gray-50'>
            <Outlet/> 
        </div>

    </div>
  )
}

export default Layout
  