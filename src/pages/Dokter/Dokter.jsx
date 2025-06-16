import { useState,useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../components/Auth";
import { useMemo } from "react";




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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("null");
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDropdown = () => {setIsOpen(!isOpen);};
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [dataDokterbyId, setdataDokterbyId] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [dokter, setDokter] = useState([]); 
  const { user } = useAuth();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setModalType("");
  };

  
  const formatTanggal = (isoDateString) => {
  const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
    navigate(`/detail/${data._id}`);
  };

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Redirect ke halaman login
    navigate("/login");
  };

  // ENDPOINT GET DATA DOKTER
  const fetchDokter = useCallback(async () => {
    setLoading(true); // Set loading state saat mulai fetch
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/dokter/getall`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDokter(res.data);
      setData(res.data); // Update kedua state sekaligus
      setLoading(false);
    } catch (err) {
      console.error("Gagal fetch dokter:", err);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDokter();
  }, [fetchDokter, reloadTrigger]);


  useEffect(() => {
    if (!selectedId) return; 
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/dokter/getbyid/${selectedId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("datadokter",response.data)
        setdataDokterbyId(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[selectedId, token]);
  
  const handleDelete = async (_id) => {
     const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data ini akan dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `${import.meta.env.VITE_BASE_URL}/api/dokter/delete/${_id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(res.data)
          console.log("Berhasil hapus:", res.data);
         fetchDokter();
         Swal.fire("Berhasil!", "Data dokter berhasil dihapus.", "success");
      } catch (err) {
      console.error("Gagal hapus:", err);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
    }
  }
};

const filteredDokter = useMemo(() => {
  const search = searchTerm.toLowerCase();

  return data.filter((item) => {
    return (
      item.nama_dokter?.toLowerCase().includes(search) ||
      item.email_dokter?.toLowerCase().includes(search) ||
      item.spesialisasi?.toLowerCase().includes(search) ||
      item.no_hp?.toLowerCase().includes(search)
    );
  });
}, [data, searchTerm]);


const handleAfterAddDokter = (dokterData) => {
  Swal.fire({
    title: "Berhasil Menambahkan Dokter",
    text: "Apakah Anda ingin mengirim email verifikasi ke dokter?",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
  }).then((result) => {
    if (result.isConfirmed) {
      const subject = encodeURIComponent("Verifikasi Akun Dokter - Mojokerto Sehat");
      const body = encodeURIComponent(`Halo Dr. ${dokterData.nama_dokter},

Anda telah berhasil terdaftar di sistem Mojokerto Sehat.

Berikut detail akun Anda:
- Username: ${dokterData.username_dokter}
- Spesialis: ${dokterData.spesialis_dokter}
- No. STR: ${dokterData.str_dokter}
- Password : ${dokterData.password_dokter}

(SILAHKAN SEGERA GANTI PASSWORD ANDA!)
Silakan login dan lengkapi profil Anda.

Salam,
Admin Mojokerto Sehat`);

      const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${dokterData.email_dokter}&subject=${subject}&body=${body}`;
      window.open(mailtoLink, "_blank");
    }
  });
};




const handleCloseModal = () => {
  setIsModalOpen(false);
  fetchDokter();
};

const totalItems = filteredDokter.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDokter.slice(start, start + itemsPerPage);
}, [filteredDokter, currentPage, itemsPerPage]);




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
    <div className="flex flex-row ">
      <main className="flex flex-col pl-8 gap-1 w-full pr-3">
        {/* kanan */}
        <div className="flex flex-row items-center justify-between pt-1">
          <p className="text-3xl font-[Nunito Sans] font-bold text-[#004A76]">
            {" "}
            Data Dokter
          </p>
          <div className="flex flex-row gap-4 relative">
            <div className=" flex items-center rounded-[19px] px-5 justify-start py-1 border-[1.5px] border-gray-300 gap-2 ">
              <IoIosSearch className="text-gray-400" />
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
                className="flex items-center focus:outline-none cursor-pointer"
              >
                <TiUser className="w-11 h-11 text-[#292D32]"> </TiUser>
              </button>

              <div>
                {isOpen && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/30 z-40"
                      onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 origin-top-right mt-8 w-48 lg: px-3 rounded-xl shadow-lg bg-[#FFFFFF] z-50 ">
                      <div className="py-1 justify-center">
                        <a
                          href=""
                          className="flex flex-row py-2 text-md font-[raleway] items-center font-bold text-[#004A76] gap-3"
                        >
                          <HiOutlineUser className="text-[30px]" />
                          {user?.username}
                        </a>

                        <a
                          href=""
                          onClick={handleLogout}
                          className="flex flex-row py-2 text-md font-[raleway] items-center font-medium text-[#004A76] hover:bg-gray-100 gap-3"
                        >
                          <IoLogOutOutline className="text-[30px]" /> Log Out
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

        <div className="flex flex-row justify-between w-full  items-center px-5 py-1">
          <div className="flex flex-row gap-8 bg-[#E0F4FF] p-2 rounded-xl items-center px-3">
            <div className="bg-[#004A76] p-3 rounded-full flex items-center justify-center">
              <FaUser className="text-[30px] item-center text-white" />
            </div>
            <div className="flex flex-col">
              <div className="font-[raleway] text-[#004A76] font-bold text-[15px]">
                Jumlah Dokter
              </div>
              <div className="font-[Nunito] text-[#004A76]  font-medium text-[15px]">
                {data.length} Pengguna
              </div>
            </div>
          </div>
          <button
            onClick={() => openModal("tambahdatadokter")}
            className="bg-[#033E61] rounded-xl font-[Raleway] p-4 hover:bg-white hover:text-[#004A76] hover:border-2 cursor-pointer text-white text-sm shadow-lg flex items-center gap-2"
          >
            <IoIosAddCircleOutline size={18} />
            Tambah Data Dokter
          </button>
        </div>

        {/* main table */}
        {/* main  */}
        <div className="py-2">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <>
              <Basetable data={paginatedData} columns={columns} />
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="grid grid-cols-3 items-center justify-center">
          {/* Jumlah ditampilkan */}
          <div className="text-sm text-gray-600">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems}{" "}
            hasil
          </div>

          {/* Navigasi dan Items per page */}
          <div className="flex items-center gap-4">
            {/* Pagination Number */}
            <div className="flex items-center space-x-2">
              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 cursor-pointer
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

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 cursor-pointer ${
                    currentPage === i + 1 ? "bg-[#004A76] text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className={`px-2 py-1 border-2 rounded-md transition duration-200 cursor-pointer
                    ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed border-gray-300"
                        : " hover:bg-[#004A76] hover:text-white"
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

        <Modal open={isModalOpen} onClose={closeModal}>
          <ModalContent
            modalType={modalType}
            idDokter={selectedId}
            dataDokterbyId={dataDokterbyId}
            onClose={handleCloseModal}
            token={token}
            onAddSuccess={handleAfterAddDokter}
          />
        </Modal>
      </main>
    </div>
  );
}

export default Dokter;
