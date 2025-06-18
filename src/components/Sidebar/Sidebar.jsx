//ke 1
// import React from 'react'
// import { useState } from 'react';
// import { Link, useLocation } from "react-router-dom";

// // icon
// import { RiDashboardHorizontalFill } from "react-icons/ri";
// import { HiMiniUserGroup } from "react-icons/hi2";
// import { IoCaretUpSharp } from "react-icons/io5";
// import { FaUserDoctor } from "react-icons/fa6";
// import { RiNewspaperFill } from "react-icons/ri";
// import { IoCaretDownSharp } from "react-icons/io5";
// import { BiSolidUserVoice } from "react-icons/bi";

// const Sidebar = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   const toggleDropdown = (label) => {
//     setOpenDropdown(prev => (prev === label ? null : label));
//   };

//   const menuItems = [
//     {
//       label: "Dashboard",
//       icon:  <RiDashboardHorizontalFill className='w-8 h-8 text-[#004A76]'/>,
//       to: "/dashboardadmin"
//     },
//     {
//       label: "Konsultasi",
//       icon: <BiSolidUserVoice className='w-8 h-8 text-[#004A76]' />,
//       to: "/konsultasi"
//     },
//     {
//       label: "Data Masyarakat",
//       icon: <HiMiniUserGroup className='w-8 h-8 text-[#004A76]'/>,
//       children: [
//         { label: "Data Masyarakat", to: "/masyarakat/data" },
//         { label: "Verifikasi Data", to: "/masyarakat/verifikasi" }
//       ]
//     },
//     {
//       label: "Data Dokter",
//       icon: <FaUserDoctor className='w-8 h-8 text-[#004A76]'/>,
//       children: [
//         { label: "Data Dokter", to: "/dokter/datadokter" },
//         { label: "Data Jadwal", to: "/dokter/jadwal" }
//       ]
//     },
//     {
//       label: "Artikel",
//       icon:  <RiNewspaperFill className='w-8 h-8 text-[#004A76]' />,
//       to: "/artikel"
//     }
//   ];

//   // Tampilan sidebar
//   return (

//     <div className={`bg-white h-full shadow-lg p-4 pt-10 md:w-2/6 lg:w-64 transition-all duration-400`}>

//       <div className={`flex items-center justify-center gap-5 mb-6 ${!isOpen }`}>
//           <div className='flex flex-row gap-2 overflow-hidden'>
//                  <img className={`transition-all duration-500 relative w-21`}
//                  src="/Logo Mojokerto Sehat.svg"
//                  alt="imglogo" />
//                 {isOpen && (
//                   <h1 className="font-[raleway] font-extrabold text-[#025F96] text-xl transition-opacity duration-300">
//                     MOJOKERTO SEHAT
//                   </h1>)}
//           </div>
//       </div>

//       <ul className="space-y-4 pt-12 items-center justify-center">
//         {menuItems.map((item, idx) => (
//           // parent
//           <li key={idx}>
//             {item.children ? (
//               <>
//                 <div
//                   onClick={() => toggleDropdown(item.label)}
//                   className={`flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-300 rounded-md  font-[raleway] ${
//                     item.children.some(child => location.pathname === child.to)
//                       ? "bg-[#E0F2FE]  text-[#025F96] font-extrabold "
//                       : "text-[#025F96] font-medium"
//                     }`} >
//                   <div className="flex items-center gap-3 text-[#025F96]">
//                     <span className="w-6 h-6">{item.icon}</span>
//                     <span
//                       className={`transition-all duration-300 origin-left text-md  justify-center items-center ${
//                         isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </div>
//                   {isOpen && (openDropdown === item.label ? <IoCaretUpSharp /> : <IoCaretDownSharp />)}
//                 </div>

//               {/* dropdown*/}
//                 <div
//                   className={`ml-8 mt-1 overflow-hidden transition-all duration-300 font-[raleway] ${
//                   openDropdown === item.label ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
//                   }`}
//                 >
//                   {item.children.map((child, i) => (
//                     <Link
//                       key={i}
//                       to={child.to}
//                       className={`block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md font-[raleway]
//                         ${location.pathname === child.to
//                         ? "bg-[#E0F2FE]  text-[#025F96] font-semibold"
//                         : "text-gray-700 hover:bg-gray-100"}`}

