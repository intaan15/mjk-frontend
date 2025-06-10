import React from 'react'
import axios from 'axios'
import Basetable from "../../components/Table/Basetable";
import { useAuth } from "../../components/Auth";
import.meta.env.VITE_BASE_URL

import { useState } from "react";
import { useEffect } from "react";


// import Trash from "./icons/Trash";
import { IoIosSearch } from "react-icons/io";
import { TiUser } from "react-icons/ti";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";







function Konsultasi() {

  const token = localStorage.getItem("token");
  const [filterStatus, setFilterStatus] = useState("Diproses");
  const [allRows, setAllRows] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // filterstatus
  const filteredRows = data.filter((row) => {
    const statusMatch =
      filterStatus === "Diproses"
        ? row.status_konsul === "menunggu" || row.status_konsul === "berlangsung" || row.status_konsul === "diterima"
        : filterStatus === "Selesai"
        ? row.status_konsul === "selesai" || row.status_konsul === "ditolak"
        : true;
    
    // Filter berdasarkan nama pasien
    const nameMatch = row.masyarakat_id?.nama_masyarakat?.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && nameMatch;

  });

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Redirect ke halaman login
    navigate("/login");
  };


   const formatTanggal = (isoDateString) => {
  const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };


  // ENDPOINT GET DATA jadwal
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/jadwal/getall`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((res) => {
            const data = res.data;
            setAllRows(data);
            console.log(data);
            setData(data);
        })
        .catch((err) => {
        console.error('Error fetching data:', err);
        });
  }, []);

   const columns = [
           {
            header: "No",
            enableSorting: false,
            cell: ({ row }) => row.index + 1,
          },
          {
              accessorKey: "nama_masyarakat",
              header: "Nama Pasien",
              enableSorting: false,
              cell: ({ row }) => 
              <div className="w-40 truncate">
                  {row.original.masyarakat_id?.nama_masyarakat || "-"}
              </div>
          },
          {
              accessorKey: "spesialis_dokter",
              header: "Poli",
              enableSorting: false,
              cell: ({ row }) => row.original.dokter_id?.spesialis_dokter || "-"
          },
          {
              accessorKey: "nama_dokter",
              header: "Nama Dokter",
              enableSorting: false,
              cell: ({ row }) =>  <div className="w-40 truncate">
                  {row.original.dokter_id?.nama_dokter || "-"}
              </div>

          },
          {
              accessorKey: "jam_konsul",
              header: "Waktu",
              enableSorting: false,

          },
          {
              accessorKey: "tgl_konsul",
              header: "Tgl. Konsultasi",
              enableSorting: true,
              cell: info => formatTanggal(info.getValue()),

          },
          {
              accessorKey: "status_konsul",
              header: "Status",
              enableSorting: false,
              cell: ({ row }) => {
                const status = row.original.status_konsul;

                let bgColor = "";
                let textColor = "";
                let label = "";
                let fontstyle = "";

                switch (status) {
                  case "selesai": //selesai konsultasi
                    bgColor = "bg-[#27AE60]";
                    textColor = "text-white" ;
                    label = "Selesai";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "ditolak": //ditolak dokter
                    bgColor = "bg-[#EF3826]";
                    textColor = "text-white";
                    label = "Ditolak";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "diterima": //jadwal diterima belum melakukan konsultasi
                    bgColor = "bg-[#BCE2C5]";
                    textColor = "text-[#155724]";
                    label = "Diterima";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "berlangsung": //sedang terjadi konsultasi
                    bgColor = "bg-[#3498DB]";
                    textColor = "text-white";
                    label = "Berlangsung";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "menunggu": //menunggu konsultasi 
                    bgColor = "bg-[#FFE592]";
                    textColor = "text-[#856404]";
                    label = "Menunggu";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  default:
                    bgColor = "bg-gray-200";
                    textColor = "text-gray-800";
                    label = "Tidak diketahui";
                    fontstyle ="font-[raleway] font-semibold";
                }
                return (
                  <span className={`px-2 py-1 rounded-md text-sm font-medium ${bgColor} ${textColor}`}>
                    {label}
                  </span>
                );
             }
              

          },
        
          
      ];
      
  
  
  return (
    <div className="flex flex-row h-screen">
      <main className='flex flex-col pl-8 gap-1 w-full pr-3 h-screen'>
        
        {/* Atas(search & profile) */}
        <div className='flex flex-row  items-center justify-between pt-3'>
          <p className='text-3xl font-[raleway] font-bold text-[#004A76]'>
            Konsultasi
          </p>
          <div className="flex flex-row gap-2 relative">

            {/* search */}
            <div className="flex items-center rounded-[19px] px-3 justify-start py-1 border-[1.5px] border-gray-300 gap-3">
              <IoIosSearch className="text-gray-400"/>
              <input
                type="text"
                placeholder="Cari Nama"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-700 text-sm outline-none bg-transparent" />             
            </div>

            {/* akun */}
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
                          href=""
                          className="flex flex-row py-2 text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                          <HiOutlineUser className='text-[30px]' />
                          {user?.username}
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
       <div className="w-[100%] h-1 bg-[#1177B3]"></div>


        {/* Button Tengah */}
        <div className="flex flex-row justify-center w-full py-2 gap-20">
          <button
            onClick={() => setFilterStatus("Diproses")}
            className={`${
               filterStatus === "Diproses"
                ? "bg-[#004A76] font-bold font-[raleway]"
                : "bg-[#B3B3B3]" 
             } hover:opacity-80 text-white w-[205px] h-[35px] rounded-[20px] text-[15px] border-[#E3F0F8]`}>
             Diproses 
          </button>

          <button
            onClick={() => setFilterStatus("Selesai")}
            className={`${
              filterStatus === "Selesai"
               ?"bg-[#004A76] font-bold font-[raleway]" 
               :"bg-[#B3B3B3]"
            } hover:opacity-80 text-white w-[205px] h-[35px] rounded-[20px] text-[15px] border-[#E3F0F8] border-2 focus-ring-2 `}>
            Riwayat
          </button>
        </div>

    
        {/* HEADER TABEL Filtering Tabel BLM FIX */}
        <div className="py-5">
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <>
                <Basetable data={filteredRows} columns={columns} />
                
                </>
            )}
            
        </div>
        
      </main>
    </div>
    
  );
}

export default Konsultasi
