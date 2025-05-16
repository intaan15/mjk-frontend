import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Basetable from "../../components/Table/Basetable";

import { IoIosSearch } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa6";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUserMinus } from "react-icons/hi2";
import { TiUser } from 'react-icons/ti'
import { SiOpenstreetmap } from 'react-icons/si';


const Jadwal = (dokterId ) => {
  const toggleDropdown = () => {setIsOpen(!isOpen);};
  const [loading, setLoading] = useState(false);
  const [jadwal, setJadwal] = useState([]);
  const [namaDokter, setNamaDokter] = useState('');
  const [dataDokter, setDataDokter] = useState([]);
  const [data,setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tanggalHeader,setTanggalHeader] = useState([]);
  

  
  useEffect(() => {
    const fetchDokter = async () => {
      try {
        const res = await axios.get(`https://mjk-backend-production.up.railway.app/api/dokter/getall`);
        const alldokter = res.data;
        // setNamaDokter(dokter.nama_dokter);
        const mapDokter = alldokter.map((dokter) => ({
          id: dokter._id,
          nama: dokter.nama_dokter,
          jadwal: dokter.jadwal
          
          //   // const sortedJadwal = jadwalArray
          //   //   // .filter(j => j && j.tanggal) // pastikan aman
          //   //   .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
          //   //   const outputjadwal= sortedJadwal.map(j => {
          //   //     const sortedJam = [...j.jam].sort((a, b) => a.time.localeCompare(b.time));
          //   //     const jam_awal = sortedJam[0]?.time || "-";
          //   //     const jam_akhir = sortedJam[sortedJam.length - 1]?.time || "-";
          //   //     const tanggalFormatted = new Date(j.tanggal).toLocaleDateString("id-ID", {
          //   //       weekday: "long",    
          //   //       year: "numeric",
          //   //       month: "long",
          //   //       day: "numeric"
          //   //     });
          //   //   return {
          //   //      tanggal: tanggalFormatted,
          //   //      jam_awal,
          //   //      jam_akhir,
          //   //      range: `${jam_awal} - ${jam_akhir}`
          //   //   };
          //   //   })
          //     console.log("inijadwal",jadwalArray)
        }));
        const allJadwal = mapDokter.flatMap(d => 
          d.jadwal.map(j => ({
            nama_dokter: d.nama,
            tanggal: j.tanggal,
            jam: j.jam
          }))
        );
          
        console.log("inisorted",allJadwal)
        
       
        const semuaTanggal = mapDokter.flatMap(d => d.jadwal.map(j => j.tanggal));
        const tanggalUnik = [...new Set(semuaTanggal)];
        setTanggalHeader(tanggalUnik);
        
        console.log("nihasilmap",mapDokter); // ✅ Lihat struktur data
        const nama = mapDokter.map((dokter) => dokter.nama);
        // console.log(nama)
        setDataDokter(mapDokter);
      } catch (error) {
         console.error(error);}
  }; fetchDokter();},[]);



  const staticColumns = [
    {
       header: "No",
       enableSorting: false,
       cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "nama",
       header: "Nama",
       enableSorting: false,
    },
    // {
    //    accessorKey :"jadwal",
    //    header: "Jadwal",
    //    enableSorting: false,
    //    cell: ({ row }) => (
    //       <div>
    //         {row.original.jadwal.map((j, idx) => (
    //           <div key={idx}>
    //             {j.tanggal}: {j.range}
    //           </div>
    //         ))}
    //       </div>
    //   )
    // },
  ]
    const dynamicColumns = tanggalHeader.map(tgl => ({
      header: tgl,
        accessorFn: row => {
          const jadwalTanggal = row.jadwal.find(j => j.tanggal === tgl);
          
          return jadwalTanggal ? jadwalTanggal.range : "-";
        },
        id: tgl,
        enableSorting: false,
    }));
  const columns = [...staticColumns, ...dynamicColumns];


  

  return (
    <div className='flex flex-row'>
      <main className='flex flex-col pl-8 gap-1 w-full pr-3 h-screen'>
         <div className='flex flex-row items-center justify-between pt-1'>
            <p className='text-3xl font-[Nunito Sans] font-bold text-[#004A76]'>Jadwal Praktek Dokter</p>
            <div className="flex flex-row gap-4 relative">
                <div className=" flex items-center rounded-[19px] px-5 justify-start py-1 border-[1.5px] border-gray-300 gap-2 ">
                    <IoIosSearch className="text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Pencarian"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-gray-700 text-sm outline-none bg-transparent"
                    />
                </div>

                <div className="flex flex-row gap-4 relative">
                    <button 
                    onClick={toggleDropdown} 
                    className="flex items-center focus:outline-none cursor-pointer">
                    <TiUser className='w-11 h-11 text-[#292D32]'> </TiUser>
                    </button>

                    <div>
                    {isOpen && (
                        <>
                        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)}></div>
                        <div className="absolute right-0 origin-top-right mt-8 w-48 lg: px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50 ">
                            <div className="py-1 justify-center">
                            <a
                                href=""
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
        </div>
        <img src="/line style.svg" alt="" />


        <div className="py-2">
          {loading ? (
              <p>Loading data...</p>
          ) : (
              <>
              <Basetable data={dataDokter} columns={columns} />
              </>
              
          )}
        </div>
      </main>
    </div>
  )
}

 const mapDokter = alldokter.map((dokter) => ({
          id: dokter._id,
          nama: dokter.nama_dokter,
          jadwal: dokter.jadwal
        }));

        const allJadwal = mapDokter.flatMap(d => 
          d.jadwal.map(j => ({
            nama_dokter: d.nama,
            tanggal: j.tanggal,
            jam: j.jam,
            formatTgl: new Date(j.tanggal).toLocaleDateString("id-ID", {
              weekday: "long",    
              year: "numeric",
              month: "long",
              day: "numeric"
            })
          }))
        ).sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

        
export default Jadwal
