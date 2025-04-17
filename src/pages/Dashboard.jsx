// komponen  react
import React from 'react'
import { useState, useRef, useEffect } from 'react';

// import "cally"
import Sidebar from '../components/Sidebar/Sidebar';
import Bar from '../components/Bar/Bar';


// icon

import { FaCircleUser } from "react-icons/fa6";
import { TiUser } from "react-icons/ti";
import { BsFillBarChartFill } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import { FaUserClock } from "react-icons/fa";





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
      <main className=' w-5/6 flex flex-col pl-18 pr-5 gap-2 '>
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

        
        <div className='flex flex-row pt-1 pl-1'>
          <div className='relative w-[330px] h-[200px] '>
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

        <div className='bg-[#004A76]/80 h-[80px] rounded-2xl flex flex-row gap-8 justify-center items-center'>
          <div className='w-[400px] h-[90px] flex flex-row justify-center gap-3 items-center'>
            <div className='bg-[#38B6FE]/30 rounded-full p-4'>
              <BsFillBarChartFill className='w-[30px] h-[30px] text-white' />
            </div>
            <div className='flex flex-col'>
              <p className='text-[18px] font-bold text-white underline'>Jumlah Pengguna</p>
              <p className='text-[17px] font-bold text-white' >2.502</p>  {/*Janlupa diganti*/}
            </div>
          </div>
          <div className='w-[500px] h-[100px] flex flex-row justify-center gap-3 items-center'>
            <div className='bg-[#38B6FE]/30 rounded-full p-4'>
              <GrArticle className='w-[30px] h-[30px] text-white' />
            </div>
            <div className='flex flex-col'>
              <p className='text-[18px] font-bold text-white underline'>Artikel Publish </p>
              <p className='text-[17px] font-bold text-white' >2.502</p>  {/*Janlupa diganti*/}
            </div>
          </div>
          <div className='w-[500px] h-[100px] flex flex-row justify-center gap-3 items-center'>
            <div className='bg-[#38B6FE]/30 rounded-full p-4'>
              <FaUserClock  className='w-[30px] h-[30px] text-white' />
            </div>
            <div className='flex flex-col'>
              <p className='text-[18px] font-bold text-white underline'>Verifikasi Pengguna</p>
              <p className='text-[17px] font-bold text-white' >2.502</p>  {/*Janlupa diganti*/}
            </div>
          </div>
        </div>

        
        <div className='bg-[#D9D9D9]/80 h-auto rounded-3xl flex flex-col gap-3 justify-center items-center'>
           <div className='flex flex-row gird-rows-2 w-full justify-between pt-1'>
              <p className='font-[raleway] text-[20px] font-bold pl-5  text-[#025f96] underline '>Log Aktivitas Pengguna </p>
              <p className='font-[raleway] text-[20px] font-bold pl-5  text-[#025f96] justify-end pr-10 '>16 April 2025 </p> 
           </div>
           <div className='flex flex-row justify-between px-10 gap-10 w-full '>
              <div className="w-1/2">
                  <Bar />
              </div>
              <div className="flex flex-row gap-12 w-full">
                <div className='flex flex-col gap-4'>
                  <div>
                    <span className='text-[#025f96] font-semibold'>Konsultasi</span>
                    <p className='text-lg font-bold'>35 Orang</p>
                  </div>
                  <div className=''>
                    <span className='text-[#025f96] font-semibold'>Verifikasi</span>
                    <p className='text-lg font-bold'>90 Orang</p>
                  </div>
                </div>
                
                <div className='flex flex-col gap-4'>
                  <div>
                    <span className='text-[#025f96] font-semibold'>Konsultasi</span>
                    <p className='text-lg font-bold'>35 Orang</p>
                  </div>
                  <div className=''>
                    <span className='text-[#025f96] font-semibold'>Verifikasi</span>
                    <p className='text-lg font-bold'>90 Orang</p>
                  </div>
                </div>
                  
              </div>
           </div>
             
        </div>
      </main>
    </div>
   
    

    

  )
}

export default Dashboard