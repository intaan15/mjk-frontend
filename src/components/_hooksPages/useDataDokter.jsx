import React from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { useState,useEffect, useCallback } from "react";
import { useMemo } from "react";

export default function useDataDokter() {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataDokterbyId, setDataDokterbyId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Endpoint get data dokter
    const fetchDokter = useCallback(async () => {
        if (!token) return;
        
        setLoading(true);
        try {
        const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/dokter/getall`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        setData(res.data);
        setLoading(false);
        } catch (err) {
        console.error("Gagal fetch dokter:", err);
        setLoading(false);
        Swal.fire("Error!", "Gagal memuat data dokter.", "error");
        }
    }, [token]);

    //endpoint get data by id
    const fetchDokterById = useCallback(async (id) => {
        if (!id || !token) return;
        
        try {
        setLoading(true);
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/dokter/getbyid/${id}`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        console.log("Data dokter by ID:", response.data);
        setDataDokterbyId(response.data);
        setLoading(false);
        } catch (error) {
        console.error("Error fetching dokter by ID:", error);
        setLoading(false);
        Swal.fire("Error!", "Gagal memuat detail dokter.", "error");
        }
    }, [token]);

    // Handle Delete dokter
    const handleDelete = useCallback(async (id) => {
        if (!token) return;

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
            await axios.delete(
            `${import.meta.env.VITE_BASE_URL}/api/dokter/delete/${id}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
            
            // Refresh data
            setReloadTrigger(prev => prev + 1);
            Swal.fire("Berhasil!", "Data dokter berhasil dihapus.", "success");
        } catch (err) {
            console.error("Gagal hapus:", err);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
        }
        }
    }, [token]);

    //Send Email setelah add dokter
    const handleAfterAddDokter = useCallback((dokterData) => {
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
    
        // Refresh data setelah add
        setReloadTrigger(prev => prev + 1);
    }, []);

    const reloadData = useCallback(() => {
        setReloadTrigger(prev => prev + 1);
    }, []);

    const filteredDokter = useMemo(() => {
        const search = searchTerm.toLowerCase();
        return data.filter((item) => {
        return (
            item.nama_dokter?.toLowerCase().includes(search) ||
            item.email_dokter?.toLowerCase().includes(search) ||
            item.spesialis_dokter?.toLowerCase().includes(search) ||
            item.notlp_dokter?.toLowerCase().includes(search) ||
            item.username_dokter?.toLowerCase().includes(search)
        );
        });
    }, [data, searchTerm]);

    const totalItems = filteredDokter.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      
      console.log(`Menampilkan data ${start + 1}-${Math.min(end, totalItems)} dari ${totalItems}`);

      return filteredDokter.slice(start, end);
    }, [filteredDokter, currentPage, itemsPerPage, totalItems]);

    
  const getPaginationRange = (currentPage, totalPages, maxVisible = 5) => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  

    
    // Format tanggal helper
    const formatTanggal = useCallback((isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        });
    }, []);

    useEffect(() => {
        fetchDokter();
    }, [fetchDokter, reloadTrigger]);

    const setdataDokterbyId = useCallback((id) => {
        setSelectedId(id);
        if (id) {
        fetchDokterById(id);
        }
    }, [fetchDokterById]);

    const clearSelectedData = useCallback(() => {
        setSelectedId(null);
        setDataDokterbyId(null);
    }, []);

    const toggleDropdown = () => {setIsOpen(!isOpen);};
    const [isOpen, setIsOpen] = useState(false);
    

  return ({
    data,
    loading,
    setLoading,
    selectedId,
    setSelectedId,
    dataDokterbyId,
    setdataDokterbyId,
    reloadTrigger,
    setReloadTrigger,
    searchTerm,
    setSearchTerm,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    toggleDropdown,
    setIsOpen,
    isOpen,
    getPaginationRange,

    filteredDokter,
    totalItems,
    totalPages,
    paginatedData,

    fetchDokter,
    handleDelete,
    handleAfterAddDokter,
    reloadData,
    formatTanggal,
    clearSelectedData,
    getPaginationRange
    
    })
}
