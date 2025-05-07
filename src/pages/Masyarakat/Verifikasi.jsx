import React from 'react'
import axios from 'axios' //library untuk melakukan request HTTP
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from "@material-tailwind/react";
import renderModalContent  from "../../components/ModalContent";
import Modal from "../../components/ModalTemplate";


import { TiUser } from 'react-icons/ti'
import { FaUserAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa6";

function Verifikasi() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("semua");
    const [modalType, setModalType] = useState("detailprofilmasyarakat");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allRows, setAllRows] = useState([]);
    const [data, setData] = useState([]);''
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); 
    const toggleDropdown = () => {setIsOpen(!isOpen);};
    const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
      };
    const closeModal = () => {
        setIsModalOpen(false);
        setModalType("");
    };

    const TABLE_HEAD = [
        "Foto",
        "Nama Pasien",
        "Email",
        "Kontak",
        "NIK",
        "Detail",
        "Status Konfirmasi",
    ];
       
   
    
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

    useEffect(() => {console.log(filteredRows); // Ini untuk memeriksa apakah filteredRows berisi data
    }, [filteredRows]);


    // ENDPOINT UPDATE STATUS VERIFIKASI
    const handleVerifikasi = (status, _id) => {
        axios.patch(`https://mjk-backend-production.up.railway.app/api/masyarakat/update/${_id}`, {
            verifikasi_akun_masyarakat: status,
          })
          .then(() => {
            console.log("Status verifikasi berhasil diperbarui (PATCH)");
            console.log("NIK yang dikirim:", _id);

            setAllRows((prevRows) =>
              prevRows.map((item) =>
                item._id === _id ? { ...item, verifikasi_akun_masyarakat: status } : item)
            );
            setData((prevData) => prevData.filter((item) => item._id !== _id));
            if (status === "diterima") {
                navigate("/masyarakat/data");}

            setData((prevData) => prevData.filter((item) => item._id !== _id));
            if (status === "diterima") {
                navigate("/masyarakat/data");}
          })
          .catch((err) => {
            console.error("Gagal update status", err);
          });
    };

    // ENDPOINT MENDAPATKAN DATA
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
                                <a href="#" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100 ">Administrator</a>
                                <a href="/" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100"> Log Out</a>
                                </div>
                            </div>)}
                        </div>
                    </button> 
                </div> 
               </div>
               <img src="/line style.svg" alt="" />
   
   
               <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
                   <div className="flex flex-row gap-8 bg-[#007BBA] p-2 rounded-2xl items-center px-6 h-[80px]">
                       <div className="bg-white p-3 rounded-full flex items-center justify-center">
                           <FaUserAlt className="text-[30px] item-center text-[#979797]" />
                       </div>
                       <div className="flex flex-col">
                           <div className="font-[raleway] text-white font-bold text-[15px]">Total Verifikasi</div>
                           <div className="font-[Nunito] text-white font-medium text-[12px]">{data.length}</div>
                       </div>
                   </div>
                   <div className="flex flex-row gap-8 bg-[#4CAF50] p-2 rounded-2xl items-center px-6 h-[80px]">
                       <div className="bg-[#FFF5D9] p-3 rounded-full flex items-center justify-center">
                           <FaUserCheck className="text-[30px] item-center text-[#FFBB38]" />
                       </div>
                       <div className="flex flex-col">
                           <div className="font-[raleway] text-white font-bold text-[15px]">Diterima</div>
                           <div className="font-[Nunito] text-white font-medium text-[12px]">20 orang</div>
                       </div>
                   </div>
                   <div className="flex flex-row gap-8 bg-[#E57373] p-2 rounded-2xl items-center px-6 h-[80px]">
                       <div className="bg-[#FFE0EB] p-3 rounded-full flex items-center justify-center">
                           <FaUserMinus className="text-[30px] item-center text-" />
                       </div>
                       <div className="flex flex-col">
                           <div className="font-[raleway] text-white font-bold text-[15px]">Ditolak</div>
                           <div className="font-[Nunito] text-white font-medium text-[12px]">20 orang</div>
                       </div>
                   </div>
               </div>
                <div className="flex flex-row gap-2  w-full  items-center px-4 py-1">
                    <div className="font-bold text-[#033E61]">Kategori :</div>
                    <div className="flex flex-row gap-8 bg-[#D9D9D9]/50 p-2 rounded-3xl items-center px-6">
                        <div
                            onClick={() => setFilterStatus("semua")}
                            className={`cursor-pointer rounded-4xl border-2 px-4 py-1 border-[#033E61] ${
                            filterStatus === "semua" ? "bg-[#025F96] text-white border-[#033E61]" : "bg-[#D9D9D9]/50 "
                            }`}>
                            Semua
                        </div>

                        <div
                            onClick={() => setFilterStatus("diterima")}
                            className={`cursor-pointer rounded-4xl border-2 px-4 py-1 border-[#033E61]  ${
                            filterStatus === "diterima" ? "bg-[#025F96] text-white border-[#033E61]" : "bg-[#D9D9D9]/50"
                            }`}>
                            Diterima
                        </div>

                        <div
                            onClick={() => setFilterStatus("ditolak")}
                            className={`cursor-pointer rounded-4xl border-2 px-4 py-1 border-[#033E61]  ${
                                filterStatus === "ditolak" ? "bg-[#025F96] text-white border-[#033E61]" : "bg-[#D9D9D9]/50"
                            }`}>
                            Ditolak
                        </div> 
                    </div>
                    
                </div>
   
               {/* main  */}
               <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 overflow-x-h_idden  overflow-y-auto max-h-[280px]">
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
                       { filteredRows.map(({ _id,foto_profil_masyarakat,nama_masyarakat,email_masyarakat,detail, notlp_masyarakat,nik_masyarakat,verifikasi_akun_masyarakat}, index) => {
                        console.log({ foto_profil_masyarakat, nama_masyarakat, email_masyarakat,detail, notlp_masyarakat, nik_masyarakat,verifikasi_akun_masyarakat }); 
                        console.log("Row data:", filteredRows);
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
                                    onClick={() => openModal("detailprofilmasyarakat", { id: item._id })}
                                    className="items-center gap-2 px-3 py-1 text-black rounded-lg hover:bg-gray-200 " >
                                    <FaEdit />
                                    </button> 
                                </div>
                            </td>
                            <td key={_id} className={classes}>
                                <div className="flex gap-2">
                                    <button
                                    onClick={() => handleVerifikasi("diterima",_id)}
                                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                    Diterima
                                    </button>
                                    <button
                                    onClick={() => handleVerifikasi("ditolak",_id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                    Ditolak
                                    </button>
                                </div>
                            </td>
                       </tr>
                       );
                       })}
                   </tbody>
                   </table>
                   <Modal open={isModalOpen} onClose={closeModal}>
                        {renderModalContent(modalType, closeModal)}
                    </Modal>
               </div>
   
                   
           </main>
       </div>
     )
  
}

export default Verifikasi