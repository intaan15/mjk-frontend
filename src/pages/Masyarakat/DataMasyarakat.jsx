import React from 'react'
import axios from 'axios' //library untuk melakukan request HTTP
import { useState, useEffect } from 'react' //hook untuk state dan efek samping
import { Typography } from "@material-tailwind/react";


import { TiUser } from 'react-icons/ti'
import { FaUser } from 'react-icons/fa'
import { FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import renderModalContent  from "../../components/ModalContent";
import Modal from "../../components/ModalTemplate";



function DataMasyarakat() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState("detailprofilmasyarakat");
    const [isModalVisible, setModalVisible] = useState(true);
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);''
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (type) => {
      setModalType(type);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setModalType("");
    };
  



    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      useEffect(() => {
        axios.get(`https://mjk-backend-production.up.railway.app/api/masyarakat/getall`)
            .then((res) => {
              const filteredData = res.data.filter(item => item.verifikasi_akun_masyarakat === 'diterima');
              console.log(res.data);
              setData(filteredData);
            })
            .catch((err) => {
            console.error('Error fetching data:', err);
            });
        }, []);

      const TABLE_HEAD = [
        "Foto",
        "Nama Lengkap",
        "Email",
        "Kontak",
        "NIK",
        "Detail",
      ];
      
      const filteredRows = data.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
          item.nama_masyarakat?.toLowerCase().includes(search) ||
          item.email_masyarakat?.toLowerCase().includes(search) ||
          item.notlp_masyarakat?.toLowerCase().includes(search) ||
          item.nik_masyarakat?.includes(search) 
        );
      });

      useEffect(() => {
        console.log(filteredRows); // Ini untuk memeriksa apakah filteredRows berisi data
      }, [filteredRows]);
        
      
    

  return (
    <div className='flex flex-row'>
      <main className=' w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100 '>

        {/* <footer> */}
          <div className='flex flex-row grid-2 items-center justify-between  pt-2'>
            <p className='text-[25px] font-[raleway] font-bold text-[#004A76]'>Data Masyarakat</p>
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

          {/* jumlahPengguna */}
          <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
              <div className="flex flex-row gap-8 bg-[#033E61] h-[80px] p-2 rounded-xl items-center px-6">
                  <div className="bg-white p-3 rounded-full flex items-center justify-center">
                      <FaUserAlt className="text-[30px] item-center text-[#979797] " />
                  </div>
                  <div className="flex flex-col">
                      <div className="font-[raleway] text-white font-bold text-[15px]">Jumlah Pengguna</div>
                      <div className="font-[Nunito] text-white font-medium text-[15px]">{data.length}</div>
                  </div>
              </div>
          </div>


            {/* main tabel  */}
          <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 overflow-x-hidden">
              <table className="w-full min-w-max table-auto text-left font-[Nunito] font-extrabold ">
                  <thead className=" sticky top-0 z-10 ">
                    <tr>
                      {TABLE_HEAD.map((item, index) => ( 
                        <th
                          key={index}
                          className="p-4 border-b border-blue-gray-100 font-extrabold bg-[#C3E9FF]">
                          <Typography
                              variant="small"
                              color="blue-gray"
                              className="leading-none opacity-70 font-bold text-center ">
                            {item}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
              
                  <tbody>
                    {
                      filteredRows.map(({ foto_profil_masyarakat,nama_masyarakat,email_masyarakat, notlp_masyarakat,nik_masyarakat}, index) => {
                      console.log({ foto_profil_masyarakat, nama_masyarakat, email_masyarakat, notlp_masyarakat, nik_masyarakat }); 
                      const isLast = index === filteredRows.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-2 border-b border-blue-gray-50";
      
                      return (
                        <tr key={`${nik_masyarakat}-${index}`}>
                         <td className={classes}>
                            {foto_profil_masyarakat ? (
                              <img src={foto_profil_masyarakat} alt="Foto Profil" className="w-10 h-10 rounded-full object-cover text-center" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-300" /> // kalau foto kosong
                            )}
                          </td>
                          
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-center">
                            {nama_masyarakat}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-center">
                            {email_masyarakat}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-center">
                            {notlp_masyarakat}
                            </Typography>
                          </td> 
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-center">
                            {nik_masyarakat}
                            </Typography>
                          </td>     
                          <td className={classes}>
                              <div className="flex gap-2 ">
                                  <button
                                    onClick={() => openModal("detailprofilmasyarakat", { foto_profil_masyarakat, nama_masyarakat, email_masyarakat, notlp_masyarakat, nik_masyarakat })}
                                    className="items-center gap-2 px-3 py-1 text-black rounded-lg hover:bg-gray-200 bg-[#B2E2FF] text-center" >
                                    <FaEdit />
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

export default DataMasyarakat