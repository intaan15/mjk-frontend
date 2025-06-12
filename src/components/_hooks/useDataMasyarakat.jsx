import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const useDataMasyarakat = (token) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataMasyarakat, setDataMasyarakat] = useState([]);
  const [dataMasyarakatbyId, setDataMasyarakatbyId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  };
};