//                     >
//                       {child.label}
//                     </Link>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <Link
//                 to={item.to}
//                 className={`flex items-center gap-3 px-2 py-2 rounded-md transition font-[raleway]
//                   ${location.pathname === item.to
//                     ? "bg-[#E0F2FE] text-[#025F96] font-extrabold~"
//                     : "text-[#025F96] hover:bg-gray-100 font-medium"}`}>
//                 <span className="w-6 h-6">{item.icon}</span>
//                 <span
//                   className={`transition-all duration-300 origin-left ${
//                     isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
//                   }`}>
//                   {item.label}
//                 </span>
//               </Link>

//             )}
//           </li>
//         ))}
//       </ul>

//     </div>
//   )
// }

// export default Sidebar;

//ke 2
// import React from 'react'
// import { useState } from 'react';
// import { Link, useLocation } from "react-router-dom";

// // icon
// import { RiDashboardHorizontalFill } from "react-icons/ri";
// import { HiMiniUserGroup } from "react-icons/hi2";
// import { IoCaretUpSharp } from "react-icons/io5";
// import { FaUserDoctor } from "react-icons/fa6";
// import { RiNewspaperFill } from "react-icons/ri";
// import { IoCaretDownSharp } from "react-icons/io5";
// import { BiSolidUserVoice } from "react-icons/bi";

// const Sidebar = () => {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const location = useLocation();

//   const toggleDropdown = (label) => {
//     setOpenDropdown(prev => (prev === label ? null : label));
//   };

//   const menuItems = [
//     {
//       label: "Dashboard",
//       icon: <RiDashboardHorizontalFill className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]'/>,
//       to: "/dashboardadmin"
//     },
//     {
//       label: "Konsultasi",
//       icon: <BiSolidUserVoice className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]' />,
//       to: "/konsultasi"
//     },
//     {
//       label: "Data Masyarakat",
//       icon: <HiMiniUserGroup className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]'/>,
//       children: [
//         { label: "Data Masyarakat", to: "/masyarakat/data" },
//         { label: "Verifikasi Data", to: "/masyarakat/verifikasi" }
//       ]
//     },
//     {
//       label: "Data Dokter",
//       icon: <FaUserDoctor className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]'/>,
//       children: [
//         { label: "Data Dokter", to: "/dokter/datadokter" },
//         { label: "Data Jadwal", to: "/dokter/jadwal" }
//       ]
//     },
//     {
//       label: "Artikel",
//       icon: <RiNewspaperFill className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]' />,
//       to: "/artikel"
//     }
//   ];

//   return (
//     <div className="bg-white h-full shadow-lg transition-all duration-400
//                     /* Mobile: Icon only sidebar */
//                     w-16 sm:w-20
//                     /* Tablet: Compact sidebar */
//                     md:w-48 lg:w-56 xl:w-64
//                     /* Desktop: Full sidebar */
//                     p-2 sm:p-3 md:p-4 pt-4 sm:pt-6 md:pt-8 lg:pt-10">

//       {/* Header Logo */}
//       <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
//         <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 overflow-hidden">
//           <img
//             className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 transition-all duration-500"
//             src="/Logo Mojokerto Sehat.svg"
//             alt="imglogo"
//           />
//           {/* Text only visible on md+ screens */}
//           <div className="hidden md:block">
//             <h1 className="font-[raleway] font-extrabold text-[#025F96]
//                           text-xs md:text-sm lg:text-base xl:text-lg
//                           transition-opacity duration-300 text-center md:text-left">
//               MOJOKERTO SEHAT
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Menu Items */}
//       <ul className="space-y-2 sm:space-y-3 md:space-y-4 pt-4 sm:pt-6 md:pt-8 lg:pt-12">
//         {menuItems.map((item, idx) => (
//           <li key={idx}>
//             {item.children ? (
//               <>
//                 {/* Parent Menu Item with Dropdown */}
//                 <div
//                   onClick={() => toggleDropdown(item.label)}
//                   className={`flex items-center justify-between cursor-pointer hover:bg-gray-300 rounded-md font-[raleway] transition-all
//                             px-1 sm:px-2 py-1 sm:py-2
//                             ${item.children.some(child => location.pathname === child.to)
//                               ? "bg-[#E0F2FE] text-[#025F96] font-extrabold"
//                               : "text-[#025F96] font-medium"
//                             }`}>

//                   <div className="flex items-center gap-1 sm:gap-2 md:gap-3 text-[#025F96] min-w-0">
//                     <span className="flex-shrink-0">{item.icon}</span>
//                     {/* Text only visible on md+ screens */}
//                     <span className="hidden md:block text-xs md:text-sm lg:text-base truncate">
//                       {item.label}
//                     </span>
//                   </div>

