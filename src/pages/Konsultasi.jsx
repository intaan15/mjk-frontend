import React from 'react'

import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
// import Trash from "./icons/Trash";
import Modal from "../components/ModalTemplate";
import Sidebar from "../components/Sidebar/Sidebar";
import { Card, Typography } from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import renderModalContent from "../components/ModalContent";
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

const TABLE_HEAD = ["Tanggal", "Kategori", "Nama Dokter", "Jumlah Konsultasi", "Status"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
    status: "Selesai",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
    status: "Selesai",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
    status: "Selesai",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    status: "Selesai",
  },
];


function Konsultasi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
  
    const openModal = (type) => {
      setModalType(type);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setModalType("");
    };
  return (
    <div className="container flex flex-row w-screen h-screen bg-white">
      <div className="w-1/6">
        <Sidebar />
      </div>

      {/* Atas(search & profile) */}
      <div className="w-5/6 h-screen flex flex-col p-4">
        <div className="text-2xl  gap-12 flex items-center justify-end ">
          <div className=" mt-3 flex items-center rounded-[19px] px-14 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
            <IoIosSearch className="text-gray-400 " />
            <p className="text-gray-400 text-[14px]">Cari nama dokter</p>
          </div>
          <div className="mt-3">
            <FaUser className="text-[30px] item-center" />
          </div>
        </div>
        <div className="w-[100%] h-1 bg-[#1177B3] mt-1 mb-1"></div>

        {/* Button Tengah */}
        <div className="flex items-center justify-center gap-[112px]">
          <button className="bg-[#025F96] hover:bg-[#004A76] text-white flex w-[205px] h-[35px] items-center justify-center text-center rounded-[20px] text-[15px]">
            Akan Datang
          </button>
          <button className="bg-[#B3B3B3] hover:bg-[#979797] text-white flex w-[205px] h-[35px] items-center justify-center text-center rounded-[20px] text-[15px]">
            Selesai
          </button>
        </div>

        {/* HEADER TABEL Filtering Tabel BLM FIX */}
        <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 overflow-x-hidden">
          {/* <Card className="h-full w-full overflow-scroll"> */}
          <table className="w-full min-w-max table-auto text-left">
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
              {TABLE_ROWS.map(({ name, job, date, status }, index) => {
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
                        {job}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {job}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
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
      </div>
    </div>
  );
}

export default Konsultasi
