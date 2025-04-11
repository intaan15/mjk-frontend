import React from 'react'
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { RiNewspaperFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  return (
      <div className='container flex flex-row w-full h-screen bg-white '>
        {/* kiri */}
        <div className='bg-gray-300 flex flex-col h-full w-[270px] '> 
          <div className='flex flex-row gap-1.5 mt-3 ml-3 w-[194px] '>
            <img className='flex flex-row w-[80px] justify-center' src="Logo Mojokerto Sehat.svg" alt="imglogo" />
            <p className='font-[raleway] font-extrabold text-[#025F96] text-[25px] items-center '>MOJOKERTO SEHAT</p>
          </div>

          <div className='flex flex-col gap-5 mt-20 ml-3 '>
            <ul className='flex flex-col gap-5'>
              <li className='flex flex-row gap-2 items-center'>
                <RiDashboardHorizontalFill className='w-10 h-10 text-[#004A76]'/>
                <span className='font-[raleway] font-semibold text-[#025F96] text-[19px]'>Dashbaord</span>
              </li>
              <li className='flex flex-row gap-2 items-center'>
                <img src="icon-support.svg" alt="icon-support" />
                <span className='font-[raleway] font-semibold text-[#025F96] text-[19px]'>Konsultasi</span>
              </li>
              <li className='flex flex-row gap-2 items-center'>
                <HiMiniUserGroup className='w-10 h-10 text-[#004A76]'/>
                <span className='font-[raleway] font-semibold text-[#025F96] text-[19px]'>Data Masyrakat </span>
              </li>
              <li className='flex flex-row gap-2 items-center'>
                <FaUserDoctor className='w-10 h-10 text-[#004A76]'/>
                <span className='font-[raleway] font-semibold text-[#025F96] text-[19px]'>Data Dokter</span>
              </li>
              <li className='flex flex-row gap-2 items-center'>
                <RiNewspaperFill className='w-10 h-10 text-[#004A76]' />
                <span className='font-[raleway] font-semibold text-[#025F96] text-[19px]'>Artikel</span>
              </li>
            </ul>
          </div> 

        </div>

        {/* knan */}


      </div>
    )
}


export default Sidebar