//                   {/* Dropdown arrow only visible on md+ screens */}
//                   <span className="hidden md:block flex-shrink-0">
//                     {openDropdown === item.label ?
//                       <IoCaretUpSharp className="w-3 h-3 lg:w-4 lg:h-4" /> :
//                       <IoCaretDownSharp className="w-3 h-3 lg:w-4 lg:h-4" />
//                     }
//                   </span>
//                 </div>

//                 {/* Dropdown Menu - Only visible on md+ screens */}
//                 <div className={`hidden md:block ml-4 lg:ml-6 xl:ml-8 mt-1 overflow-hidden transition-all duration-300 font-[raleway]
//                                ${openDropdown === item.label ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
//                   {item.children.map((child, i) => (
//                     <Link
//                       key={i}
//                       to={child.to}
//                       className={`block px-2 py-1 text-xs md:text-sm rounded-md font-[raleway] transition-all
//                                 ${location.pathname === child.to
//                                   ? "bg-[#E0F2FE] text-[#025F96] font-semibold"
//                                   : "text-gray-700 hover:bg-gray-100"
//                                 }`}>
//                       {child.label}
//                     </Link>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               /* Single Menu Item */
//               <Link
//                 to={item.to}
//                 className={`flex items-center gap-1 sm:gap-2 md:gap-3 rounded-md transition font-[raleway]
//                           px-1 sm:px-2 py-1 sm:py-2
//                           ${location.pathname === item.to
//                             ? "bg-[#E0F2FE] text-[#025F96] font-extrabold"
//                             : "text-[#025F96] hover:bg-gray-100 font-medium"
//                           }`}>
//                 <span className="flex-shrink-0">{item.icon}</span>
//                 {/* Text only visible on md+ screens */}
//                 <span className="hidden md:block text-xs md:text-sm lg:text-base truncate">
//                   {item.label}
//                 </span>
//               </Link>
//             )}
//           </li>
//         ))}
//       </ul>

//       {/* Mobile: Show text labels as tooltips on hover */}
//       <style jsx>{`
//         @media (max-width: 768px) {
//           .sidebar-item {
//             position: relative;
//           }

//           .sidebar-item:hover::after {
//             content: attr(data-tooltip);
//             position: absolute;
//             left: 100%;
//             top: 50%;
//             transform: translateY(-50%);
//             background: #333;
//             color: white;
//             padding: 4px 8px;
//             border-radius: 4px;
//             font-size: 12px;
//             white-space: nowrap;
//             z-index: 1000;
//             margin-left: 8px;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Sidebar;

