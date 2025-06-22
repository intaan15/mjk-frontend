import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import "../../App.css"
import useLogout from '../../components/_hooksPages/useLogout'

const Layout = () => {
  const { autoLogout } = useLogout();

  return (
    <div className='flex flex-row min-h-screen transition-all duration-300 ease-in-out bg-gray-50 '>
      {/* Sidebar - Always visible with responsive width */}
      <div className='flex-shrink-0 h-screen overflow-y-auto bg-white shadow-blue-900' >
        <Sidebar/>
      </div>
      
      {/* Main Content Area */}
      <div className='flex-1 min-h-screen overflow-y-auto scrollable scrollbar-thin scrollbar-thumb-blue-gray-300 scrollbar-track-blue-gray-50 '>
        <div className='w-full h-full'>
          <Outlet/> 
        </div>
      </div>
    </div>
  )
}

export default Layout