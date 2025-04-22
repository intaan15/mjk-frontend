// komponen  react
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';


// import "cally"
import Sidebar from '../../components/Sidebar/Sidebar';
import Calendar from '../../components/Dashboard/Calendar';
import Bar from '../../components/Bar/Bar';


// icon

import { FaCircleUser } from "react-icons/fa6";
import { TiUser } from "react-icons/ti";
import { BsFillBarChartFill } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import { FaUserClock } from "react-icons/fa";


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

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [stats, setStats] = useState({
      jumlahPengguna: 20,
      artikelPublish: 100,
      verifikasiPengguna: 1000
    });

    useEffect(() => {
      axios.get('http://localhost:5000/api/dashboard-stats')
        .then(res => setStats(res.data))
        .catch(err => console.error(err));
    }, []);

  return (
    <div className='flex flex-row '>

      {/* navbar */}
      <main className=' w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100 '>
        <div className='flex flex-row grid-2 items-center justify-between  pt-2'>
          <p className='text-[25px] font-[raleway] font-bold text-[#025f96]'>Dashboard</p>
          <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none cursor-pointer">
            <TiUser className='w-[30px] h-[30px] text-[#292D32]'> </TiUser>
            <div>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-md shadow-lg bg-white ring-1  ring-opacity-3 z-50 ">
                
                <div className="py-1">
                  <a href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 ">Profil Admin</a>
                  <a href="/" className="block py-2 text-sm text-gray-700 hover:bg-gray-100"> Log Out</a>
                </div>

              </div>
            )}
            </div>
          </button>
        </div>
        <img src="line style.svg" alt="" />

        
        {/* col 1 */}
        <div className='flex flex-row pl-1'>
          <div className=''>
            <div className="font-bold text-white pl-3 absolute flex flex-col pt-5  gap-16   ">
              <div className='justify-center items-center pt-2'>
                <Calendar className="w-5 h-5"/>
              </div>
              <div className='items-end relative '>
                <h2 className="text-[28px] font-bold text-white">Hi, Admin</h2>
                <p className="text-[20px] text-white font-medium ">Selamat datang di Website Mojokerto Sehat</p>
              </div>   
            </div>
            <img src="img_org.svg" alt="" className='' />
          </div>
        </div>
          
        {/* tengah/col2 */}
        <div className='bg-[#004A76] h-[80px] rounded-xl flex flex-row justify-center items-center'>
          <StatBox
            icon={<BsFillBarChartFill className='w-[30px] h-[30px] text-white' />}
            title="Jumlah Pengguna"
            value={stats.jumlahPengguna}
          />
          <StatBox
            icon={<GrArticle className='w-[30px] h-[30px] text-white' />}
            title="Artikel Publish"
            value={stats.artikelPublish}
          />
          <StatBox
            icon={<FaUserClock className='w-[30px] h-[30px] text-white' />}
            title="Verifikasi Pengguna"
            value={stats.verifikasiPengguna}
          />
        </div>
        

        
        
        {/* col 3 */}
          <div className='w-full h-auto rounded-3xl flex flex-col gap-3'>
            <div>
              <p className='font-[raleway] text-[20px] font-bold pl-5  text-[#025f96] justify-between '>Log Aktivitas Pengguna </p>
            </div>

            <div className='flex flex-row gird-rows-2 w-full gap-8 justify-between'>

              <div className=' bg-[#D9D9D9] w-[530px] rounded-xl flex flex-row justify-center items-center'>
                
                <div className='flex flex-col gap-4'>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold underline">Konsultasi</p>
                      <p className="text-gray-600">35 Orang</p>
                    </div>
                    <div>
                      <p className="font-semibold underline">Akun Baru</p>
                      <p className="text-gray-600">20 Akun</p>
                    </div>
                    <div>
                      <p className="font-semibold underline">Dokter Aktif</p>
                      <p className="text-gray-600">5 Orang</p>
                    </div>
                    <div>
                      <p className="font-semibold underline">Artikel Publish</p>
                      <p className="text-gray-600">3 Artikel</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-[#D9D9D9] w-[530px] rounded-xl flex flex-row justify-center items-center'>
                <Bar />
                <div>
                <div className="text-sm space-y-1">
                  <p><span className="inline-block w-3 h-3 rounded-full bg-pink-400 mr-2"></span>Konsultasi (300)</p>
                  <p><span className="inline-block w-3 h-3 rounded-full bg-teal-400 mr-2"></span>Masyarakat (1200)</p>
                  <p><span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span>Dokter (150)</p>
                  <p><span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>Artikel (500)</p>
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