//ke 3
import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// icon
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoCaretUpSharp } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { RiNewspaperFill } from "react-icons/ri";
import { IoCaretDownSharp } from "react-icons/io5";
import { BiSolidUserVoice } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const ResponsiveSidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showDropdownModal, setShowDropdownModal] = useState(false);
  const location = useLocation();

  const toggleDropdown = (label) => {
    if (window.innerWidth < 768) {
      // Mobile: Show modal
      setOpenDropdown(label);
      setShowDropdownModal(true);
    } else {
      // Desktop: Toggle inline dropdown
      setOpenDropdown((prev) => (prev === label ? null : label));
    }
  };

  const closeModal = () => {
    setShowDropdownModal(false);
    setOpenDropdown(null);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: (
        <RiDashboardHorizontalFill className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]" />
      ),
      to: "/dashboardadmin",
    },
    {
      label: "Konsultasi",
      icon: (
        <BiSolidUserVoice className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]" />
      ),
      to: "/konsultasi",
    },
    {
      label: "Data Masyarakat",
      icon: (
        <HiMiniUserGroup className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]" />
      ),
      children: [
        { label: "Data Masyarakat", to: "/masyarakat/data" },
        { label: "Verifikasi Data", to: "/masyarakat/verifikasi" },
      ],
    },
    {
      label: "Data Dokter",
      icon: (
        <FaUserDoctor className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]" />
      ),
      children: [
        { label: "Data Dokter", to: "/dokter/datadokter" },
        { label: "Data Jadwal", to: "/dokter/jadwal" },
      ],
    },
    {
      label: "Artikel",
      icon: (
        <RiNewspaperFill className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#004A76]" />
      ),
      to: "/artikel",
    },
  ];

  return (
    <>
      {/* Desktop/Tablet: Original Left Sidebar */}
      <div
        className="hidden md:block bg-white h-full shadow-lg transition-all duration-400
                     md:w-48 lg:w-56 xl:w-64 p-2 sm:p-3 md:p-4 pt-4 sm:pt-6 md:pt-8 lg:pt-10"
      >
        {/* Header Logo */}
        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 overflow-hidden">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 transition-all duration-500"
              src="/Logo Mojokerto Sehat.svg"
              alt="imglogo"
            />
            <div className="block">
              <h1
                className="font-[raleway] font-extrabold text-[#025F96]
                           text-xs md:text-sm lg:text-base xl:text-lg
                           transition-opacity duration-300 text-center md:text-left"
              >
                MOJOKERTO SEHAT
              </h1>
            </div>
          </div>
        </div>

        {/* Menu Items - Desktop */}
        <ul className="space-y-2 sm:space-y-3 md:space-y-4 pt-4 sm:pt-6 md:pt-8 lg:pt-12">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              {item.children ? (
                <>
                  {/* Parent Menu Item with Dropdown */}
                  <div
                    onClick={() => toggleDropdown(item.label)}
                    className={`flex items-center justify-between cursor-pointer hover:bg-gray-300 rounded-md font-[raleway] transition-all
                             px-1 sm:px-2 py-1 sm:py-2
                             ${
                               item.children.some(
                                 (child) => location.pathname === child.to
                               )
                                 ? "bg-[#E0F2FE] text-[#025F96] font-extrabold"
                                 : "text-[#025F96] font-medium"
                             }`}
                  >
                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3 text-[#025F96] min-w-0">
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="text-xs md:text-sm lg:text-base truncate">
                        {item.label}
                      </span>
                    </div>

                    <span className="flex-shrink-0">
                      {openDropdown === item.label ? (
                        <IoCaretUpSharp className="w-3 h-3 lg:w-4 lg:h-4" />
                      ) : (
                        <IoCaretDownSharp className="w-3 h-3 lg:w-4 lg:h-4" />
                      )}
                    </span>
                  </div>

                  {/* Dropdown Menu */}
                  <div
                    className={`ml-4 lg:ml-6 xl:ml-8 mt-1 overflow-hidden transition-all duration-300 font-[raleway]
                                ${
                                  openDropdown === item.label
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                  >
                    {item.children.map((child, i) => (
                      <Link
                        key={i}
                        to={child.to}
                        className={`block px-2 py-1 text-xs md:text-sm rounded-md font-[raleway] transition-all
                                 ${
                                   location.pathname === child.to
                                     ? "bg-[#E0F2FE] text-[#025F96] font-semibold"
                                     : "text-gray-700 hover:bg-gray-100"
                                 }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                /* Single Menu Item */
                <Link
                  to={item.to}
                  className={`flex items-center gap-1 sm:gap-2 md:gap-3 rounded-md transition font-[raleway]
                           px-1 sm:px-2 py-1 sm:py-2
                           ${
                             location.pathname === item.to
                               ? "bg-[#E0F2FE] text-[#025F96] font-extrabold"
                               : "text-[#025F96] hover:bg-gray-100 font-medium"
                           }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="text-xs md:text-sm lg:text-base truncate">
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile/Small Tablet: Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
        {/* Navigation Items - Mobile */}
        <div className="flex items-center justify-around px-2 py-3 sm:py-4">
          {menuItems.map((item, idx) => (
            <div key={idx} className="flex-1">
              {item.children ? (
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={`w-full flex justify-center items-center p-3 rounded-lg transition-all
                           ${
                             item.children.some(
                               (child) => location.pathname === child.to
                             )
                               ? "bg-[#E0F2FE] text-[#025F96]"
                               : "text-[#004A76] hover:bg-gray-100"
                           }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                </button>
              ) : (
                <Link
                  to={item.to}
                  className={`w-full flex justify-center items-center p-3 rounded-lg transition-all
                           ${
                             location.pathname === item.to
                               ? "bg-[#E0F2FE] text-[#025F96]"
                               : "text-[#004A76] hover:bg-gray-100"
                           }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Modal for Dropdown */}
      {showDropdownModal && openDropdown && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-xl shadow-xl transform transition-transform duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {menuItems.find((item) => item.label === openDropdown)?.icon}
                <h3 className="font-[raleway] font-semibold text-[#025F96] text-lg">
                  {openDropdown}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IoClose className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 pb-8">
              <div className="space-y-2">
                {menuItems
                  .find((item) => item.label === openDropdown)
                  ?.children?.map((child, i) => (
                    <Link
                      key={i}
                      to={child.to}
                      onClick={closeModal}
                      className={`block px-4 py-3 text-base rounded-lg font-[raleway] transition-all
                             ${
                               location.pathname === child.to
                                 ? "bg-[#E0F2FE] text-[#025F96] font-semibold"
                                 : "text-gray-700 hover:bg-gray-100"
                             }`}
                    >
                      {child.label}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16 sm:h-18"></div>
    </>
  );
};

export default ResponsiveSidebar;
