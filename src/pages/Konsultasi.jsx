import React from 'react'

import Sidebar from '../components/Sidebar/Sidebar'

import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";


const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];


function Konsultasi() {
  return (
    <div className='container'>
      <div>
        <Sidebar/>
      </div>

      {/* Atas(search & profile) */}
      <div className='pl-20 text-2xl  gap-12 flex items-center justify-end pr-[72px]'>
        <div className=" flex items-center rounded-[19px] px-14 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
          <IoIosSearch className="text-gray-400" />
          <p className='text-gray-400 text-[14px]'>Cari nama dokter</p>
        </div>
        <div>
          <FaUser className="text-[30px] item-center" />
        </div>
      </div>
      <div className='pl-20 w-[100%] h-1 bg-[#1177B3] mt-1 mb-1'></div>

      {/* Button Tengah */}
      <div className='pl-20  flex items-center justify-center gap-[112px]'>
        <button className='bg-[#025F96] hover:bg-[#004A76] text-white flex w-[205px] h-[35px] items-center justify-center text-center rounded-[20px] text-[15px]'>
          Akan Datang
        </button>
        <button className='bg-[#B3B3B3] hover:bg-[#979797] text-white flex w-[205px] h-[35px] items-center justify-center text-center rounded-[20px] text-[15px]'>
          Selesai
        </button>
      </div>

      {/* HEADER TABEL Filtering Tabel BLM FIX */}
      <div className='pl-20 mt-5 flex items-center justify-center text-center '>
        <div className='flex justify-center border-[1px] border-gray-100 rounded-l-[10px] h-[50px] w-[180px] text-center items-center bg-[#D5D5D5]'>Tanggal</div>
        <div className='flex justify-center border-[1px] border-gray-100 h-[50px] w-[180px] text-center items-center bg-[#D5D5D5]'>Kategori</div>
        <div className='flex justify-center border-[1px] border-gray-100 h-[50px] w-[180px] text-center items-center bg-[#D5D5D5]'>Nama Dokter</div>
        <div className='flex justify-center border-[1px] border-gray-100 h-[50px] w-[180px] text-center items-center bg-[#D5D5D5]'>Jumlah Konsultasi</div>
        <div className='flex justify-center border-[1px] border-gray-100 rounded-r-[10px] h-[50px] w-[180px] text-center items-center bg-[#D5D5D5]'>Status</div>
      </div>
      
      {/* Isi Tabel */}
      <div className='ml-20 mt-5 flex items-center justify-center text-center'>
        <div className="border-2 border-gray-300 rounded-xl h-auto w-[900px] ">
          <table className="w-full min-w-max table-auto text-center">
            <tbody>
              {TABLE_ROWS.map(({ name, job, date }, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-gray-200">{date}</td>
                  <td className="p-4 border-b border-gray-200">{job}</td>
                  <td className="p-4 border-b border-gray-200">{name}</td>
                  <td className="p-4 border-b border-gray-200">5</td>
                  <td className="p-4 border-b border-gray-200">Selesai</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}

export default Konsultasi
