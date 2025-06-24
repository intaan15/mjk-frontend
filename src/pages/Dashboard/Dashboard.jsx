// komponen  react
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useAuth } from "../../components/Auth";
import useDashboard from '../../components/_hooksPages/useDashboard';
import useLogout  from '../../components/_hooksPages/useLogout';
import Calendar from '../../components/Dashboard/Calendar';
import Bar from '../../components/Bar/Bar';
import "../../index.css";
import.meta.env.VITE_BASE_URL


// icon
import { TiUser } from "react-icons/ti";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { BsFillBarChartFill } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import { FaUserClock } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";


// kenapa diluar func? agar tidak boros memori,dan efisien apabila terdapat elemen dashboard yg dirender ulang
const StatBox = ({ icon, title, value }) => (
  <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-20 sm:h-24 lg:h-28 flex items-center gap-2 sm:gap-4 sm: font-[raleway]">
    <div className='bg-[#38B6FE]/30 rounded-full p-2 sm:p-3 lg:p-4 flex-shrink-0 shadow-lg'>
      {icon}
    </div>
    <div className='flex flex-col flex-1 min-w-0'>
      <p className='text-sm sm:text-md lg:text-xl font-bold text-white underline truncate'>{title}</p>
      <p className='text-sm  sm:text-md lg:text-xl font-medium italic text-white'>{value}</p>
    </div>
  </div>
);


