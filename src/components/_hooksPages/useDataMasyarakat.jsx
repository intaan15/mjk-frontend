import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const useDataMasyarakat = (token) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataMasyarakat, setDataMasyarakat] = useState([]);
  const [dataMasyarakatbyId, setDataMasyarakatbyId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDataMasyarakat = useCallback(async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/masyarakat/getall`, {
        headers: { Authorization: `Bearer ${token}` },
        });

        const filtered = res.data
        .filter(item => item.verifikasi_akun_masyarakat === 'diterima')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // <- SORT terbaru dulu

        setDataMasyarakat(filtered);
    } catch (err) {
        console.error("Gagal fetch DataMasyarakat:", err);
    }
   }, [token]);

  const fetchDataById = useCallback(async () => {
    if (!selectedId) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/masyarakat/getbyid/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataMasyarakatbyId(res.data);
    } catch (err) {
      console.error("Gagal fetch data by ID:", err);
    }
  }, [selectedId, token]);

  useEffect(() => {
    fetchDataMasyarakat();
  }, [fetchDataMasyarakat]);

  useEffect(() => {
    fetchDataById();
  }, [fetchDataById]);

  const filteredRows = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();
    return dataMasyarakat.filter((item) =>
      item.nama_masyarakat?.toLowerCase().includes(search) ||
      item.email_masyarakat?.toLowerCase().includes(search) ||
      item.notlp_masyarakat?.toLowerCase().includes(search) ||
      item.nik_masyarakat?.includes(search)
    );
  }, [dataMasyarakat, searchTerm]);

  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRows.slice(start, start + itemsPerPage);
  }, [filteredRows, currentPage, itemsPerPage]);

  const formatTanggal = (isoDateString) => {
  const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const toggleDropdown = () => { // Toggle dropdown for dropdown user
      setIsOpen(!isOpen);
  };

    const handleUpdateMasyarakat = useCallback((DataMasyarakat) => {
        Swal.fire({
        title: "Berhasil Memperbarui Data Masyarakat",
        text: "Apakah Anda ingin mengirim email pemberitahuan ke masyarakat?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        }).then((result) => {
        if (result.isConfirmed) {
            const subject = encodeURIComponent("Pemberitahuan Perubahan Data - Mojokerto Sehat");
            const body = encodeURIComponent(`Halo ${DataMasyarakat.nama_masyarakat},

            Anda telah berhasil memperbarui data Anda di sistem Mojokerto Sehat.

            Berikut detail akun Anda:
            - Username: ${DataMasyarakat.username_masyarakat}
            - Email: ${DataMasyarakat.email_masyarakat}
            - No. Telepon: ${DataMasyarakat.notlp_masyarakat}
            - NIK: ${DataMasyarakat.nik_masyarakat}
            - Alamat: ${DataMasyarakat.alamat_masyarakat}
            - Jenis Kelamin: ${DataMasyarakat.jeniskelamin_masyarakat}
            - Tanggal Lahir: ${formatTanggal(DataMasyarakat.tgl_lahir_masyarakat)}


            Silakan login kembali dan lengkapi profil Anda.

            Salam,
            Admin Mojokerto Sehat`);

            const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${DataMasyarakat.email_masyarakat}&subject=${subject}&body=${body}`;
            window.open(mailtoLink, "_blank");
        }
        });
    
        // Refresh data setelah add
        setReloadTrigger(prev => prev + 1);
    }, []);

  return {
    searchTerm,
    setSearchTerm,
    dataMasyarakatbyId,
    selectedId,
    setSelectedId,
    isModalOpen,
    setIsModalOpen,
    fetchDataMasyarakat,
    paginatedData,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    formatTanggal,
    dataMasyarakat,
    handleUpdateMasyarakat
  };
};