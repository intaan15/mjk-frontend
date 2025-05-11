// komponen  react
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';


import Calendar from '../../components/Dashboard/Calendar';
import Bar from '../../components/Bar/Bar';


// icon
import { TiUser } from "react-icons/ti";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { BsFillBarChartFill } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import { FaUserClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


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
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [jumlahKonsultasi, setJumlahKonsultasi] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const [stats, setStats] = useState({});
    const [data, setData] = useState([]);''
    const [usernameadmin, setUsernameadmin] = useState([]);
    const today = new Date().toISOString().split('T')[0];  
    const navigate = useNavigate();

    const handleLogout = () => {
      // Hapus token dari localStorage
      localStorage.removeItem("token");

      // Redirect ke halaman login
      navigate("/login");
    };

    useEffect(() => {
      console.log('Tanggal yang dipilih:', selectedDate);
    }, [selectedDate]);


    // endpoint untuk ambil data
    useEffect(() => {
      
      axios.get('https://mjk-backend-production.up.railway.app/api/masyarakat/getall')
        .then(res => {
          const jumlahPengguna = res.data.filter(item => item.verifikasi_akun_masyarakat === 'Terima');
          setStats(prevStats => ({
            ...prevStats,
            jumlahPengguna: jumlahPengguna.length,  

          }));
        })
        .catch(err => console.error(err));
      }, []);

      // ambil data artikel
      axios.get('https://mjk-backend-production.up.railway.app/api/artikel/getall')
      .then(res => {
        const jumlahArtikel = res.data.length;
          if (selectedDate instanceof Date && !isNaN(selectedDate)) {
            const selected = selectedDate.toISOString().split('T')[0];
            const artikelToday = res.data.filter(item => {
              const tgl_terbit_artikel = new Date(item.tgl_terbit_artikel).toISOString().split('T')[0];
        return tgl_terbit_artikel === selected && jumlahArtikel;
      });
        setStats(prevStats => ({
          ...prevStats,
          artikelPublish: jumlahArtikel,
          artikelHariIni: artikelToday.length,

        }));
       }})
      .catch(err => console.error(err));

      //ENDPOINT UNTUK DATA MASYARAKAT
      axios.get(`https://mjk-backend-production.up.railway.app/api/masyarakat/getall`)
      .then((res) => {
        // jumlah pengguna
        const jumlahPengguna = res.data.length;

        // JUMLAH VERIFIKASI
        const pendingCount = data.filter(item => item.verifikasi_akun_masyarakat === 'pending').length;


        // log data akun baru - filter berdasarkan tanggal
        const filtered = res.data.filter(item => {
          const createdAt = new Date(item.createdAt).toISOString().split('T')[0]; // Ambil tanggal dari createdAt
          const selected = selectedDate.toISOString().split('T')[0]; // Ambil tanggal yang dipilih dari calendar
          return createdAt === selected && item.verifikasi_akun_masyarakat === 'pending';
        });
        
        setStats(prev => ({
          ...prev,
          jumlahPengguna: res.data.length,
          filteredData: filtered.length
        }));
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });


      axios.get(`https://mjk-backend-production.up.railway.app/api/jadwal/getall`)
      .then((res) => {
          const filtered = res.data.filter(item => {
          const tgl = new Date(item.tgl_konsul).toISOString().split('T')[0];
          const selected = selectedDate?.toISOString().split('T')[0];
          return tgl === selected && item.verifikasi_akun_masyarakat === 'Pending';
        });
        setJumlahKonsultasi(filtered.length)
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      },[selectedDate]);


      axios.get(`https://mjk-backend-production.up.railway.app/api/admin/getall`)
      .then((res) => {
        const usernameadmin = res.data.map((admin) => admin.username_superadmin);
        setUsernameadmin(usernameadmin)

        })
      .catch((err) => {
        console.error('Error fetching data:', err);
      },[]);


   


  return (
    <div className="flex flex-row h-full">
     {/* container main */}
      <main className="flex flex-col pl-8 pr-3 gap-1 ">
        <div className="flex flex-row  items-center justify-between pt-3">
          <p className="text-3xl font-[Nunito Sans] font-bold text-[#004A76]">
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
                        Administrator
                      </a>
                      
                      <a
                        href="#"
                        onClick={handleLogout}
                        className="flex flex-row py-2 text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3">
                        <IoLogOutOutline className='text-[30px]' />
                        {" "}
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


        
        <div className="flex flex-row items-center justify-between w-full bg-[#004A76] rounded-xl p-6">
          <div className="font-bold text-white pl-3 flex  flex-col pt-5 gap-10  ">
            {/* calender */}
            <div className="justify-center items-center pt-2 ">
              <Calendar 
              className="w-5 h-5" 
              onChange={(date) => setSelectedDate(date)} 
              value={selectedDate}/>
            </div>

            {/* heading */}
            <div className="sticky">
              <h2 className="font-[raleway] text-3xl font-bold text-white">
                Hi, Admin
              </h2>
              <p className="font-[NunitoSans] italic text-2xl text-[#004A76] font-bold ">
                Selamat datang di Website Mojokerto Sehat
              </p>
            </div>
          </div>
          <img src="img_org.svg" alt="" className="h-auto object-contain" />
        </div>

        {/* statistik  */}
        <div className="bg-[#004A76]  p-1 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-white items-center pl-3">
               <div className="flex items-center gap-3">
                   <StatBox
                      icon={
                      <BsFillBarChartFill className="w-[30px] h-[30px] text-white font-[Nunito Sans]"/>}
                      title="Jumlah Pengguna"
                      value={stats.jumlahPengguna}
                    />
               </div>

               <div className="flex items-center gap-3">
                    <StatBox
                      icon={<GrArticle className="w-[30px] h-[30px] text-white" />}
                      title="Artikel Publish"
                      value={stats.artikelPublish}
                    />
                </div>

               <div className="flex items-center gap-3">
                  <StatBox
                    icon={<FaUserClock className="w-[30px] h-[30px] text-white" />}
                    title="Verifikasi Pengguna"
                    value={stats.filteredData}
                  />
               </div>
          </div>
        </div>

        {/* LogPengguna */}
        <div className='flex flex-col gap-3'>
          <div>
            <p className="font-[Nunito Sans] text-2xl font-bold pl-5  text-[#025f96] justify-between ">
              Log Aktivitas Pengguna{" "}
            </p>
          </div>

          <div className="flex flex-row gap-8 justify-center items-center lg:h-auto ">
            <div className="flex flex-row md:w-full  ">
              <div className="grid grid-cols-2 gap-6 ">
                <div className="grid grid-cols-2 gap-4 bg-[#D9D9D9] h-auto  lg:w- justify-center rounded-xl p-4">
                  <div>
                    <h3 className="font-bold text-[16px] text-black underline">
                      Konsultasi
                    </h3>
                    <p className="text-[15px] text-black">{jumlahKonsultasi}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-black underline">
                      Akun Baru
                    </h3>
                    <p className="text-[15px] text-black">{stats.filteredData}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-black underline">
                      Dokter Aktif  
                    </h3>
                    <p className="text-[15px] text-black">35 Akun Dokter</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-black underline">
                      Artikel Hari Ini
                    </h3>
                    <p className="text-[15px] text-black">{stats.artikelHariIni}</p>
                  </div>
                </div>
              </div>


              <div className="flex flex-row md:w-full gap-8 justify-center items-center lg:h-auto">
                <div className="flex flex-row ">
                  <div className="grid grid-cols-2 gap-6 ">
                    <div className="grid grid-cols-2 gap-4 bg-[#D9D9D9] h-auto  lg:w- justify-center rounded-xl p-4">
                      <div>
                        <h3 className="font-bold text-[16px] text-black underline">
                          Konsultasi
                        </h3>
                        <p className="text-[15px] text-black">{jumlahKonsultasi}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-[16px] text-black underline">
                          Akun Baru
                        </h3>
                        <p className="text-[15px] text-black">{stats.filteredData}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-[16px] text-black underline">
                          Dokter Aktif  
                        </h3>
                        <p className="text-[15px] text-black">35 Akun Dokter</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-[16px] text-black underline">
                          Artikel Hari Ini
                        </h3>
                        <p className="text-[15px] text-black">{stats.artikelHariIni}</p>
                      </div>
                    </div>
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