import React from 'react'
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";


// icon
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoCaretUpSharp } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { RiNewspaperFill } from "react-icons/ri";
import { IoCaretDownSharp } from "react-icons/io5";
import { BiSolidUserVoice } from "react-icons/bi";



const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleDropdown = (label) => {
    setOpenDropdown(prev => (prev === label ? null : label));
  };


  const menuItems = [
    {
      label: "Dashboard",
      icon:  <RiDashboardHorizontalFill className='w-8 h-8 text-[#004A76]'/>,
      to: "/dashboardadmin"
    },
    {
      label: "Konsultasi",
      icon: <BiSolidUserVoice className='w-8 h-8 text-[#004A76]' />,
      to: "/konsultasi"
    },
    {
      label: "Data Masyarakat",
      icon: <HiMiniUserGroup className='w-8 h-8 text-[#004A76]'/>,
      children: [
        { label: "Data Masyarakat", to: "/masyarakat/data" },
        { label: "Verifikasi Data", to: "/masyarakat/verifikasi" }
      ]
    },
    {
      label: "Data Dokter",
      icon: <FaUserDoctor className='w-8 h-8 text-[#004A76]'/>,
      children: [
        { label: "Data Jadwal", to: "/dokter/jadwal" },
        { label: "Data Dokter", to: "/dokter/datadokter" }
      ]
    },
    {
      label: "Artikel",
      icon:  <RiNewspaperFill className='w-8 h-8 text-[#004A76]' />,
      to: "/artikel"
    }
  ];

  
  // Tampilan sidebar
  return (
  
    <div className={`bg-white h-screen shadow-lg p-6 pt-10 fixed w-64 min-w-1/6 transition-all duration-300`}>
      <div className="flex justify-end mb-4">
        {/* <button onClick={() => setIsOpen(!isOpen)} 
          className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition">
          {isOpen ? <RxHamburgerMenu /> : <RxHamburgerMenu />}
        </button>  */}
      </div>

      <div className={`flex items-center gap-3 mb-6 ${!isOpen }`}>
          <div className='flex flex-row gap-2  w-[300px] overflow-hidden'>
                 <img className={`transition-all duration-500 relative ${open ? "w-[80px]" : "w-[50px]"}`}
                 src="/Logo Mojokerto Sehat.svg" 
                 alt="imglogo" />
                {isOpen && (
                  <h1 className="font-[raleway] font-extrabold text-[#025F96] text-[18px] transition-opacity duration-300">
                    MOJOKERTO SEHAT
                  </h1>)}
          </div>
      </div>



      <ul className="space-y-1 pt-6">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            {item.children ? (
              <>
                <div
                  onClick={() => toggleDropdown(item.label)}
                  className={`flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                    item.children.some(child => location.pathname === child.to)
                      ? "bg-[#E0F2FE] text-[#025F96] font-semibold"
                      : "text-[#025F96]"
                    }`} >
                  <div className="flex items-center gap-3 text-[#025F96]">
                    <span className="w-6 h-6">{item.icon}</span>
                    <span
                      className={`transition-all duration-300 origin-left ${
                        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {isOpen && (openDropdown === item.label ? <IoCaretUpSharp /> : <IoCaretDownSharp />)}
                </div>


                   {/* dropdown      */}
                <div
                  className={`ml-8 mt-1 overflow-hidden transition-all duration-300 ${
                    openDropdown === item.label ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children.map((child, i) => (
                    <Link
                      key={i}
                      to={child.to}
                      className={`block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md 
                        ${location.pathname === child.to
                        ? "bg-[#E0F2FE] font-semibold text-[#025F96]"
                        : "text-gray-700 hover:bg-gray-100"}`}
                      
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-2 py-2 rounded-md transition 
                  ${location.pathname === item.to
                    ? "bg-[#E0F2FE] text-[#025F96] font-semibold"
                    : "text-[#025F96] hover:bg-gray-100"}`}>
                <span className="w-6 h-6">{item.icon}</span>
                <span
                  className={`transition-all duration-300 origin-left ${
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}>
                  {item.label}
                </span>
              </Link>

            )}
          </li>
        ))}
      </ul>

      
      
    </div>
  )
}

export default Sidebar;



