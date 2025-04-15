import React from 'react'
import { useState } from 'react';

// icon
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { RiNewspaperFill } from "react-icons/ri";
import { BsBoxArrowLeft } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import { CiAlignLeft } from "react-icons/ci";
// import { useNavigate } from 'react-router-dom';



export default function Sidebar({icon,text,active,alert}) {
  const [open,setOpen] = useState(true);
  return (
      <div className='fixed flex flex-row h-screen bg-white'>
        {/* kiri */}
        <div className={`flex flex-col h-full border-r border-[#F0F0F0] drop-shadow-md ${open ? "w-[250px]" : "w-[80px]"} transition-all duration-300 justify-between`}> 
          <div className='flex flex-row gap-1.5 mt-3 ml-3 items-center relative '>
            <div className='flex flex-row gap-2  w-[300px] overflow-hidden'>
                <img className={`transition-all duration-500 relative ${open ? "w-[80px]" : "w-[50px]"}`}
                src="/Logo Mojokerto Sehat.svg" 
                alt="imglogo" />
                <p className={`font-[raleway] font-extrabold text-[#025F96] text-[20px] items-center transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>MOJOKERTO SEHAT</p>
            </div>
          </div>

          
          {/* isi sidebar */}
          <div className='flex flex-col gap-5 mt-20 ml-3 '>
            <ul className='flex flex-col gap-5 relative'>
              <li className='flex flex-row gap-2 items-center' id='dashboard'>
                <RiDashboardHorizontalFill className='w-10 h-10 text-[#004A76]'/>
                <div
                  className={`transition-all duration-300 overflow-hidden ${open ? 'max-w-[180px] opacity-100 ml-1' : 'max-w-0 opacity-0'}`}>
                  <span className="font-[raleway] font-semibold text-[#025F96] text-[19px]">Dashboard</span>
                </div>
              </li>

              <li className='flex flex-row gap-2 items-center'>
                <img src="icon-support.svg" alt="icon-support" />
                <div
                  className={`transition-all duration-300 overflow-hidden ${open ? 'max-w-[180px] opacity-100 ml-1' : 'max-w-0 opacity-0'}`}>
                  <span className="font-[raleway] font-semibold text-[#025F96] text-[19px]">Konsultasi</span>
                </div>
              </li>

              <li className='flex flex-row gap-2 items-center'>
                <HiMiniUserGroup className='w-10 h-10 text-[#004A76]'/>
                <div
                  className={`transition-all duration-300 overflow-hidden ${open ? 'max-w-[180px] opacity-100 ml-1' : 'max-w-0 opacity-0'}`}>
                  <span className="font-[raleway] font-semibold text-[#025F96] text-[19px]">Data Masyrakat</span>
                </div>
              </li>

              <li className='flex flex-row gap-2 items-center'>
                <FaUserDoctor className='w-10 h-10 text-[#004A76]'/>
                <div
                  className={`transition-all duration-300 overflow-hidden ${open ? 'max-w-[180px] opacity-100 ml-1' : 'max-w-0 opacity-0'}`}>
                  <span className="font-[raleway] font-semibold text-[#025F96] text-[19px]">Data Dokter</span>
                </div>
              </li>
              
              <li className='flex flex-row gap-2 items-center'>
                <RiNewspaperFill className='w-10 h-10 text-[#004A76]' />
                <div
                  className={`transition-all duration-300 overflow-hidden ${open ? 'max-w-[180px] opacity-100 ml-1' : 'max-w-0 opacity-0'}`}>
                  <span className="font-[raleway] font-semibold text-[#025F96] text-[19px]">Artikel</span>
                </div>
              </li>
            </ul>
            <div className='p-1 pt-3'>
              <button onClick={() => setOpen((curr) => !curr) } 
                  className='bg-[#004a76]/50 rounded-lg w-10 shadow-2xl cursor-pointer transition-all hover:bg-[#004A76] hover:text-white'>
                  <CiAlignLeft className='w-10 h-10 text-[white]'/>
              </button>
            </div>
          </div> 
          
        </div>

       
      </div>
    )
}




