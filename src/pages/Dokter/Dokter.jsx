import { useState,useEffect } from "react";
import axios from "axios";

// import Trash from "./icons/Trash";
import Modal from "../../components/ModalTemplate";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Card, Typography } from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { TiUser } from 'react-icons/ti'
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




function Dokter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDropdown = () => {setIsOpen(!isOpen);};
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type) => {
    setModalType(type);
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


  const TABLE_HEAD = [
    "Foto",
    "Nama Dokter",
    "Spesialis",
    "Kontak",
    "Detail",
    "Action",
  ];



    

  return (
    <div className="flex flex-row h-full">
      <main className="flex flex-col pl-8 gap-1 w-full pr-3">

          {/* kanan */}
          <div className='flex flex-row items-center justify-between pt-3'>
            <p className='text-3xl font-[Nunito Sans] font-bold text-[#004A76]'> Data Dokter</p>
            <div className="flex flex-row gap-4 relative">
                <div className=" flex items-center rounded-[19px] px-5 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
                  <IoIosSearch className="text-gray-400"/>
                  <input
                      type="text"
                      placeholder="Pencarian"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-gray-700 text-sm outline-none bg-transparent"
                  />
                </div>

                <div className="flex flex-row gap-4 relative">
                  <button 
                    onClick={toggleDropdown} 
                    className="items-center focus:outline-none cursor-pointer pt-3">
                    <TiUser className='w-[40px] h-[40px] text-[#292D32]'> </TiUser>
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
          
          {/* Garis biru */}
          <div className="w-[100%] h-1 bg-[#1177B3]"></div>
  


          
             
      </main>

    </div>
  );
}

export default Dokter;
