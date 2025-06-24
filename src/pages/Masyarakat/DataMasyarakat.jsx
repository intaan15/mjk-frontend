import { useState, useEffect,useCallback,useMemo } from 'react' //hook untuk state
import { useAuth } from "../../components/Auth";
import.meta.env.VITE_BASE_URL


import { TiUser } from 'react-icons/ti'
import { FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineExclamationCircle, HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import Basetable from "../../components/Table/Basetable";
import ModalContent  from "../../components/Modal/ModalContent";
import Modal from "../../components/Modal/ModalTemplate";
import { useDataMasyarakat } from '../../components/_hooksPages/useDataMasyarakat';
import useLogout from '../../components/_hooksPages/useLogout';




function DataMasyarakat() {
  
  const token = localStorage.getItem("token");
  const [modalType, setModalType] = useState("");
  const {handleLogout:handleLogout}=useLogout()
  const {user} = useAuth();

  const {
    searchTerm,
    dataMasyarakatbyId,
    isOpen,
    setIsOpen,
    selectedId,
    loading,
    setLoading,
    isModalOpen,
    fetchDataMasyarakat,
    paginatedData,
    setSelectedData,
    totalItems,
    totalPages,
    setCurrentPage,
    currentPage,
    itemsPerPage,
    formatTanggal,
    setSelectedId,
    setSearchTerm,
    setIsModalOpen,
    dataMasyarakat,
    handleUpdateMasyarakat,
    getPaginationRange,
    ANIMASI_GAMBAR,
    fetchDataById
  }= useDataMasyarakat(token);

  const openModal = (type, id) => {
    setModalType(type);
    setSelectedId(id);
    fetchDataById(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);  
    setModalType("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchDataMasyarakat();
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
    navigate(`/detail/${data._id}`);
  };

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

 

  // paramater tabel
  const columns = [
    {
      header: "No",
      enableSorting: false,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "foto_profil_masyarakat",
      header: "Foto",
      enableSorting: false,
      cell: ({ getValue }) => {
        const imageUrl = getValue();
        return (
          <div className="group relative">
            <div className={`${ANIMASI_GAMBAR.animations.fast} group-hover:scale-105`}>
              {imageUrl ? (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${imageUrl}`}
                  alt="foto profil"
                  className="w-10 h-10 object-cover rounded-lg shadow-sm border border-gray-200"
                  onError={(e) => {
                    e.target.src = "/default-avatar.jpg";
                  }}
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <HiOutlineUser className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "nama_masyarakat",
      header: "Nama",
      enableSorting: false,
      cell: ({ getValue }) => (
        <div
          className="whitespace-normal break-words max-w-60"
          title={getValue()}
        >
          {getValue()}
        </div>
      ),
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
      accessorKey: "createdAt",
      header: "Tanggal Registrasi",
      enableSorting: true,
      cell: (info) => formatTanggal(info.getValue()),
    },
    {
      accessorKey: "Edit",
      header: "Aksi",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="grid grid-cols-2 gap-2 items-center bg-[#FAFBFD] p-2 rounded-xl border-1 border-[#979797] shadow-sm hover:shadow-md transition-all duration-300">
          <button
            onClick={() => openModal("detailprofilmasyarakat", row.original._id)}
            title="Detail"
            className="p-1,5 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-110"
          >
            <HiOutlineExclamationCircle className="text-black hover:text-[#004A76] text-lg cursor-pointer transition-colors duration-200" />
          </button>

          <button
            onClick={() => openModal("formeditmasyarakat", row.original._id)}
            title="Edit"
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
          >
            <FaEdit className="text-gray-600 hover:text-[#004A76] text-lg cursor-pointer transition-colors duration-200" />
            </button>
        </div>
      ),
    },
  ];
 
  
  return (
    <div className="min-h-screen sm:mb-2 md:mb-4 lg:mb-5 lg:mt-0 bg-gray-50 transition-all duration-300 ease-in-out overflow-x-hidden"> 
      <main className="flex flex-col pt-4 px-2 xs:p-8 sm:p-10 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1 md:pt-5  mb-20 sm:mb-0  max-w-full">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all duration-200 ">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
            Data Masyarakat
          </h1>
            <div className="flex sm:flex-row gap-2 w-full sm:w-auto sm:items-center transition-all duration-200 ease-in-out">
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
                      <div className="absolute right-0 origin-top-right mt-8 w-48 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50">
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
        
        <img src="/line style.svg" alt=""className='w-full' />

        {/* Statistics Card */}
        <div className="flex flex-row justify-start sm:justify-between w-full items-center  py-3 px-2 sm:px-4 lg:px-6 gap-4 lg:gap-2">
          <div  className="flex flex-row gap-4 sm:gap-6 lg:gap-6 bg-[#004A76] p-3 sm:p-2 rounded-2xl items-center px-4 sm:px-8 shadow-md">
            <div className="bg-white p-2 sm:p-3 rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src="/icon_user_verifikasi.svg"
                alt=""
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              />
            </div>
            <div className="flex flex-col">
                <span
                  className="text-white font-bold text-sm sm:text-md leading-tight"
                  style={{ fontFamily: "Nunito Sans" }}
                >
                  Jumlah Pengguna
                </span>
              <span
                className="text-white font-extrabold text-2xl sm:text-3xl lg:text-3xl"
              >
                {dataMasyarakat.length}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Tabel */}
        <div className="py-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004A76] mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : paginatedData && paginatedData.length > 0 ? (
            <div className="h-full overflow-auto ">
              <Basetable data={paginatedData} columns={columns} />
            </div>
          ) : (
              <div className="flex flex-col justify-center items-center py-8">
                <div className="text-gray-400 text-4xl">📋</div>
                <p className="text-gray-600 text-base">Tidak ada data yang ditemukan</p>
                <p className="text-gray-400 text-sm">Pencarian berdasarkan Nama</p>
              </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-0 items-center justify-center mt-4">
          {/* Results info */}
          <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left order-2 sm:order-1">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems}{" "}
            hasil
          </div>

          {/* Navigation */}
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

              {/* Show limited page numbers on mobile */}
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

          {/* Empty div for grid alignment */}
          <div className="hidden sm:block order-3"></div>
        </div>

        <Modal open={isModalOpen} onClose={closeModal}>
          <ModalContent
            modalType={modalType}
            idMasyarakat={selectedId}
            token={token}
            dataMasyarakatbyId={dataMasyarakatbyId}
            onClose={handleCloseModal}
            onAddSuccess={handleUpdateMasyarakat}
          />
        </Modal>
      </main>
    </div>
  );
}

export default DataMasyarakat