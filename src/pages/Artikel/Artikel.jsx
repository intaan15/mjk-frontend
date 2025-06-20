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
            title="Detail"
          >
            <HiOutlineExclamationCircle className="text-black cursor-pointer hover:text-[#004A76] text-lg text-center" />
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
          >
            <FaEdit className="w-5 h-5 text-gray-600 hover:text-[#004A76] text-lg cursor-pointer" />
          </button>

          <button onClick={() => handleDelete(row.original._id)} title="Hapus">
            <FaTrashAlt className="w-5 h-5 text-red-500 hover:text-red-700 text-lg cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];


  // MAINCONTENT  
  
return (
  <div className="flex flex-row h-screen">
    <main className="flex flex-col pl-4 md:pl-8 gap-1 w-full pr-2 md:pr-3 mb-20 sm:mb-24 md:mb-16 lg:mb-8">
      {/* Navbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-3 sm:gap-0">
        <div className="text-xl sm:text-2xl md:text-3xl font-[Nunito Sans] font-bold text-[#004A76]">
          Artikel
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto relative">
          <div className="flex items-center rounded-[19px] px-3 sm:px-5 justify-start py-1 border-[1.5px] border-gray-300 gap-2 w-full sm:w-auto min-w-[200px] sm:min-w-[250px]">
            <IoIosSearch className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Pencarian"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-gray-700 text-sm outline-none bg-transparent w-full"
            />
          </div>
          <div className="flex flex-row gap-4 relative justify-end sm:justify-start self-end sm:self-auto">
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none cursor-pointer"
            >
              <TiUser className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 text-[#292D32]" />
            </button>

            <div>
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black/30 z-40"
                    onClick={() => setIsOpen(false)}
                  ></div>
                  <div className="absolute right-0 origin-top-right mt-8 w-48 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50">
                    <div className="py-1 justify-center">
                      <a
                        href=""
                        className="flex flex-row py-2 text-md font-[raleway] items-center font-bold text-[#004A76] gap-3"
                      >
                        <HiOutlineUser className="text-[24px] sm:text-[30px]" />
                        <span className="truncate">{user?.username}</span>
                      </a>

                      <a
                        href=""
                        onClick={handleLogout}
                        className="flex flex-row py-2 text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3"
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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 bg-slate-300 p-3 sm:p-2 rounded-xl items-start sm:items-center w-full lg:w-auto">
          <span className="font-bold text-gray-700 font-[raleway] text-sm sm:text-base whitespace-nowrap">
            Kategori :
          </span>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => setSelectedKategori("Kesehatan")}
              className={`px-3 sm:px-4 py-2 sm:py-1 rounded-xl border-2 cursor-pointer font-[raleway] transition-all duration-200 hover:bg-[#004A76] hover:text-white text-sm sm:text-base w-full sm:w-auto ${
                selectedKategori === "Kesehatan"
                  ? "bg-[#0c4a6e] text-white border-transparent font-semibold"
                  : "text-[#0c4a6e] border-[#7aa6c2] bg-white"
              }`}
            >
              Artikel Kesehatan
            </button>

            <button
              onClick={() => setSelectedKategori("Obat")}
              className={`px-3 sm:px-4 py-2 sm:py-1 rounded-xl font-[raleway] cursor-pointer border-2 transition-all duration-200 hover:bg-[#004A76] hover:text-white text-sm sm:text-base w-full sm:w-auto ${
                selectedKategori === "Obat"
                  ? "bg-[#0c4a6e] text-white border-transparent font-semibold"
                  : "text-[#0c4a6e] border-[#7aa6c2] bg-white"
              }`}
            >
              Artikel Obat
            </button>
          </div>
        </div>

        {/* Add Button */}
        <div className="w-full lg:w-auto">
          <button
            className="bg-[#004A76] rounded-xl shadow-xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3 cursor-pointer text-xs sm:text-sm font-semibold text-white font-[raleway] hover:opacity-75 w-full lg:w-auto whitespace-nowrap"
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
