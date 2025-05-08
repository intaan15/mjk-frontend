import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";


// import Trash from "./icons/Trash";
import { IoIosSearch } from "react-icons/io";
import { TiUser } from "react-icons/ti";
import { Card, Typography } from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import renderModalContent from "../../components/ModalContent";
import Swal from "sweetalert2";






function Konsultasi() {


  const TABLE_HEAD = ["Nama Pasien", "Poli", "Nama Dokter", "Waktu ","Tanggal Konsultasi", "Status"];
  const TABLE_ROWS = [ ];


  // filterstatus {group}
  const [filterStatus, setFilterStatus] = useState("Diproses");
  const [allRows, setAllRows] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const filteredRows = data.filter((row) => {
    const statusMatch =
      filterStatus === "Diproses"
        ? row.status_konsul === "menunggu" || row.status_konsul === "berlangsung" || row.status_konsul === "diterima"
        : filterStatus === "Selesai"
        ? row.status_konsul === "selesai" || row.status_konsul === "ditolak"
        : true;
  
       
    return statusMatch && (row.status_konsul || "").toLowerCase().includes(searchTerm.toLowerCase());
  });


  // ENDPOINT GET DATA
  useEffect(() => {
    axios.get(`https://mjk-backend-production.up.railway.app/api/jadwal/getall`)
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
  
  
  return (
    <div className="flex flex-row">
      <main className=' w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100 '>
        
        {/* Atas(search & profile) */}
        <div className='flex flex-row  items-center justify-between  pt-2'>
          <p className='text-[25px] font-[Nunito Sans] font-bold text-[#004A76]'>Konsultasi</p>
          <div className="flex flex-row gap-4">
            <div className=" mt-3 flex items-center rounded-[19px]  px-2 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
                <IoIosSearch className="text-gray-400"/>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-gray-700 text-sm outline-none bg-transparent"
                />
            </div>
            <button onClick={toggleDropdown} className="items-center focus:outline-none cursor-pointer pt-3">
                <TiUser className='w-[40px] h-[40px] text-[#292D32]'> </TiUser>
                <div>
                  {isOpen && (
                    <div className="absolute right-3 w-44 origin-top-right mt-2 shadow-xl rounded-xl bg-white ring-1 ring-blue ring-opacity-3 z-50 ">
                      <div className="py-1">
                        <a href="#" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100 ">Administrator</a>
                        <a href="/" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100"> Log Out</a>
                      </div>
                    </div>)}
                </div>
              </button> 
          </div> 
        </div>
        <img src="/line style.svg" alt="" />


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
        <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 overflow-x-hidden overflow-y-auto max-h-[400px]">
          <table className="w-full min-w-max table-auto text-left font-extrabold " style={{ fontFamily: '"Nunito Sans"' }}>
            <thead className=" sticky top-0 z-10 " >
              <tr>
                {TABLE_HEAD.map((head) => ( 
                  <th
                    key={head}
                    className="p-3 border-b border-blue-gray-100  font-bold bg-[#C3E9FF]"
                    
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

             <tbody>
              {filteredRows.map(({_id,masyarakat_id,dokter_id, tgl_konsul,jam_konsul,status_konsul}, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-2 border-b border-blue-gray-50 items-center";

                return (
                  <tr key={`${_id}-${index}`}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal items-center"
                      >
                        {masyarakat_id?.nama_masyarakat || "-"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal items-center"
                      >
                        {dokter_id?.spesialis_dokter|| "-"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal items-center"
                      >
                        {dokter_id?.nama_dokter|| "-"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal items-center"
                      >
                        {jam_konsul}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal items-center justify-center p-2"
                      >
                        {tgl_konsul?.split("T")[0]}
                      </Typography>
                    </td>
                    <td className={classes}>
                        <div className={`text-sm font-medium px-4 py-1 rounded-[10px] w-[90px] items-center text-center
                          ${status_konsul === "menunggu" ? "bg-[#FFF3CD] text-[#856404]" : 
                            status_konsul === "berlangsung" ? "bg-[#3498DB]  text-[#FFFFFF]" : 
                            status_konsul === "diterima" ? "bg-[#BCE2C5]  text-[#155724]" : 
                            status_konsul === "ditolak" ? "bg-[#B31111] text-white" : 
                            status_konsul === "selesai" ? "bg-[#27AE60]" : "bg-gray-400"}
                        `}>
                          {status_konsul.charAt(0).toUpperCase() + status_konsul.slice(1)}
                        </div>
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> 
      </main>
    </div>
    
  );
}

export default Konsultasi
