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

const TABLE_HEAD = ["Nama Pasien", "Poli", "Nama Dokter", "Waktu/Tanggal Konsultasi", "Status"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time:"09.45-2030 | 23/04/18",
    status: "Selesai",
  },
  {
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time:"09.45-2030 | 23/04/18",
    status: "Selesai",
  },
  {
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time:"09.45-2030 | 23/04/18",
    status: "Selesai",
  },
  {
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time:"09.45-2030 | 23/04/18",
    status: "Selesai",
  },
  {
    name: "John Michael",
    poli: "Jantung",
    doctor: "Dr.wiratno.Sp.JP",
    time:"09.45-2030 | 23/04/18",
    status: "Selesai",
  },
 
];


function Konsultasi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("akan-datang");
  const [modalType, setModalType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const filterData = (status) => {
    return TABLE_ROWS.filter((row) => row.status.toLowerCase() === status);
  };
  
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };
  return (
    <div className="flex flex-row">
      <main className=' w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100 '>
        
        {/* Atas(search & profile) */}
        <div className='flex flex-row  justify-between  pt-2'>
          <p className='text-[25px] font-[raleway] font-bold text-[#004A76]'>Konsultasi</p>
          <div className="flex flex-row">
            <div className=" mt-3 flex items-center rounded-[19px] px-14 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
                <IoIosSearch className="text-gray-400" />
                <p className="text-gray-400 text-[14px]">Cari nama dokter</p>
            </div>
            <button onClick={toggleDropdown} className="flex items-centerfocus:outline-none cursor-pointer">
                <TiUser className='w-[30px] h-[30px] text-[#292D32]'> </TiUser>
                <div>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-blue ring-opacity-3 z-50 ">
                      <div className="py-1">
                        <a href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 ">Profil Admin</a>
                        <a href="/" className="block py-2 text-sm text-gray-700 hover:bg-gray-100"> Log Out</a>
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
            onClick={() => setFilterStatus("sedang-diproses")}
            className={`${
               filterStatus === "sedang-diproses" ? "bg-[#004A76]" : "bg-[#B3B3B3]"
             } hover:opacity-80 text-white w-[205px] h-[35px] rounded-[20px] text-[15px]`}>
             Akan Datan
          </button>

          <button
            onClick={() => setFilterStatus("sedang-diproses")}
            className={`${
              filterStatus === "sedang-diproses" ? "bg-[#004A76]" : "bg-[#B3B3B3]"
            } hover:opacity-80 text-white w-[205px] h-[35px] rounded-[20px] text-[15px]`}>
            Sedang Diproses
          </button>
        </div>

        
     
       


        {/* HEADER TABEL Filtering Tabel BLM FIX */}
        <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 overflow-x-hidden">
          <table className="w-full min-w-max table-auto text-left font-[Nunito] font-bold">
            <thead className="bg-slate-300 sticky top-0 z-10">
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
              {TABLE_ROWS.map(({ name, poli, doctor, time,status }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-2 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
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
                        className="font-normal bg-red-200 rounded-[20px] p-1"
                      >
                        {status}
                      </Typography>
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
