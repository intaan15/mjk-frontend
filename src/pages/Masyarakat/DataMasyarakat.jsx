import React from 'react'
import axios from 'axios' //library untuk melakukan request HTTP
import { useState, useEffect, } from 'react' //hook untuk state dan efek samping
import { useNavigate } from 'react-router-dom';
import { Typography } from "@material-tailwind/react";


import { TiUser } from 'react-icons/ti'
import { FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { BsExclamationCircle } from "react-icons/bs";
import Basetable from "../../components/Table/Basetable";
import renderModalContent  from "../../components/Modal/ModalContent";
import Modal from "../../components/Modal/Modal";



function DataMasyarakat() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [modalType, setModalType] = useState("detailprofilmasyarakat");
    const [isModalVisible, setModalVisible] = useState(true);
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);''
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const openModal = (type) => {
      // OPEN MODAL SESUAI TYPE
      setModalType(type);
      setEditData(item);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setModalType("");
    };
  
     const handleLogout = () => {
    // Hapus token dari localStorage
      localStorage.removeItem("token");

      // Redirect ke halaman login
      navigate("/login");
    };

    const handleEdit = (data) => {
      setSelectedData(data);
      setIsModalOpen(true);
      navigate(`/detail/${data._id}`);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // ENDPOINT GET DATA MASYARAKAT
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
      }, 
    []);

    // paramater tabel
    const columns = [
    {
      header: "No",
      enableSorting: false,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "foto_profil_dokter",
      header: "Foto",
      enableSorting: false,
      cell: ({ getValue }) => {
        const imageUrl = getValue();
        return (
          <img 
            src="foto"
            alt="Foto Dokter" 
            className="w-10 h-10 object-cover rounded-full" 
          />
        );} 
    },
    {
      accessorKey: "nama_masyarakat",
      header: "Nama Pengguna",
      enableSorting: false,
    },
    {
      accessorKey: "email_masyarakat",
      header: "Email",
      enableSorting: false,
    },
    {
      accessorKey: "notlp_masyarakat",
      header: "Kontak",
      enableSorting: false,
    },
    {
      accessorKey: "nik_masyarakat",
      header: "NIK Pengguna",
      enableSorting: false,
    },
    {
      accessorKey: "detail",
      header: "Detail",
      enableSorting: false,
      cell: ({ row }) => (
      <div className="flex gap-2 items-center bg-[#FAFBFD] p-2 rounded-xl border-1 border-[#979797]">
        <button onClick={() => handleEdit(row.original)} title="Edit">
          <FaEdit className="text-gray-600 hover:text-[#004A76] text-lg" />
        </button>
      </div>),
    },]
 
      
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
    <div className='flex flex-row '>
      <main className='flex flex-col pl-8 gap-1 w-full pr-3 '>

        {/* <footer> */}
          <div className='flex flex-row items-center justify-between  pt-2'>
            <p className='text-3xl font-[Nunito Sans] font-bold text-[#004A76]'>Data Masyarakat</p>
            <div className="flex flex-row gap-4">
              <div className="flex items-center rounded-[19px] px-5 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
                  <IoIosSearch className="text-gray-400"/>
                  <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-gray-700 text-sm outline-none bg-transparent"
                  />
              </div>
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
                              Administrator
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
          <div className="py-2">
              {loading ? (
                <p>Loading data...</p>
              ) : (
                <>
                  <Basetable data={data} columns={columns} />
                   {isModalOpen && (
                      <Modal open={isModalOpen} onClose={closeModal}>
                      {renderModalContent(modalType, closeModal, selectedData)}
                    </Modal>
                  )}
                </>
                
              )}
          </div>
          

        

      </main>
    </div>
  )
}

export default DataMasyarakat