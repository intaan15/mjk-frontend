import React from 'react'
import { useState, useRef, useEffect } from 'react';

import Sidebar from '../components/Sidebar/Sidebar'
import { FaCircleUser } from "react-icons/fa6";


// import "cally"



function Dashboard() {

    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className='flex flex-row '>
      {/* kiri */}
      <div className='w-1/6'>
      <Sidebar />
      </div>

      {/* kanan */}
      <main className='w-5/6 min-h-screen bg-white flex flex-col pl-10 pr-5'>
        <div className='flex flex-row gird-2 items-center justify-between relative pt-3'>
          <p className='text-[25px] font-[raleway] font-bold text-[#025f96]'>Dashboard</p>
          <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none cursor-pointer">
            <FaCircleUser className='w-[30px] h-[30px] text-[#292D32]'>  </FaCircleUser>
            <div>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-blue ring-opacity-3 z-50 ">
                
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil Admin</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"> Log Out</a>
                </div>

              </div>
            )}
            </div>
          </button>
        </div>
        <img src="line style.svg" alt="" />


        <div className='flex flex-row gap-5 mt-5 pl-4'>
          <div className='w-[386px] h-[200px] bg-[#38B6FE]/28 rounded-lg shadow-2xl'>
           <div className="">
              <h2 className="text-lg font-bold text-gray-800">Good Morning , Admin.</h2>
              <p className="text-sm text-gray-700">Selamat datang di Website Mojokerto Sehat</p>
            </div>
           <img src="img_org.svg" alt="" className='absolute  w-[350px]  ' />
          </div>
          <div class="w-[30px]">
            {/* <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
              <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
              <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
              <calendar-month></calendar-month>
            </calendar-date> */}
          </div>
        </div>

        <div className='pl-4'>
          <img src="public/sigma_dashboard.svgg" className='w-[500px] h-[137px]' alt="" />
          
        </div>
      </main>
    </div>
   
    

    

  )
}

export default Dashboard