function Dashboard() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    setIsOpen,
   
    jumlahPengguna,
    verifikasiAkun,
    artikelLog,
    akunBaru,
    artikelPublish,
    allDokter,
    jadwalByTanggal,
    formatTanggal,
    toggleDropdown,
    isOpen,
    dataBar,
    handleLogout,
  } = useDashboard(selectedDate);

  return (
    <div className="min-h-screen sm:mb-2 md:mb-4 lg:mb-5 lg:mt-0 bg-gray-50 transition-all duration-300 ease-in-out overflow-x-hidden">
     {/* container main */}
      <main className="flex flex-col pt-4 px-4 sm:p-10 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1 md:pt-5  w-full max-w-full">

        {/* navbar */}
        <div className="flex md:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
            Dashboard
          </h1>
          <div className="flex flex-row gap-4 relative">
            <button
              onClick= {toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none cursor-pointer">
              <TiUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#292D32]" />
            </button>
            <div>
              {isOpen && (
                <>
                 <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)}></div>
                  <div className="absolute right-0 origin-top-right mt-8 w-48 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50">
                    <div className="py-1 justify-center">
                      <a
                        href="#"
                        className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">                        
                        <HiOutlineUser className='text-xl sm:text-2xl md:text-[30px]'/>
                        {user?.username}
                      </a>
                      
                      <a
                        onClick={handleLogout}
                        className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3 cursor-pointer">
                        <IoLogOutOutline className='text-xl sm:text-2xl md:text-[30px]'/>
                        Log Out
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <img src="line style.svg" alt="" className=' w-full max-w-full' />

        {/* header */}
        <div className='relative w-full max-w-full mt-2 sm:mt-0 '>
          
          {/* Gambar sebagai latar */}
          <img src="img_org.svg" alt="section img" className="w-full p-1 object-cover h-48 sm:h-56 md:h-64 lg:h-auto rounded-lg backdrop-blur-md"/>

          {/* Overlay teks dan kalender */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-3 sm:p-4 md:p-5">
            {/* Kalender */}
            <div className="rounded p-2 ">
              < Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            {/* Heading */}
             <div className="text-white text-left">
              <h2 className="font-[Poppins] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-md">
                Halo, Admin
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl italic text-white sm:text-[#004A76] font-medium font-[Poppins] drop-shadow-md">
              Selamat datang di Website Mojokerto Sehat
              </p>
            </div>
          </div>
        </div>

        {/* statistik  */}
        <div className="bg-gradient-to-br from-[#004A76] via-[#0066A0] to-[#004A76] rounded-2xl mt-2 sm:p-4 shadow-xl border border-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex pl-2 md:pl-3 items-left justify-center">
                  <StatBox
                    icon={<BsFillBarChartFill className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px] text-white"/>}
                    title="Jumlah Pengguna"
                    value={jumlahPengguna}
                  />
              </div>

              <div className="flex pl-2 md:pl-3 items-left justify-center">
                  <StatBox
                    icon={<GrArticle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px] text-white"/>}
                    title="Artikel Publish"
                    value={artikelPublish}
                  />
              </div>

              <div className="flex pl-2 md:pl-3 items-left justify-center">
                <StatBox
                  icon={<FaUserClock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px] text-white"/>}
                  title="Verifikasi Pengguna"
                  value={verifikasiAkun}
                />
              </div>
          </div>
        </div>

        {/* LogPengguna */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
           <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-[#025f96] pt-6'>
              Log Pengguna Harian
           </h2>
          </div>

          <div className='flex flex-col xl:flex-row gap-6'>
              <div className="w-full xl:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Kartu 1 */}
                  <div className="group bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-2xl p-4 sm:p-6 rounded-2xl flex flex-col items-start border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:transform relative overflow-hidden">
                    <div className='flex justify-between items-center w-full mb-2'>
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004A76] font-[raleway]">
                        {jadwalByTanggal}
                      </p>
                      <IoStatsChart className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-22 lg:w-24 lg:h-24 text-[#FF8FA7]/70'/>
                    </div>
                    <a href='/konsultasi' className="cursor-pointer text-sm sm:text-base md:text-lg text-[#004A76] font-bold underline hover:text-[#025f96]">
                      Konsultasi
                    </a>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {formatTanggal(selectedDate)}
                    </p>
                  </div>
                  
                  {/* Kartu 2 */}
                  <div className="group bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-2xl p-4 sm:p-6 rounded-2xl flex flex-col items-start border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:transform relative overflow-hidden">
                    <div className='flex justify-between items-center w-full mb-2'>
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004A76] font-[raleway]">
                        {akunBaru}
                      </p>
                      <IoStatsChart className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-22 lg:w-24 lg:h-24 text-[#4ED9D9]/70'/>
                    </div>
                    <a href='/datamasyarakat' className="cursor-pointer text-sm sm:text-base md:text-lg text-[#004A76] font-bold underline hover:text-[#025f96]">
                      Akun Baru
                    </a>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {formatTanggal(selectedDate)}
                    </p>
                  </div>
                  
                  {/* Card 3 - Dokter Terdaftar */}
                  <div className="group bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-2xl p-4 sm:p-6 rounded-2xl flex flex-col items-start border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:transform relative overflow-hidden">
                    <div className='flex justify-between items-center w-full mb-2'>
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004A76] font-[raleway]">
                        {allDokter}
                      </p>
                      <IoStatsChart className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-22 lg:w-24 lg:h-24 text-[#5EB5EF]/70'/>
                    </div>
                    <a href='/datadokter' className="text-sm sm:text-base md:text-lg text-[#004A76] font-semibold underline">
                      Dokter Terdaftar
                    </a>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {formatTanggal(selectedDate)}
                    </p>
                  </div>

                  {/* Card 4 - Artikel Publish */}
                  <div className="group bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-2xl p-4 sm:p-6 rounded-2xl flex flex-col items-start border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:transform relative overflow-hidden">
                    <div className='flex justify-between items-center w-full mb-2'>
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#004A76] font-[raleway]">
                        {artikelLog}
                      </p>
                      <IoStatsChart className='w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-22 lg:w-24 lg:h-24 text-[#FFD778]/70'/>
                    </div>
                    <a href='/dataartikel' className="text-sm sm:text-base md:text-lg text-[#004A76] font-semibold underline">
                      Artikel Publish
                    </a>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {formatTanggal(selectedDate)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className='w-full xl:w-1/2 flex items-stretch'>
                <div className="w-full roup bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-2xl rounded-xl flex flex-col h-full">
                  <span className='p-2 text-lg sm:text-xl md:text-2xl font-bold font-[raleway] text-[#025f96] underline text-center'>
                    Statistik Total Data
                  </span>
                  <div className='flex-1 flex items-center justify-center min-h-0 '>
                    <div className="w-4/5 max-w-sm aspect-square">
                      <Bar values={dataBar} className="w-full h-full"/>
                    </div>
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