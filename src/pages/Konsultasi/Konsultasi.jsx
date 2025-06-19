import React from 'react'
import Basetable from "../../components/Table/Basetable";
import useLogout from "../../components/_hooks/useLogout";
import useKonsultasi from "../../components/_hooks/useKonsultasi";
import { useAuth } from "../../components/Auth";
import.meta.env.VITE_BASE_URL


// import Trash from "./icons/Trash";
import { IoIosSearch } from "react-icons/io";
import { TiUser } from "react-icons/ti";
import { HiOutlineUser } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { TbReload } from "react-icons/tb";

function Konsultasi() {
  const { user } = useAuth();
  const {handleLogout:handleLogout}=useLogout()
  const token = localStorage.getItem("token");
  const {

    //state updater
    setFilterStatus,
    setSearchTerm,
    setAllrows,
    setIsOpen,
    setCurrentPage,
    setSelectedPoli,
    setSelectedDate,

    
    //state
    filterStatus,
    searchTerm,
    isOpen,
    loading,
    currentPage,
    itemsPerPage,
    formatTanggal,
    selectedDate,
    toggleDropdown,
    paginatedData,
    totalItems,
    totalPages,
    selectedPoli,
    poliOptions,
    handleResetFilter,
    getPaginationRange,

  } = useKonsultasi(token);

  //kolom konsultasi 
  const columns = [
           {
            header: "No",
            enableSorting: false,
            cell: ({ row }) => row.index + 1,
          },
          {
              accessorKey: "nama_masyarakat",
              header: "Nama Pasien",
              enableSorting: false,
              cell: ({ row }) => 
              <div className="w-40 truncate">
                  {row.original.masyarakat_id?.nama_masyarakat || "-"}
              </div>
          },
          {
              accessorKey: "spesialis_dokter",
              header: "Poli",
              enableSorting: false,
              cell: ({ row }) => row.original.dokter_id?.spesialis_dokter || "-"
          },
          {
              accessorKey: "nama_dokter",
              header: "Nama Dokter",
              enableSorting: false,
              cell: ({ row }) =>  <div className="w-40 truncate">
                  {row.original.dokter_id?.nama_dokter || "-"}
              </div>

          },
          {
              accessorKey: "jam_konsul",
              header: "Waktu",
              enableSorting: false,

          },
          {
              accessorKey: "tgl_konsul",
              header: "Tgl. Konsultasi",
              enableSorting: true,
              cell: info => formatTanggal(info.getValue()),

          },
          {
              accessorKey: "status_konsul",
              header: "Status",
              enableSorting: false,
              cell: ({ row }) => {
                const status = row.original.status_konsul;

                let bgColor = "";
                let textColor = "";
                let label = "";
                let fontstyle = "";

                switch (status) {
                  case "selesai": //selesai konsultasi
                    bgColor = "bg-[#27AE60]";
                    textColor = "text-white" ;
                    label = "Selesai";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "ditolak": //ditolak dokter
                    bgColor = "bg-[#EF3826]";
                    textColor = "text-white";
                    label = "Ditolak";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "diterima": //jadwal diterima belum melakukan konsultasi
                    bgColor = "bg-[#BCE2C5]";
                    textColor = "text-[#155724]";
                    label = "Diterima";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "berlangsung": //sedang terjadi konsultasi
                    bgColor = "bg-[#3498DB]";
                    textColor = "text-white";
                    label = "Berlangsung";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  case "menunggu": //menunggu konsultasi 
                    bgColor = "bg-[#FFE592]";
                    textColor = "text-[#856404]";
                    label = "Menunggu";
                    fontstyle ="font-[raleway] font-semibold";
                    break;
                  default:
                    bgColor = "bg-gray-200";
                    textColor = "text-gray-800";
                    label = "Tidak diketahui";
                    fontstyle ="font-[raleway] font-semibold";
                }
                return (
                  <span className={`px-2 py-1 rounded-md text-sm font-medium ${bgColor} ${textColor}`}>
                    {label}
                  </span>
                );
             }
              

          },
        
          
      ];

  
      
  // FRONT END
  return (
    <div className="flex flex-row min-h-screen ">
      <main className="flex flex-col sm:p-4 md:p-6 lg:p-5 gap-3 sm:gap-0 md:gap-1 w-full mb-20 sm:mb-24 md:mb-16 lg:mb-8">
        {/* Navbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-[raleway] font-bold text-[#004A76]">
            Konsultasi
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:items-center">
            {/* Search Bar */}
            <div className="flex items-center rounded-xl px-3 py-2 border-[1.5px] border-gray-300 gap-3 w-full sm:w-auto  min-w-0 h-10 sm:h-11">
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
            <div className="flex flex-row gap-4 relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center  justify-center focus:outline-none cursor-pointer w-10 h-10 sm:w-11 sm:h-11 md:w-11 md:h-11 lg:w-11 lg:h-11 rounded-full hover:bg-gray-100 transition-colors"
              >
                 <TiUser className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#292D32]" />
         
              </button>

              <div>
                {isOpen && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/30 z-40"
                      onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 origin-top-right mt-10 sm:mt-12 w-48 sm:w-52 px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50">
                      <div className="py-1 justify-center">
                        <a className="flex flex-row py-2 text-sm sm:text-md font-[raleway] items-center font-bold text-[#004A76] gap-3">
                          <HiOutlineUser className="text-xl sm:text-2xl md:text-[28px]" />
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

        {/* Filter Buttons */}
        <div className="flex flex-row justify-center w-full py-2 gap-2 sm:gap-4">
          <button
            onClick={() => setFilterStatus("Diproses")}
            className={`${
              filterStatus === "Diproses"
                ? "bg-[#004A76] font-bold"
                : "bg-[#B3B3B3]"
            } hover:opacity-80 text-white px-4 sm:px-6 md:px-8 h-10 rounded-md text-sm sm:text-md font-[raleway] cursor-pointer flex-1 sm:flex-initial`}
          >
            Diproses
          </button>
          <div className="h-10 bg-[#004A76] w-1"></div>
          <button
            onClick={() => setFilterStatus("Selesai")}
            className={`${
              filterStatus === "Selesai"
                ? "bg-[#004A76] font-bold"
                : "bg-[#B3B3B3]"
            } hover:opacity-80 text-white px-4 sm:px-6 md:px-8 h-10 rounded-md text-sm sm:text-md font-[raleway] cursor-pointer flex-1 sm:flex-initial`}
          >
            Riwayat
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 py-3 px-2 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
            <label className="font-[raleway] font-bold text-[#004A76] text-sm sm:text-base">
              Tanggal
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded p-2 text-gray-700 border-[#004A76] h-10 cursor-pointer w-full sm:w-auto text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
            <label className="font-[raleway] font-bold text-[#004A76] text-sm sm:text-base whitespace-nowrap">
              Filter Poli
            </label>
            <select
              value={selectedPoli}
              onChange={(e) => setSelectedPoli(e.target.value)}
              className="border rounded p-2 text-gray-700 border-[#004A76] h-10 cursor-pointer w-full sm:w-auto text-sm"
            >
              {poliOptions.map((poli, idx) => (
                <option key={idx} value={poli}>
                  {poli}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center sm:justify-start">
            <button
              onClick={handleResetFilter}
              className="bg-[#004A76] hover:bg-[#38B6FE]/50 text-white p-3 items-center rounded-md text-sm font-[raleway] cursor-pointer"
            >
              <TbReload />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="py-1 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : (
            <div className="min-w-full">
              <Basetable data={paginatedData} columns={columns} />
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
                      : "hover:bg-[#004A76] hover:text-white"
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
                          className="px-2 sm:px-3 py-1 border rounded-md transition duration-200 hover:bg-[#004A76] hover:text-white border-gray-300 text-sm"
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
                        className={`px-2 sm:px-3 py-1 border rounded-md transition duration-200 hover:bg-[#004A76] hover:text-white text-sm
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
                          className="px-2 sm:px-3 py-1 border rounded-md transition duration-200 hover:bg-[#004A76] hover:text-white border-gray-300 text-sm"
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
      </main>
    </div>
  );

}

export default Konsultasi
