import React from 'react'
import axios from 'axios' //library untuk melakukan request HTTP
import { useState,useEffect } from 'react'
import { Typography } from "@material-tailwind/react";


import { TiUser } from 'react-icons/ti'
import { FaUser } from 'react-icons/fa'
import { FaUserAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa6";

function Verifikasi() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("semua");
    const [allRows, setAllRows] = useState([]);
    const [data, setData] = useState([]);''
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
           setIsOpen(!isOpen);};

    const TABLE_HEAD = [
        "Foto",
        "Nama",
        "Email",
        "Kontak",
        "NIK",
        "Detail",
        "Status",
    ];
         
    useEffect(() => {
        axios.get(`https://mjk-backend-production.up.railway.app/api/masyarakat/getall`)
            .then((res) => {
                const filteredData = res.data.filter(item => item.verifikasi_akun_masyarakat === 'Pending');
                setAllRows(filteredData);
                console.log(filteredData);
                setData(filteredData);
            })
            .catch((err) => {
            console.error('Error fetching data:', err);
            });
        }, []);
    
    const filteredRows = allRows.filter((item) => {
        const search = searchTerm.toLowerCase();
        
        const matchSearch =
            item.nama_masyarakat?.toLowerCase().includes(search) ||
            item.email_masyarakat?.toLowerCase().includes(search) ||
            item.notlp_masyarakat?.toLowerCase().includes(search) ||
            item.nik_masyarakat?.includes(search);
        
        const matchStatus =
            filterStatus === "semua" || item.status_verifikasi === filterStatus;
        
        return matchSearch && matchStatus;
        });

    useEffect(() => {
    console.log(filteredRows); // Ini untuk memeriksa apakah filteredRows berisi data
    }, [filteredRows]);

    const getStatusBadge = (status) => {
        if (status === "Diterima") return <span className="bg-green-200 px-2 py-1 rounded-xl">Diterima</span>;
        if (status === "Ditolak") return <span className="bg-red-200 px-2 py-1 rounded-xl">Ditolak</span>;
        return <span className="bg-yellow-200 px-2 py-1 rounded-xl">Menunggu</span>;
    };
 
    return (
       <div className='flex flex-row'>
           <main className=' w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100 '>
               <div className='flex flex-row items-center justify-between  pt-2'>
                   <p className='text-[25px] font-[raleway] font-bold text-[#004A76]'>Verifikasi Data Masyarakat</p>
                   <div className="flex flex-row gap-4">
                    <div className=" mt-3 flex items-center rounded-[19px] px-2 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
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
                                <a href="#" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100 ">Profil Admin</a>
                                <a href="/" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100"> Log Out</a>
                                </div>
                            </div>)}
                        </div>
                    </button> 
                </div> 
               </div>
               <img src="/line style.svg" alt="" />
   
   
               <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
                   <div className="flex flex-row gap-8 bg-[#035C90] p-2 rounded-2xl items-center px-6 h-[80px]">
                       <div className="bg-white p-3 rounded-full flex items-center justify-center">
                           <FaUserAlt className="text-[30px] item-center text-[#979797]" />
                       </div>
                       <div className="flex flex-col">
                           <div className="font-[raleway] text-white font-bold text-[15px]">Total Verifikasi</div>
                           <div className="font-[Nunito] text-white font-medium text-[12px]">{data.length}</div>
                       </div>
                   </div>
                   <div className="flex flex-row gap-8 bg-[#438222] p-2 rounded-2xl items-center px-6 h-[80px]">
                       <div className="bg-[#FFF5D9] p-3 rounded-full flex items-center justify-center">
                           <FaUserCheck className="text-[30px] item-center text-[#FFBB38]" />
                       </div>
                       <div className="flex flex-col">
                           <div className="font-[raleway] text-white font-bold text-[15px]">Diterima</div>
                           <div className="font-[Nunito] text-white font-medium text-[12px]">20 orang</div>
                       </div>
                   </div>
                   <div className="flex flex-row gap-8 bg-[#EF3826] p-2 rounded-2xl items-center px-6 h-[80px]">
                       <div className="bg-[#FFE0EB] p-3 rounded-full flex items-center justify-center">
                           <FaUserMinus className="text-[30px] item-center text-" />
                       </div>
                       <div className="flex flex-col">
                           <div className="font-[raleway] text-white font-bold text-[15px]">Total Data</div>
                           <div className="font-[Nunito] text-white font-medium text-[12px]">20 orang</div>
                       </div>
                   </div>
               </div>
                <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
                    <div className="flex flex-row gap-8 bg-slate-300 p-2 rounded-4xl items-center px-6">
                        <div className="">Kategori :</div>
                        <div
                            onClick={() => setFilterStatus("semua")}
                            className={`cursor-pointer rounded-4xl border-2 px-4 py-1 ${
                            filterStatus === "semua" ? "bg-black text-white" : "bg-slate-300 border-black"
                            }`}>
                            Semua
                        </div>

                        <div
                            onClick={() => setFilterStatus("diterima")}
                            className={`cursor-pointer rounded-4xl border-2 px-4 py-1 ${
                            filterStatus === "diterima" ? "bg-green-600 text-white" : "bg-slate-300 border-black"
                            }`}>
                            Diterima
                        </div>

                        <div
                            onClick={() => setFilterStatus("ditolak")}
                            className={`cursor-pointer rounded-4xl border-2 px-4 py-1 ${
                                filterStatus === "ditolak" ? "bg-red-600 text-white" : "bg-slate-300 border-black"
                            }`}>
                            Ditolak
                        </div> 
                    </div>
                    
                </div>
   
               {/* main  */}
               <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 overflow-x-hidden  overflow-y-auto max-h-[400px]">
                   {/* <Card className="h-full w-full overflow-scroll"> */}
                 <table className="w-full min-w-max table-auto text-left font-[Nunito]">
                   <thead className="sticky top-0 z-10">
                       <tr>
                       {TABLE_HEAD.map((head) => (
                           <th
                           key={head}
                           className="p-4 border-b border-blue-gray-100 bg-[#C3E9FF] text-center"
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
                       { filteredRows.map(({ foto_profil_masyarakat,nama_masyarakat,email_masyarakat,detail, notlp_masyarakat,nik_masyarakat}, index) => {
                        console.log({ foto_profil_masyarakat, nama_masyarakat, email_masyarakat,detail, notlp_masyarakat, nik_masyarakat }); 
                        const isLast = index === filteredRows.length - 1;
                        const classes = isLast
                            ? "p-4"
                            : "p-2 border-b border-blue-gray-50";
       
                       return (
                           <tr key={`${nik_masyarakat}-${index}`}>
                            <td className={classes}>
                                {foto_profil_masyarakat ? (
                                <img src={foto_profil_masyarakat} alt="Foto Profil" className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-300" /> // kalau foto kosong
                                )}
                            </td>
                            <td className={classes}>
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-center"
                                >
                                {nama_masyarakat}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-center"
                                >
                                {email_masyarakat}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-center"
                                >
                                {notlp_masyarakat}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-center"
                                >
                                {nik_masyarakat}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <div className="flex gap-2">
                                    <button
                                    onClick={() => openModal("detailprofildokter", { foto_profil_masyarakat, nama_masyarakat, email_masyarakat, notlp_masyarakat, nik_masyarakat })}
                                    className="items-center gap-2 px-3 py-1 text-black rounded-lg hover:bg-gray-200 bg-[#B2E2FF]" >
                                    <FaEdit />
                                    </button> 
                                </div>
                            </td>
                            <td className={classes}>
                                    <div className="flex gap-2">
                                        <button
                                        onClick={() => handleVerifikasi("diterima", nik)}
                                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                        >
                                        Diterima
                                        </button>
                                        <button
                                        onClick={() => handleVerifikasi("ditolak", nik)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                        Ditolak
                                        </button>
                                    </div>
                            </td>
                           
                           {/* <td className={classes}>
                               <div className="flex gap-2">
                               <Typography
                                   as="button"
                                   onClick={() => openModal("detailprofildokter")}
                                   variant="small"
                                   color="blue-gray"
                                   className="font-medium"
                               >
                                   Detail
                               </Typography>
                               <Typography
                                   as="button"
                                   onClick={handleDelete}
                                   variant="small"
                                   color="blue-gray"
                                   className="font-medium"
                               >
                                   Hapus
                               </Typography>
                               <Typography
                                   as="button"
                                   onClick={() => openModal("editform")}
                                   variant="small"
                                   color="blue-gray"
                                   className="font-medium"
                               >
                                   Edit
                               </Typography>
                               </div>
                           </td> */}
                       </tr>
                       );
                       })}
                   </tbody>
                   </table>
               </div>
   
                   
           </main>
       </div>
     )
  
}

export default Verifikasi