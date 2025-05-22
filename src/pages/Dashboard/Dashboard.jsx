// komponen  react
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';



import "../../index.css";
import Calendar from '../../components/Dashboard/Calendar';
import Bar from '../../components/Bar/Bar';
import { useAuth } from "../../components/Auth";


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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date().toISOString().split('T')[0];  
  const [jumlahKonsultasi, setJumlahKonsultasi] = useState(0);
  const [jumlahPengguna, setJumlahPengguna] = useState(0);
  const [verifikasiakun,setVerifikasiAkun] = useState(0)
  const [artikelLog, setArtikelLog] = useState(0);
  const [jadwalbyTanggal,setJadwalbyTanggal] = useState();
  const [akunBaru, setAkunBaru] =useState(0)
  const [artikelPublish,setArtikelPublish]=useState(0);
  const [allDokter, setAllDokter] = useState(0);
  const [jumlahDokter, setDokter] = useState(0);
  const [stats, setStats] = useState({});
  const [data, setData] = useState([]);''
  const { user } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    navigate("/login");      // Redirect ke halaman login
  };

    // endpoint untuk ambil data
    useEffect(() => {

      // API MASAYARAKAT
      const fetchMasyarakat = async () => {
        try {
          const res = await axios.get('https://mjk-backend-production.up.railway.app/api/masyarakat/getall' ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          const jumlahPengguna = res.data.length; 
          const selected = selectedDate.toISOString().split('T')[0];  
          const pending = res.data.filter(item => item.verifikasi_akun_masyarakat === 'pending').length;
          const akunBaru = res.data.filter(item =>{
            const tglCreate = new Date(item.createdAt).toISOString().split('T')[0];
            return tglCreate === selected;
          }).length;
          
          setAkunBaru(akunBaru);
          setJumlahPengguna(jumlahPengguna);
          setVerifikasiAkun(pending);
        } catch (err) {
          console.error('Gagal fetch masyarakat:', err);
        }
      };


      // API ARTIKEL
      const fetchArtikel = async() =>{ 
        try {
          const res = await axios.get(
            "https://mjk-backend-production.up.railway.app/api/artikel/getall",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const artikelPublish = res.data.length;
          const selected = selectedDate?.toISOString().split('T')[0];
          const artikelLog = res.data.filter (item => {
            const tgl = new Date(item.tgl_terbit_artikel).toISOString().split('T')[0];
            return tgl === selected;
          }).length;
          
          setArtikelLog(artikelLog)
          setArtikelPublish(artikelPublish)
        }catch(err){
          console.error('Gagal fetch artikel:', err);
        }
      };

      // API JADWAL KONSULTASI
      const fetchKonsultasi = async() => {
        try {
          const res = await axios.get(
            `https://mjk-backend-production.up.railway.app/api/jadwal/getall`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const jumlahKonsultasi = res.data.length;
          const selected = selectedDate?.toISOString().split('T')[0];
          const jadwalbyTanggal =  res.data.filter(item => {
            const tgl = new Date(item.tgl_konsul).toISOString().split('T')[0];
            return tgl === selected && (
              item.status_konsul === 'diterima' || 
              item.status_konsul === 'selesai' || 
              item.status_konsul === 'menunggu' ||
              item.status_konsul === 'ditolak')
          }).length;

          setJumlahKonsultasi(jumlahKonsultasi)
          setJadwalbyTanggal(jadwalbyTanggal)
        } catch (err){
          console.error('Gagal fetch jadwal:', err);
        }
      };

      const fetchDokter = async() =>{ 
        try {
          const res = await axios.get(
            "https://mjk-backend-production.up.railway.app/api/dokter/getall",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const dokter = res.data.length;
          const selected = selectedDate?.toISOString().split('T')[0];
          const allDokter = res.data.filter(item => {
             const tgl = new Date(item.createdAt).toISOString().split('T')[0];
             return tgl === selected
          }).length

          setDokter(dokter)
          setAllDokter(allDokter)
        }catch(err){
          console.error('Gagal fetch artikel:', err);
        }
      };

      fetchDokter();
      fetchKonsultasi();
      fetchMasyarakat();
      fetchArtikel();
    },  [selectedDate]);

  // Format tanggal ke dalam format dd-mm-yyyy
  const formatTanggal = (tanggal) => {
    const dateObj = new Date(tanggal);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

// Data untuk chart
 const dataBar = {
  konsultasi: jumlahKonsultasi,
  masyarakat: jumlahPengguna, 
  dokter: jumlahDokter,
  artikel: artikelPublish,
  };


  return (
    <div className="flex flex-row h-screen">
     {/* container main */}
      <main className="flex flex-col pl-8 pr-3 gap-1  pb-3 h-screen">
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
                        {user?.username}
                      </a>
                      
                      <a
                        href="#"
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
            <div className="rounded p-2">
              < Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            {/* Heading */}
            <div className="text-white ml-2">
              <h2 className="font-[Poppins] text-3xl font-bold">Hi, Admin</h2>
              <p className="italic text-xl text-[#004A76] font-medium font-[Poppins]">
                Selamat datang di Website Mojokerto Sehat
              </p>
            </div>
          </div>
        </div>

        {/* statistik  */}
        <div className="bg-[#004A76] flex flex-row rounded-lg mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-white items-center">
               <div className="flex items-center gap-3">
                   <StatBox
                      icon={
                      <BsFillBarChartFill className="w-[30px] h-[30px] text-white font-[Nunito Sans]"/>}
                      title="Jumlah Pengguna"
                      value={jumlahPengguna}
                    />
               </div>

               <div className="flex items-center gap-3">
                    <StatBox
                      icon={<GrArticle className="w-[30px] h-[30px] text-white" />}
                      title="Artikel Publish"
                      value={artikelPublish}
                    />
                </div>

               <div className="flex items-center gap-3">
                  <StatBox
                    icon={<FaUserClock className="w-[30px] h-[30px] text-white" />}
                    title="Verifikasi Pengguna"
                    value={verifikasiakun}
                  />
               </div>
          </div>
        </div>

        {/* LogPengguna */}
        <div className='flex flex-col gap-3'>
          <div>
            <p className="font-[Nunito Sans] text-2xl font-bold pt-2  text-[#025f96] justify-between ">
              Log Statistik Data
            </p>
          </div>

          <div className='flex'>
            <div className="grid grid-cols-2 gap-6 w-3/6 ">
              {/* Kartu 1 */}
              <div className="bg-white shadow-md p-4 rounded-xl flex flex-col items-start">
                <p className="text-5xl font-bold text-[#004A76]">{jadwalbyTanggal}</p>
                <p className="text-lg text-[#004A76] font-semibold">Konsultasi</p>
                <p className="text-sm text-gray-500">{formatTanggal(selectedDate)}</p>
              </div>

              {/* Kartu 2 */}
              <div className="bg-white shadow-md p-4 rounded-xl flex flex-col items-start">
                <p className="text-5xl font-bold text-[#004A76]">{akunBaru}</p>
                <p className="text-lg text-[#004A76] font-semibold">Akun Baru</p>
                <p className="text-sm text-gray-500">{formatTanggal(selectedDate)}</p>
              </div>

              {/* Kartu 3 */}
              <div className="bg-white shadow-md p-4 rounded-xl flex flex-col items-start">
                <p className="text-5xl font-bold text-[#004A76]">{allDokter}</p>
                <p className="text-lg text-[#004A76] font-semibold">Dokter Terdaftar</p>
                <p className="text-sm text-gray-500">{formatTanggal(selectedDate)}</p>
              </div>

              {/* Kartu 4 */}
              <div className="bg-white shadow-md p-4 rounded-xl flex flex-col items-start">
                <p className="text-5xl font-bold text-[#004A76]">{artikelLog}</p>
                <p className="text-lg text-[#004A76] font-semibold">Artikel Publish</p>
                <p className="text-sm text-gray-500">{formatTanggal(selectedDate)}</p>
              </div>
            </div>

            {/* Chart Donut */}
            <div className=' flex justify-center w-3/6'>
              <div className="flex justify-center w-5/6 bg-white rounded-xl shadow-md">
                <Bar  values={dataBar} />
                {/* <Bar data={dummyData} /> */}
              </div>
            </div>
          </div>
        </div>

       

       


        
       
      </main>
    </div>
  )
}

export default Dashboard