import React from 'react';
import { useMemo } from 'react';
import Basetable from "../../components/Table/Basetable";
import useLogout from "../../components/_hooksPages/useLogout";
import useJadwal from '../../components/_hooksPages/useJadwal';
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { TiUser } from 'react-icons/ti'
import { LuSquareArrowLeft } from "react-icons/lu";
import { LuSquareArrowRight } from "react-icons/lu";
import { FaCalendarDays } from "react-icons/fa6";

const Jadwal = () => {
  const { handleLogout } = useLogout();
  const {
    // Data
    dataDokter,
    dynamicColumns,
    labelRentang,
    
    // States
    isOpen,
    mingguPage,
    loading,
    
    // Setters
    setIsOpen,
    setMingguPage,
    
    // Functions
    toggleDropdown,
    
    user,
  } = useJadwal();

  // Table columns
  const staticColumns = [
    { 
      id: "no",
      header: "No", 
      cell: ({ row }) => row.index + 1 
    },
    { 
      accessorKey: "nama_dokter", 
      header: "Nama",
      enableSorting: false, 
      cell: ({ getValue }) => (
        <div className="whitespace-normal break-words max-w-xs">
          {getValue()}
        </div>
      )
    },       
    { 
      accessorKey: "spesialis_dokter", 
      header: "Spesialis", 
      enableSorting: false, 
    }
  ];

  const columns = useMemo(
    () => [...staticColumns, ...dynamicColumns],
    [dynamicColumns]
  );

  return (
    <div className="min-h-screen sm:mb-2 md:mb-4 lg:mb-5 lg:mt-0 bg-gray-50 transition-all duration-300 ease-in-out overflow-x-hidden">
      <main className="flex flex-col pt-4 px-4 xs:p-8 sm:p-10 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1 md:pt-5  mb-20 sm:mb-0 w-full max-w-full">
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
            Jadwal Praktek Dokter
          </h1>
          
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Profile Dropdown */}
            <div className="flex flex-row gap-4 relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none cursor-pointer"
              >
                <TiUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#292D32]" />
              </button>

              <div>
                {isOpen && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/30 z-40 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 origin-top-right mt-8 w-48 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50">
                      <div className="py-1 justify-center">
                        <a className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                          <HiOutlineUser className="text-xl sm:text-2xl md:text-[30px]" />
                          {user?.username}
                        </a>

                        <a
                          onClick={handleLogout}
                          className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3 cursor-pointer"
                        >
                          <IoLogOutOutline className="text-xl sm:text-2xl md:text-[30px]" />
                          Log Out
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
       <div className="h-1 w-full max-w-full bg-[#004a76]"/>

        {/* Date Navigation */}
        <div className="flex flex-row items-center justify-center text-center pt-3">
          <div className="flex items-center bg-gradient-to-r from-[#004A76]/5 to-[#0077B6]/5 backdrop-blur-sm rounded-2xl p-1 shadow-lg border border-white/20">
            <button
              onClick={() => setMingguPage(mingguPage - 1)}
                className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm shadow-md border border-[#004A76]/10 text-[#004A76] transition-all duration-300 hover:bg-[#004A76] hover:text-white hover:shadow-xl hover:scale-105 active:scale-95"
              >
              <LuSquareArrowLeft  className="text-xl transition-transform duration-300 group-hover:-translate-x-0.5"  />
            </button>
              
            
            <div className="mx-4 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-[#004A76]/10 min-w-[200px] transition-all duration-300 hover:shadow-lg hover:bg-white">
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#004A76] to-[#0077B6] rounded-lg shadow-sm">
                  <FaCalendarDays className="text-white text-xs" />
                </div>
                <span className="font-semibold text-[#004A76] text-sm tracking-wide">
                  {labelRentang}
                </span>
              </div>
            </div>
            
            <button
                className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm shadow-md border border-[#004A76]/10 text-[#004A76] transition-all duration-300 hover:bg-[#004A76] hover:text-white hover:shadow-xl hover:scale-105 active:scale-95"
                onClick={() => setMingguPage(mingguPage + 1)}
            >
              <LuSquareArrowRight className="text-xl transition-transform duration-300 group-hover:-translate-x-0.5"  />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-2 flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004A76]"></div>
                <p className="text-[#004A76] font-medium">Memuat data jadwal...</p>
              </div>
            </div>
          ) : dataDokter.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-600">Tidak ada data jadwal dokter</p>
            </div>
          ) : (
            <Basetable data={dataDokter} columns={columns} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Jadwal;