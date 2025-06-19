import { useState,useEffect, useCallback } from "react";
import { useAuth } from "../../components/Auth";
import useDataDokter from "../../components/_hooks/useDataDokter";
import useLogout from "../../components/_hooks/useLogout";




// icon
import Modal from "../../components/Modal/ModalTemplate";
import Basetable from "../../components/Table/Basetable";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { TiUser } from 'react-icons/ti';
import { FaEdit } from "react-icons/fa"; 
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import ModalContent from "../../components/Modal/ModalContent";
import Swal from "sweetalert2";
import.meta.env.VITE_BASE_URL


function Dokter() {
  const token = localStorage.getItem("token");
  const {handleLogout:handleLogout}=useLogout()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("null");
  const { user } = useAuth();

  const {
    data,
    loading,
    selectedId,
    setSelectedId,
    setdataDokterbyId,
    dataDokterbyId,
    searchTerm,
    setSearchTerm,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    filteredDokter,
    totalItems,
    totalPages,
    paginatedData,
    fetchDokter,
    handleDelete,
    handleAfterAddDokter,
    formatTanggal,
    toggleDropdown,
    isOpen
  } = useDataDokter();

 const openModalWithId = (type,id) => {
    if (!id) {
    alert("ID dokter tidak valid!");
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
    setdataDokterbyId(id);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setModalType("");
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchDokter();
  };

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
        console.log("Image URL:", imageUrl);

        return imageUrl ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${imageUrl}`}
            alt="Foto Dokter"
            className="w-10 h-10 object-cover rounded-md"
          />
        ) : (
          <div className="w-10 h-10  ">
            <img
              src="/default-avatar.jpg"
              alt="foto_default"
              className="rounded-md"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "nama_dokter",
      header: "Nama",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="w-50 truncate">{row.original.nama_dokter}</div>
      ),
    },
    {
      accessorKey: "username_dokter",
      header: "Username",
      enableSorting: false,
    },
    {
      accessorKey: "spesialis_dokter",
      header: "Spesialisasi",
      enableSorting: false,
    },
    {
      accessorKey: "str_dokter",
      header: "Nomor STR",
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal Registrasi",
      enableSorting: true,
      cell: (info) => formatTanggal(info.getValue()),
    },
    {
      accessorKey: "detail",
      header: "Detail",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="grid grid-cols-3 gap-2 items-center bg-[#FAFBFD] p-2 rounded-xl border-1 border-[#979797]">
          <button
            onClick={() => openModal("detailprofildokter", row.original._id)}
            title="Detail"
            >
            <HiOutlineExclamationCircle className="text-black hover:text-[#004A76] text-lg cursor-pointer" />
          </button>

          <button
            onClick={() => openModal("editdatadokter", row.original._id)}
            title="Edit"
          >
            <FaEdit className="text-gray-600 hover:text-[#004A76] text-lg cursor-pointer" />
          </button>

          <button onClick={() => handleDelete(row.original._id)} title="Hapus">
            <FaTrashAlt className="text-red-500 hover:text-red-700 text-lg cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];


    

  return (
    <div className="flex flex-row min-h-screen">
      <main className="flex flex-col sm:p-4 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1 w-full mb-20 sm:mb-24 md:mb-16 lg:mb-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
            Data Dokter
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="flex items-center rounded-xl px-3 py-1 border-[1.5px] border-gray-300 gap-3 w-full sm:w-auto">
              <IoIosSearch className="text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Cari Nama"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-700 text-sm outline-none bg-transparent flex-1 sm:w-40"
              />
            </div>

            {/* Profile Dropdown */}
            <div className="flex flex-row gap-4 relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none cursor-pointer"
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
                        <a className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                          <HiOutlineUser className="text-xl sm:text-2xl md:text-[30px]" />
                          {user?.username}
                        </a>

                        <a
                          onClick={handleLogout}
                          className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3 cursor-pointer"
                        >
                          <IoLogOutOutline className="text-xl sm:text-2xl md:text-[30px]" />
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
        

        <img src="/line style.svg" alt="" className="w-full" />

        {/* Stats and Add Button Section - responsive seperti dashboard */}
        <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center px-2 sm:px-5 py-1 gap-4 sm:gap-0">
          <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 bg-[#E0F4FF] p-2 sm:p-3 rounded-xl items-center px-3 w-full sm:w-auto">
            <div className="bg-[#004A76] p-2 sm:p-3 rounded-full flex items-center justify-center">
              <FaUser className="text-lg sm:text-xl md:text-[30px] text-white" />
            </div>
            <div className="flex flex-col">
              <div className="font-[raleway] text-[#004A76] font-bold text-sm sm:text-[15px]">
                Jumlah Dokter
              </div>
              <div className="font-[Nunito] text-[#004A76] font-medium text-sm sm:text-[15px]">
                {data.length} Dokter
              </div>
            </div>
          </div>
          
          <button
            onClick={() => openModal("tambahdatadokter")}
            className="bg-[#033E61] rounded-xl font-[Raleway] p-3 sm:p-4 hover:bg-white hover:text-[#004A76] hover:border-2 hover:border-[#033E61] cursor-pointer text-white text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <IoIosAddCircleOutline className="text-base sm:text-lg" />
            <span className="whitespace-nowrap">Tambah Data Dokter</span>
          </button>
        </div>

        {/* main table */}
        <div className="py-2">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : (
            <Basetable data={paginatedData} columns={columns} />
          )}
        </div>

        {/* Pagination - improved responsive */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          {/* Jumlah ditampilkan */}
          <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems}{" "}
            hasil
          </div>

          {/* Navigasi dan Items per page */}
          <div className="flex items-center gap-2 sm:gap-4 order-1 sm:order-2">
            {/* Pagination Number */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 cursor-pointer text-sm ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed border-gray-300"
                    : "hover:bg-[#004A76] hover:text-white"
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              {/* Smart pagination - show max 5 pages */}
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-2 sm:px-3 py-1 cursor-pointer text-sm rounded transition-colors ${
                      currentPage === pageNum 
                        ? "bg-[#004A76] text-white" 
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 cursor-pointer text-sm ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed border-gray-300"
                    : "hover:bg-[#004A76] hover:text-white"
                }`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        <Modal open={isModalOpen} onClose={closeModal}>
          <ModalContent
            modalType={modalType}
            idDokter={selectedId}
            dataDokterbyId={dataDokterbyId}
            onClose={handleCloseModal}
            onAddSuccess={handleAfterAddDokter}
          />
        </Modal>
      </main>
    </div>
  );
}

export default Dokter;
