import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import.meta.env.VITE_BASE_URL

export const useDataArtikel = (token) => {
  const [artikel, setArtikel] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dataArtikel, setDataArtikel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");

  // Fetch semua artikel
  const fetchArtikel = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/artikel/getall`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArtikel(res.data);
    } catch (err) {
      console.error("Gagal fetch artikel:", err);
      setError("Gagal memuat data artikel");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch artikel berdasarkan ID
  const fetchArtikelById = useCallback(async (id) => {
    if (!id || !token) return;
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/artikel/getbyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataArtikel(response.data);
    } catch (error) {
      console.error("Gagal fetch artikel by ID:", {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
      setError("Gagal memuat detail artikel");
    }
  }, [token]);

  // Delete artikel
  const deleteArtikel = useCallback(async (id) => {
    if (!id || !token) return;

    const result = await Swal.fire({
      title: "Yakin mau hapus?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/artikel/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
        
        // Refresh data setelah hapus
        await fetchArtikel();
        
        return true;
      } catch (error) {
        console.error("Gagal menghapus artikel:", error);
        Swal.fire(
          "Gagal!",
          "Terjadi kesalahan saat menghapus data.",
          "error"
        );
        return false;
      }
    }
    
    return false;
  }, [token, fetchArtikel]);

  // Filter artikel berdasarkan kategori dan search term
  const filteredArtikel = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return artikel
      .filter((item) =>
        selectedKategori === "" ? true : item.kategori_artikel === selectedKategori
      )
      .filter((item) => {
        const judul = item.nama_artikel?.toLowerCase() || "";
        const kategori = item.kategori_artikel?.toLowerCase() || "";
        const isi = item.isi_artikel?.toLowerCase() || "";

        return (
          judul.includes(search) ||
          kategori.includes(search) ||
          isi.includes(search)
        );
      });
  }, [artikel, selectedKategori, searchTerm]);

  // Utility functions
  const setSelectedArtikelId = useCallback((id) => {
    setSelectedId(id);
    if (id) {
      fetchArtikelById(id);
    } else {
      setDataArtikel(null);
    }
  }, [fetchArtikelById]);

  const clearSelectedArtikel = useCallback(() => {
    setSelectedId(null);
    setDataArtikel(null);
  }, []);

  const refreshData = useCallback(async () => {
    await fetchArtikel();
  }, [fetchArtikel]);

  // Format tanggal helper
  const formatTanggal = useCallback((isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  // Effects
  useEffect(() => {
    fetchArtikel();
  }, [fetchArtikel]);

  useEffect(() => {
    if (selectedId) {
      fetchArtikelById(selectedId);
    }
  }, [selectedId, fetchArtikelById]);

    const handleDelete = (id) => {
      Swal.fire({
        title: "Yakin mau hapus?",
        text: "Data yang dihapus tidak bisa dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(
              `${import.meta.env.VITE_BASE_URL}/api/artikel/delete/${id}` , {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              }
            );
  
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
            fetchArtikel();
            // handleRefresh(); // Refresh data setelah hapus
          } catch (error) {
            console.error("Gagal menghapus artikel:", error);
            Swal.fire(
              "Gagal!",
              "Terjadi kesalahan saat menghapus data.",
              "error"
            );
          }
        }
      });
    };

  return {
    // Data states
    artikel,
    selectedId,
    dataArtikel,
    loading,
    error,
    filteredArtikel,
    handleDelete,
    
    // Filter states
    searchTerm,
    setSearchTerm,
    selectedKategori,
    setSelectedKategori,
    setSelectedId,
    
    // Actions
    fetchArtikel,
    fetchArtikelById,
    deleteArtikel,
    setSelectedArtikelId,
    clearSelectedArtikel,
    refreshData,
    
    // Utilities
    formatTanggal,
  };
};