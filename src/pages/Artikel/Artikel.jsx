import axios from "axios";
import.meta.env.VITE_BASE_URL
import { useState} from "react";
import Modal from "../../components/Modal/ModalTemplate";
import ModalContent from "../../components/Modal/ModalContent";
import { useDataArtikel } from "../../components/_hooksPages/useDataArtikel";
import Basetable from "../../components/Table/Basetable";
import { useAuth } from "../../components/Auth";


import { FaTrashAlt } from "react-icons/fa";
import { TiUser } from 'react-icons/ti';
import { FaEdit } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi2";



export default function Artikel() {

  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const toggleDropdown = () => {setIsOpen(!isOpen);};
  
  const {
    // Data
    filteredArtikel,
    fetchArtikel,
    selectedId,
    dataArtikel,
    loading,
    error,
    
    // Filter states
    searchTerm,
    setSearchTerm,
    selectedKategori,
    setSelectedKategori,
    setSelectedId,
    
    // Actions
    deleteArtikel,
    setSelectedArtikelId,
    clearSelectedArtikel,
    refreshData,
    formatTanggal,
    handleDelete
  } = useDataArtikel(token);


  const openModalWithId = (id, type) => {
    // console.log("Membuka modal dengan ID:", id); // Debug
    if (!id) {
      alert("ID artikel tidak valid!");
      return;
    }
    setSelectedId(id);
    setModalType(type);
    setIsModalOpen(true);
  };

  const openModal = (type, id) => {
    setModalType(type);
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setModalType(null);
  };
  

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchArtikel(); 
  };
  // PARAMATER HEADER,ISI,EDIT CELL TABLE
  const columns = [
    {
      accessorKey: "gambar_artikel",
      header: "Gambar",
      enableSorting: false,
      cell: ({ getValue }) => {
        const imageUrl = getValue();
        // console.log("Image URL:", imageUrl);

        return imageUrl ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${imageUrl}`}
            alt="sampul artikel"
            className="w-20 h-10 object-cover rounded-md"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
        );
      },
    },
    {
      accessorKey: "nama_artikel",
      header: "Judul Artikel",
      enableSorting: false,
      cell: ({ getValue }) => (
        <div className="whitespace-normal break-words max-w-sm">
          {getValue()}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Tgl.Terbit",
      enableSorting: true,
      cell: (info) => formatTanggal(info.getValue()),
    },
    {
      accessorKey: "kategori_artikel",
      header: "Kategori",
      enableSorting: false,
    },
    {
      accessorKey: "detail",
      header: "Detail",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-2  items-center ">
          <button
            onClick={() => openModal("detailartikel", row.original._id)}
            title="Detail Artikel"
            className="p-1.5 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-110"
          >
            <HiOutlineExclamationCircle className="text-black hover:text-[#004A76] text-lg cursor-pointer transition-colors duration-200" />
          </button>
        </div>
      ),
    },
    {
      accessorKey: "Action",
      header: "Aksi",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="inline-flex overflow-hidden items-center bg-[#FAFBFD] p-2 gap-3 rounded-xl border-1 border-[#979797]">
          <button
            onClick={() => openModal("editdataartikel", row.original._id)}
            title="Edit"
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
          >
            <FaEdit className="text-gray-600 hover:text-[#004A76] text-lg cursor-pointer transition-colors duration-200" />
          </button>

          <button 
            onClick={() => handleDelete(row.original._id)} 
            title="Hapus"
            className="p-1.5 rounded-lg hover:bg-red-100 transition-all duration-200 hover:scale-110"
          >
          <FaTrashAlt className="text-red-500 hover:text-red-700 text-lg cursor-pointer transition-colors duration-200" />
          </button>
        </div>
      ),
    },
  ];


  // MAINCONTENT  
  
return (
  <div className="min-h-screen sm:mb-2 md:mb-4 lg:mb-5 lg:mt-0 bg-gray-50 transition-all duration-300 ease-in-out overflow-x-hidden">
    <main className="flex flex-col pt-4 px-4 xs:p-8 sm:p-10 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1 md:pt-5  mb-20 sm:mb-0 w-full max-w-full">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all duration-200 ">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
          Artikel
        </h1>

        <div className="flex sm:flex-row gap-2 w-full sm:w-auto sm:items-center transition-all duration-200  ">
          <div className="flex items-center rounded-xl px-3 py-2 border-[1.5px] border-gray-300 gap-3 w-full sm:w-full  min-w-0 h-10 sm:h-11">
            <IoIosSearch className="text-gray-400 text-lg flex-shrink-0  sm:text-xl" />
            <input
              type="text"
              placeholder="Pencarian"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-gray-700 text-sm outline-none bg-transparent flex-1 sm:w-48 md:w-56 min-w-0"
            />
          </div>

          <div className="flex flex-row gap-4 relative transition-all duration-200 ">
            <button
              onClick={toggleDropdown}
              className="flex items-center  justify-center focus:outline-none cursor-pointer w-10 h-10 sm:w-11 sm:h-11 md:w-11 md:h-11 lg:w-11 lg:h-11 rounded-full hover:bg-gray-100 transition-colors"
            >
              <TiUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#292D32]" />
            </button>

            <div>
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black/30 z-40 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  ></div>
                  <div className="absolute right-0 origin-top-right mt-8 w-48 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50 transition-all duration-200">
                    <div className="py-1 justify-center transition-all duration-200">
                      <a
                        href=""
                        className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-bold text-[#004A76] gap-3"
                      >
                        <HiOutlineUser className="text-[24px] sm:text-[30px]" />
                        <span className="truncate">{user?.username}</span>
                      </a>

                      <a
                        href=""
                        onClick={handleLogout}
                         className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3 cursor-pointer"
                      >
                        <IoLogOutOutline className="text-[24px] sm:text-[30px]" />
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

      <img src="line style.svg" alt="" className="w-full" />

      {/* Category Selection & Add Button */}
      <div className="flex flex-col lg:flex-row justify-between w-full items-start lg:items-center px-2 py-2 gap-3 lg:gap-0">
        {/* Category Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 bg-gradient-to-r from-slate-100 to-slate-200 backdrop-blur-sm p-4 sm:p-3 rounded-2xl shadow-lg border border-slate-200/50 items-start sm:items-center w-full lg:w-auto">
          <span className="font-bold text-gray-800 font-[raleway] text-sm sm:text-base whitespace-nowrap tracking-wide">
             Kategori :
          </span>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
            <button
              onClick={() => setSelectedKategori("Kesehatan")}
              className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl border-2 cursor-pointer font-[raleway] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-sm sm:text-base w-full sm:w-50 ${
                selectedKategori === "Kesehatan"
                ? "bg-gradient-to-r from-[#0c4a6e] to-[#004A76] text-white border-transparent font-semibold shadow-md"
                : "text-[#0c4a6e] border-[#7aa6c2] bg-white hover:bg-[#004A76] hover:text-white hover:border-[#004A76] shadow-sm"
              }`}
            >
              Artikel Kesehatan
            </button>

            <button
              onClick={() => setSelectedKategori("Obat")}
              className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl border-2 cursor-pointer font-[raleway] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-sm sm:text-base w-full sm:w-50 ${
                selectedKategori === "Obat"
                ? "bg-gradient-to-r from-[#0c4a6e] to-[#004A76] text-white border-transparent font-semibold shadow-md"
                : "text-[#0c4a6e] border-[#7aa6c2] bg-white hover:bg-[#004A76] hover:text-white hover:border-[#004A76] shadow-sm"
              }`}
            >
              Artikel Obat
            </button>
          </div>
        </div>

        {/* Add Button */}
        <div className="w-full lg:w-auto">
          <button
            className="group bg-gradient-to-r from-[#033E61] to-[#004A76] hover:from-white hover:to-white rounded-2xl font-raleway font-semibold p-3 sm:p-4 text-white hover:text-[#004A76] text-xs sm:text-sm shadow-lg hover:shadow-xl border-2 border-transparent hover:border-[#033E61] cursor-pointer flex items-center justify-center gap-3 w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            onClick={() => openModal("tambahartikel")}
          >
            + Tambah Data Artikel
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-2 flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-600">Loading data...</p>
          </div>
        ) : (
          <Basetable data={filteredArtikel} columns={columns} />
        )}
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <ModalContent
          modalType={modalType}
          idArtikel={selectedId}
          dataArtikel={dataArtikel}
          token={token}
          onClose={handleCloseModal}
        />
      </Modal>
    </main>
  </div>
);
}
