import { useState,useEffect, useCallback } from "react";
import { useAuth } from "../../components/Auth";
import useDataDokter from "../../components/_hooksPages/useDataDokter";
import useLogout from "../../components/_hooksPages/useLogout";




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
    isOpen,
    setIsOpen,
    getPaginationRange
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
        // console.log("Image URL:", imageUrl);

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
      accessorKey: "aksi",
      header: "Aksi",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="inline-flex gap-2 items-center bg-[#FAFBFD] p-2 rounded-xl border-1 border-[#979797] shadow-sm hover:shadow-md transition-all duration-300">
          <button
            onClick={() => openModal("detailprofildokter", row.original._id)}
            title="Detail"
            className="p-1.5 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-110"
          >
            <HiOutlineExclamationCircle className="text-black hover:text-[#004A76] text-lg cursor-pointer transition-colors duration-200" />
          </button>
    
          <button
            onClick={() => openModal("editdatadokter", row.original._id)}
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


    

  return (
    <div className="min-h-screen sm:mb-2 md:mb-4 lg:mb-5 lg:mt-0 bg-gray-50 transition-all duration-300 ease-in-out overflow-x-hidden">
      <main className="flex flex-col pt-4 px-4 xs:p-8 sm:p-10 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1 md:pt-5  mb-20 sm:mb-0 w-full max-w-full">
        
      <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all duration-200 ">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
            Data Dokter
          </h1>
          
          <div className="flex sm:flex-row gap-2 w-full sm:w-auto sm:items-center transition-all duration-200  ">
            {/* Search Bar */}
            <div className="flex items-center rounded-xl px-3 py-2 border-[1.5px] border-gray-300 gap-3 w-full sm:w-full  min-w-0 h-10 sm:h-11">
              <IoIosSearch className="text-gray-400 text-lg flex-shrink-0  sm:text-xl" />
              <input
                type="text"
                placeholder="Cari Nama"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-700 text-sm outline-none bg-transparent flex-1 sm:w-48 md:w-56 min-w-0"
              />
            </div>

            {/* Profile Dropdown */}
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
          <div className="group flex flex-row gap-4 sm:gap-6 md:gap-8 bg-gradient-to-r from-[#E0F4FF] to-[#F0F9FF] p-3 sm:p-4 rounded-2xl items-center px-4 w-full sm:w-auto shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-[#004A76] to-[#0066A3] p-2 sm:p-3 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
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
            className="group bg-gradient-to-r from-[#033E61] to-[#004A76] hover:from-white hover:to-white rounded-2xl font-raleway font-semibold p-3 sm:p-4 text-white hover:text-[#004A76] text-xs sm:text-sm shadow-lg hover:shadow-xl border-2 border-transparent hover:border-[#033E61] cursor-pointer flex items-center justify-center gap-3 w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
            <IoIosAddCircleOutline className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
            <span className="whitespace-nowrap">Tambah Data Dokter</span>
          </button>
        </div>

        {/* main table */}
        <div className="py-1 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004A76]"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : paginatedData && paginatedData.length > 0 ? (
            <Basetable data={paginatedData} columns={columns} />
          ) : (
            <div className="flex flex-col justify-center items-center py-8">
              <div className="text-gray-400 text-4xl">📋</div>
              <p className="text-gray-600 text-base">Tidak ada data yang ditemukan</p>
              <p className="text-gray-400 text-sm">Coba ubah filter atau kriteria pencarian</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-0 items-center justify-center mt-4">
          {/* Info Text */}
          <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left order-2 sm:order-1">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems}{" "}
            hasil
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2 sm:gap-4 order-1 sm:order-2 overflow-x-auto">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 text-sm
                  ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed border-gray-300"
                      : "hover:bg-[#004A76] hover:text-white hover:border-[#004A76] border-gray-300 text-gray-700 active:scale-95"
                  }
                `}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              {/* Pagination Numbers */}
              {(() => {
                const maxVisible = window.innerWidth < 640 ? 3 : 5; // Responsive max visible
                const paginationRange = getPaginationRange(
                  currentPage,
                  totalPages,
                  maxVisible
                );

                return (
                  <>
                    {/* First page + ellipsis */}
                    {paginationRange[0] > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentPage(1)}
                          className="px-2 xs:px-3 py-2 border rounded-lg transition-all duration-200 hover:bg-[#004A76] hover:text-white hover:border-[#004A76] border-gray-300 text-gray-700 text-sm font-medium active:scale-95"
                          >
                          1
                        </button>
                        {paginationRange[0] > 2 && (
                          <span className="px-1 sm:px-2 py-1 text-gray-500 text-sm">...</span>
                        )}
                      </>
                    )}

                    {/* Range pages */}
                    {paginationRange.map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                          className={`px-2 xs:px-3 py-2 border rounded-lg transition-all duration-200 text-sm font-medium active:scale-95
                          ${
                            currentPage === pageNum
                              ? "bg-[#004A76] text-white border-[#004A76]"
                              : "border-gray-300"
                          }
                        `}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* Ellipsis + Last page */}
                    {paginationRange[paginationRange.length - 1] < totalPages && (
                      <>
                        {paginationRange[paginationRange.length - 1] < totalPages - 1 && (
                          <span className="px-1 sm:px-2 py-1 text-gray-500 text-sm">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="px-2 xs:px-3 py-2 border rounded-lg transition-all duration-200 hover:bg-[#004A76] hover:text-white hover:border-[#004A76] border-gray-300 text-gray-700 text-sm font-medium active:scale-95"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                );
              })()}

              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 text-sm
                  ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed border-gray-300"
                      : "hover:bg-[#004A76] hover:text-white"
                  }
                `}
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

          {/* Empty div for grid alignment */}
          <div className="hidden sm:block order-3"></div>

          
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
