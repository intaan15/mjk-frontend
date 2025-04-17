import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";


const TABLE_HEAD = ["Nama", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  {
    name: "John Michael",
    monday: "07.00-12.00",
    tuesday: "07.00-12.00",
    wednesday: "07.00-12.00",
    thursday: "07.00-12.00",
    friday: "07.00-12.00",
    saturday: "07.00-12.00",
    sunday: "07.00-12.00",
  },
  
];


function Jadwal() {
    return (
        <div className='container flex flex-row w-screen h-screen bg-white'>
          <div className='w-1/6'>
            <Sidebar/>
          </div>

          <div className="w-5/6 h-screen flex flex-col p-4">
            {/* Atas */}   
            <div className="text-2xl gap-12 flex items-center justify-end ">
                <div className=" mt-3 flex items-center rounded-[19px] px-14 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
                <IoIosSearch className="text-gray-400 " />
                <p className="text-gray-400 text-[14px]">Cari nama dokter</p>
                </div>
                <div className="mt-3">
                <FaUser className="text-[30px] item-center" />
                </div>
            </div>

            {/* Garis biru */}
            <div className="w-[100%] h-1 bg-[#1177B3] mt-4 mb-4"></div>

            {/* tabel */}
            <div className="border-2 border-gray-300 rounded-xl h-auto w-[95%] ml-auto flex overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="bg-slate-300 sticky top-0 z-10">
                    <tr>
                    {TABLE_HEAD.map((head) => (
                        <th key={head} className="p-4 border-b border-blue-gray-100 bg-slate-300">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            {head}
                        </Typography>
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ name, monday, tuesday, wednesday, thursday, friday, saturday, sunday }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                        <tr key={index}>
                        <td className={classes}><Typography variant="small" color="blue-gray" className="font-normal">{name}</Typography></td>
                        <td className={classes}><Typography variant="small" className="font-normal text-[#035E94]">{monday}</Typography></td>
                        <td className={classes}><Typography variant="small" className="font-normal text-[#035E94]">{tuesday}</Typography></td>
                        <td className={classes}><Typography variant="small" className="font-normal text-[#035E94]">{wednesday}</Typography></td>
                        <td className={classes}><Typography variant="small" className="font-normal text-[#035E94]">{thursday}</Typography></td>
                        <td className={classes}><Typography variant="small" className="font-normal text-[#035E94]">{friday}</Typography></td>
                        <td className={classes}><Typography variant="small" className="font-normal text-[#035E94]">{saturday}</Typography></td>
                        <td className={classes}><Typography variant="small" className="font-normal text-[#035E94]">{sunday}</Typography></td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              </div>
            </div>


        </div>


    )
}

export default Jadwal