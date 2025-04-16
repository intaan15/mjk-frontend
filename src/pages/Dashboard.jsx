import React from 'react'
// import "cally"
import { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar'


// icon
import { FaCircleUser } from "react-icons/fa6";
import { TiUser } from "react-icons/ti";
import { IoBarChart } from "react-icons/io5";





function Dashboard() {

    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className='flex flex-row '>

      {/* kiri */}
      <div className='w-1/6  '>
      <Sidebar />
      </div>


      {/* kanan */}
      <main className=' w-5/6 flex flex-col pl-18 pr-5 '>
        <div className='flex flex-row grid-2 items-center justify-between  pt-3'>
          <p className='text-[25px] font-[raleway] font-bold text-[#025f96]'>Dashboard</p>
          <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none cursor-pointer">
            <TiUser className='w-[30px] h-[30px] text-[#292D32]'> </TiUser>
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


        <div className='flex flex-row gap-5 mt-5 pl-1'>
          <div className='relative w-[380px] h-[230px] '>
            <img src="img_org.svg" alt="" className='absolute  ' />
            <div className="font-bold text-black pl-3 pt-3   ">
                <h2 className="text-lg font-bold text-black ">Hello, Admin</h2>
                <p className="text-sm text-black">Selamat datang di Website Mojokerto Sehat</p> 
            </div>
          </div>
           
          <div class="w-[30px]">
            <h1>Calender</h1>
           
          </div>
        </div>

        <div className='bg-[#004A76]/80 h-[100px] rounded-3xl flex flex-row gap-10 justify-center items-center'>
          <div className='w-[100px] h-[100px] bg-amber-300 flex flex-row'>
            <IoBarChart className='w-[50px] h-[50px]' />
            <div>
              {/* <p className='text-[20px] font-bold'>Jumlah Pengguna</p>
              <p className='text-[20px] font-bold'>Artikel</p>  Janlupa diganti */}
            </div>
          </div>
          <div>ppp</div>
          <div>ppp</div>

          
        </div>
      </main>
    </div>
   
    

    

  )
}

export default Dashboard