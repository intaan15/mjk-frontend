// komponen  react
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import useDashboard from '../../components/_hooks/useDashboard';
import useLogout  from '../../components/_hooks/useLogout';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


import "../../index.css";
import Calendar from '../../components/Dashboard/Calendar';
import Bar from '../../components/Bar/Bar';
import { useAuth } from "../../components/Auth";
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
  <div className='w-[400px] h-[90px] flex flex-row justify-center gap-3 items-center'>
    <div className='bg-[#38B6FE]/30 rounded-full p-4'>
      {icon}
    </div>
    <div className='flex flex-col'>
      <p className='text-[18px] font-bold text-white underline'>{title}</p>
      <p className='text-[17px] font-medium italic text-white'>{value}</p>
    </div>
  </div>
);


function Dashboard() {
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const {handleLogout:handleLogout}=useLogout()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    jumlahKonsultasi,
    jumlahPengguna,
    verifikasiAkun,
    artikelLog,
    akunBaru,
    artikelPublish,
    allDokter,
    jumlahDokter,
    jadwalByTanggal,
    formatTanggal,
    toggleDropdown,
    isOpen,
    dataBar,
    
  } = useDashboard(selectedDate);

  return (
    <div className="flex flex-row h-screen pb-10">
     {/* container main */}
      <main className="flex flex-col pl-8 pr-3 gap-1  pb-3 h-screen">
        <div className="flex flex-row  items-center justify-between pt-3">
          <p className="text-3xl font-[raleway] font-bold text-[#004A76]">
            Dashboard
          </p>
          <div className="flex flex-row gap-4 relative">
            <button
              onClick= {toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none cursor-pointer">
              <TiUser className="w-11 h-11 text-[#292D32]"> </TiUser>
            </button>
            <div>
              {isOpen && (
                <>
                 <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)}></div>
                  <div className="absolute right-0 origin-top-right mt-8 w-48 lg: px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50 ">
                    <div className="py-1 justify-center">
                      <a
                        href="#"
                        className="flex flex-row py-2 text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                        <HiOutlineUser className='text-[30px]' />
                        {user?.username}
                      </a>
                      
                      <a
                        onClick={handleLogout}
                        className="flex flex-row py-2 text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3">
                        <IoLogOutOutline className='text-[30px]' />
                        Log Out
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <img src="line style.svg" alt="" className='w-screen' />

        {/* header */}
        <div className='relative w-full'>
          {/* Gambar sebagai latar */}
          <img src="img_org.svg" alt="" className="w-full object-cover h-auto" />

          {/* Overlay teks dan kalender */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-5 ">
            {/* Kalender */}
            <div className="rounded p-2 ">
              < Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            {/* Heading */}
            <div className="text-white ml-2">
              <h2 className="font-[Poppins] text-3xl font-bold">Halo, Admin</h2>
              <p className="italic text-xl cursor-pointer  text-[#004A76] font-medium font-[Poppins]">
                Selamat datang di Website Mojokerto Sehat
              </p>
            </div>
          </div>
        </div>

        {/* statistik  */}
        <div className="bg-[#004A76] flex flex-row rounded-lg mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-white items-center font-[raleway]">
               <div className="flex items-center gap-3">
                   <StatBox
                      icon={
                      <BsFillBarChartFill className="w-[30px] h-[30px] text-white font-[raleway]"/>}
                      title="Jumlah Pengguna"
                      value={jumlahPengguna}
                    />
               </div>

               <div className="flex items-center gap-3">
                    <StatBox
                      icon={<GrArticle className="w-[30px] h-[30px] text-white"/>}
                      title="Artikel Publish"
                      value={artikelPublish}
                    />
                </div>

               <div className="flex items-center gap-3">
                  <StatBox
                    icon={<FaUserClock className="w-[30px] h-[30px] text-white" />}
                    title="Verifikasi Pengguna"
                    value={verifikasiAkun}
                  />
               </div>
          </div>
        </div>

        {/* LogPengguna */}
        <div className='flex flex-col gap-3 bg-'>
          <div className='flex grid-rows-2 items-start justify-between p-3 rounded-lg'>
            <span className='text-2xl font-bold pt-2  text-[#025f96] justify-start'>Log Pengguna Harian</span>
          
            
          </div>

          <div className='flex'>
            <div className="grid grid-cols-2 gap-8 w-3/6 ">
              {/* Kartu 1 */}
              <div className="bg-white shadow-md p-4 rounded-xl flex flex-col items-start">
                <div className='flex grid-rows-2  gap-3 justify-between items-center w-full'>
                   <p className="text-6xl font-bold text-[#004A76] font-[raleway] ">{jadwalByTanggal}</p>
                   <IoStatsChart className='w-20 h-20 text-[#FF8FA7]/70'/>
                </div>
                  <a href='/konsultasi' className="cursor-pointer text-lg text-[#004A76] font-bold underline">Konsultasi</a>
                  <p className="text-sm text-gray-500">{formatTanggal(selectedDate)}</p>
              </div>

              {/* Kartu 2 */}
              <div className="bg-white shadow-md p-4 rounded-xl flex flex-col items-start">
                <div className='flex grid-rows-2 justify-between items-center w-full mb-2'>
                   <p className="text-6xl font-bold text-[#004A76] font-[raleway]  ">{akunBaru}</p>
                   <IoStatsChart className='w-20 h-20 text-[#4ED9D9]/70'/>
                </div>
                <a href='' className="text-lg text-[#004A76] underline font-semibold">Akun Baru</a>
                <p className="text-sm text-gray-500">{formatTanggal(selectedDate)}</p>
              </div>

              {/* Kartu 3 */}
              <div className="bg-white shadow-md p-4 rounded-xl flex flex-col items-start">
                <div className='flex grid-rows-2  gap-3 justify-between items-center w-full'>
                    <p className="text-6xl font-bold text-[#004A76] font-[raleway]">{allDokter}</p>
                   <IoStatsChart className='w-20 h-20 text-[#5EB5EF]/70'/>
                </div>
                <p className="text-lg text-[#004A76] font-semibold underline">Dokter Terdaftar</p>
                <p className="text-sm text-gray-500">{formatTanggal(selectedDate)}</p>
              </div>

              {/* Kartu 4 */}
              <div className="bg-white shadow-md p-4 rounded-xl flex flex-col items-start">
                <div className='flex grid-rows-2  gap-3 justify-between items-center w-full'>
                     <p className="text-6xl font-bold text-[#004A76] font-[raleway]">{artikelLog}</p>
                   <IoStatsChart className='w-20 h-20 text-[#FFD778]/70'/>
                </div>
                <p className="text-lg text-[#004A76] font-semibold underline">Artikel Publish</p>
                <p className="text-sm text-gray-500">{formatTanggal(selectedDate)}</p>
              </div>
            </div>

            {/* Chart Donut */}
            
            <div className=' flex justify-center w-3/6'>
              <div className="flex flex-col justify-center items-center bg-white w-5/6 rounded-xl shadow-md">
                <span className='text-2xl font-bold pt-2 font-[raleway] text-[#025f96] underline text-center'>Statistik Total Data</span>
                <Bar  values={dataBar} />
                {/* <Bar data={dummyData} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className=''>

        </div>

       

       


        
       
      </main>
    </div>
  )
}

export default Dashboard