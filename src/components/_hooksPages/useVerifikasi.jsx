import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function useVerifikasi() {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [allRows, setAllRows] = useState([]);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dataMasyarakatbyId, setDataMasyarakatbyId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  
  // Hooks
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Dropdown handler
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Modal handlers
  const openModalWithId = (type, id) => {
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
    console.log("closeModal");
    setIsModalOpen(false);
    setModalType(null);
    setSelectedData(null);
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchData(); // Refresh data after modal close
  };

  // Authentication
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Data filtering
  const filteredData = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return allRows.filter((item) => {
      // Match status
      const matchStatus =
        filterStatus === "semua"
          ? item.verifikasi_akun_masyarakat === "pending"
          : item.verifikasi_akun_masyarakat === filterStatus;

      // Match keyword
      const matchSearch =
        item.nama_masyarakat?.toLowerCase().includes(search) ||
        item.email_masyarakat?.toLowerCase().includes(search) ||
        item.notlp_masyarakat?.toLowerCase().includes(search) ||
        item.nik_masyarakat?.includes(search);

      return matchStatus && matchSearch;
    });
  }, [allRows, filterStatus, searchTerm]);

  // Status counting
  const countStatus = useMemo(() => {
    return allRows.reduce((acc, item) => {
      const status = item.verifikasi_akun_masyarakat;
      if (status === "pending") acc.pending += 1;
      if (status === "diterima") acc.diterima += 1;
      if (status === "ditolak") acc.ditolak += 1;
      return acc;
    }, { pending: 0, diterima: 0, ditolak: 0 });
  }, [allRows]);

  // Date formatting
  const formatTanggal = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Verification handler
  const handleVerifikasi = (status, _id, email_masyarakat) => {
    Swal.fire({
      title: `Yakin ingin ${status === "diterima" ? "menerima" : "menolak"} data ini?`,
      text: "Pastikan semua data sudah diperiksa dengan benar.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "diterima" ? "#27AE60" : "#FF1700",
      cancelButtonColor: "#d33",
      confirmButtonText: `Ya, ${status === "diterima" ? "terima" : "tolak"}`,
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        if (status === "ditolak") {
          // Additional confirmation for email
          Swal.fire({
            title: `Kirim pesan konfirmasi ke ${email_masyarakat}?`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Kirim Email",
            cancelButtonText: "Tidak",
          }).then((res) => {
            if (res.isConfirmed) {
              // Open Gmail with draft
              const subject = encodeURIComponent("Konfirmasi Penolakan Verifikasi");
              const body = encodeURIComponent(`Halo,\n\nData Anda ditolak. Mohon periksa kembali informasi yang diberikan.\n\nTerima kasih.`);
              window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email_masyarakat}&su=${subject}&body=${body}`);
            }

            // Update status in backend
            updateVerificationStatus(status, _id);
          });
        } else {
          // Direct update for acceptance
          updateVerificationStatus(status, _id);
        }
      }
    });
  };

  // Update verification status
  const updateVerificationStatus = async (status, _id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/masyarakat/update/${_id}`,
        {
          verifikasi_akun_masyarakat: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Status verifikasi berhasil diperbarui (PATCH)");
      
      // Update local state
      setAllRows((prevRows) =>
        prevRows.map((item) =>
          item._id === _id ? { ...item, verifikasi_akun_masyarakat: status } : item
        )
      );
      setFilterStatus(status);
      setData((prevData) => prevData.filter((item) => item._id !== _id));

      Swal.fire({
        icon: "success",
        title: `Data berhasil ${status === "diterima" ? "diterima" : "ditolak"}`,
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/masyarakat/verifikasi");
    } catch (err) {
      console.error("Gagal update status", err);
      Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui status.", "error");
    }
  };

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/masyarakat/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const filteredData = res.data;
      setAllRows(filteredData);
      console.log(filteredData);
      setData(filteredData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data by ID
  const fetchDataById = async (id) => {
    if (!id) return;
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/masyarakat/getbyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataMasyarakatbyId(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataById(selectedId);
  }, [selectedId, token]);

  // Return all necessary data and functions
  return {
    // State
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    allRows,
    data,
    isOpen,
    dataMasyarakatbyId,
    selectedId,
    setSelectedId,
    loading,
    selectedData,
    setSelectedData,
    
    // Computed values
    filteredData,
    countStatus,
    
    // Functions
    toggleDropdown,
    openModalWithId,
    openModal,
    closeModal,
    handleEdit,
    handleCloseModal,
    handleLogout,
    formatTanggal,
    handleVerifikasi,
    fetchData,
    fetchDataById,
    
    // Constants
    token,
    navigate
  };
};