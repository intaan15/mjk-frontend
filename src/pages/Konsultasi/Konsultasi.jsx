import React from 'react'

import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { TiUser } from "react-icons/ti";


// import Trash from "./icons/Trash";
import Modal from "../../components/ModalTemplate";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Card, Typography } from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import renderModalContent from "../../components/ModalContent";
import Swal from "sweetalert2";

const handleDelete = () => {
  Swal.fire({
    title: "Yakin mau hapus?",
    text: "Data yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      // Lanjutkan proses delete
      Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
    }
  });
};

const TABLE_HEAD = ["NIK","Nama Pasien", "Poli", "Nama Dokter", "Waktu ","Tanggal Konsultasi", "Status"];

const TABLE_ROWS = [
  {
    nik: "896789",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Selesai",
  },
  {
    nik: "809879",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Selesai",
  },
  {
    nik: "1234",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Selesai",
  },
  {
    nik: "87523",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Selesai",
  },
  {
    nik: "956783",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Akan Datang",
  },
  {
    nik: "6788765",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Akan Datang",
  },
  {
    nik: "4509256",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Berlangsung",
  },
  {
    nik: "8745692",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Berlangsung",
  },
  {
    nik: "76544",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Berlangsung",
  },
  {
    nik: "9456782",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Berlangsung",
  },
  {
    nik: "6544567",
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Berlangsung",
  },
  {
    name: "walidaun Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Berlangsung",
  },
  {
    name: "walidaun Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time :"09.45-20.30",
    date:"23/04/18",
    status: "Ditolak",
  },
 
];


function Konsultasi() {
  const [filterStatus, setFilterStatus] = useState("akan-datang");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const filteredRows = TABLE_ROWS.filter((row) => {
    const statusMatch =
    filterStatus === "Akan Datang"
      ? row.status === "Akan Datang" || row.status === "Berlangsung"
      : filterStatus === "Selesai"
      ? row.status === "Selesai" || row.status === "Ditolak"
      : true;

    const searchMatch = row.name.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
    
  });
  
  
  return (
    <div className="flex flex-row">
      <main className=' w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100 '>
        
        {/* Atas(search & profile) */}
        <div className='flex flex-row  justify-between  pt-2'>
          <p className='text-[25px] font-[raleway] font-bold text-[#004A76]'>Konsultasi</p>
          <div className="flex flex-row gap-4">
            <div className=" mt-3 flex items-center rounded-[19px] px-14 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
                <IoIosSearch className="text-gray-400"/>
                <input
                  type="text"
                  placeholder="Cari nama dokter"
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
                        <a href="#" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100 ">Profil Admin</a>
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
            onClick={() => setFilterStatus("Akan Datang")}
            className={`${
               filterStatus === "Akan Datang" ? "bg-[#004A76]": "bg-[#B3B3B3]" 
             } hover:opacity-80 text-white w-[205px] h-[35px] rounded-[20px] text-[15px] border-[#E3F0F8]`}>
             Akan Datang
          </button>

          <button
            onClick={() => setFilterStatus("Selesai")}
            className={`${
              filterStatus === "Selesai" ? "bg-[#004A76]" :"bg-[#B3B3B3]"
            } hover:opacity-80 text-white w-[205px] h-[35px] rounded-[20px] text-[15px] border-[#E3F0F8] border-2 focus-ring-2`}>
            Selesai
          </button>
        </div>

        
     
       


        {/* HEADER TABEL Filtering Tabel BLM FIX */}
        <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 overflow-x-hidden overflow-y-auto max-h-[400px]">
          <table className="w-full min-w-max table-auto text-left font-[Nunito] font-extrabold ">
            <thead className=" sticky top-0 z-10 ">
              <tr>
                {TABLE_HEAD.map((head) => ( 
                  <th
                    key={head}
                    className="p-4 border-b border-blue-gray-100 bg-slate-300"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

             <tbody>
              {filteredRows.map(({ nik,name, poli, doctor, date,time,status }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-2 border-b border-blue-gray-50";

                return (
                  <tr key={`${nik}-${index}`}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nik}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {poli}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {doctor}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {time}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal items-center"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                        <div className={`text-white text-sm font-semibold px-4 py-1 rounded-[20px] w-fit
                          ${status === "Akan Datang" ? "bg-[#007bff]" : 
                            status === "Berlangsung" ? "bg-[#facc15]" : 
                            status === "Ditolak" ? "bg-[#EF3826]" : 
                            status === "Selesai" ? "bg-[#10b981]" : "bg-gray-400"}
                        `}>
                          {status}
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
