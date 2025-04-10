import React from 'react'
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { RiNewspaperFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  return (
      <div className='container flex flex-row w-screen'>
        {/* logo sidebar */}
        <div className='container sidebar w-[270px] h-screen bg-[#ffffff] border-r border-gray-500 flex flex-col'>
          <div className='logosidebar flex flex-row gap-1.5 mt-3 ml-3 '>
            <img className='flex flex-row w-[80px] justify-center' src="Logo Mojokerto Sehat.svg" alt="imglogo" />
            <p className='font-[raleway] font-extrabold text-[#025F96] text-[25px] items-center '>MOJOKERTO SEHAT</p>
          </div>
  
            menu sidebar
          <div className='menu sidebar flex flex-col gap-5 mt-10 ml-3'>

            <ul className='flex flex-col gap-5'>

              <li className='flex flex-row gap-2 items-center'>
                <RiDashboardHorizontalFill className='w-10 h-10 text-[#004A76]'/>
                <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Dashbaord</span>

              </li>

              <li className='flex flex-row gap-2 items-center'>
                <img src="icon-support.svg" alt="icon-support" />
                <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Konsultasi</span>
              </li>

              <li className='flex flex-row gap-2 items-center'>
                <HiMiniUserGroup className='w-10 h-10 text-[#004A76]'/>
                <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Data Masyrakat </span>
  
              </li>

              <li className='flex flex-row gap-2 items-center'>
                <FaUserDoctor className='w-10 h-10 text-[#004A76]'/>
                <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Data Dokter</span>
  
              </li>

              <li className='flex flex-row gap-2 items-center'>
                <RiNewspaperFill className='w-10 h-10 text-[#004A76]' />
                <span className='font-[raleway] font-medium text-[#025F96] text-[20px]'>Artikel</span>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    )
}

export default Sidebar
