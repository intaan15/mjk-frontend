import { useEffect, useState } from "react";
import axios from "axios";
import useLogout  from './useLogout';
import.meta.env.VITE_BASE_URL

const useDashboard = (selectedDate) => {
  const [jumlahKonsultasi, setJumlahKonsultasi] = useState(0);
  const [jumlahPengguna, setJumlahPengguna] = useState(0);
  const [verifikasiAkun, setVerifikasiAkun] = useState(0);
  const [artikelLog, setArtikelLog] = useState(0);
  const [akunBaru, setAkunBaru] = useState(0);
  const [artikelPublish, setArtikelPublish] = useState(0);
  const [allDokter, setAllDokter] = useState(0);
  const [jumlahDokter, setJumlahDokter] = useState(0);
  const [jadwalByTanggal, setJadwalByTanggal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const {handleLogout:handleLogout}=useLogout()
  const token = localStorage.getItem("token");
  const selected = selectedDate?.toISOString().split("T")[0];

    const formatTanggal = (tanggal) => {
        const dateObj = new Date(tanggal);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const dataBar = {
      konsultasi: jumlahKonsultasi,
      masyarakat: jumlahPengguna, 
      dokter: jumlahDokter,
      artikel: artikelPublish,
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [masyarakatRes, artikelRes, konsultasiRes, dokterRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/masyarakat/getall`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/artikel/getall`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/jadwal/getall`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/dokter/getall`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        // console.log("✅ Fetch data berhasil:");
        // Masyarakat
        const masyarakat = masyarakatRes.data;
        setJumlahPengguna(masyarakat.length);
        setVerifikasiAkun(masyarakat.filter((m) => m.verifikasi_akun_masyarakat === "pending").length);
        setAkunBaru(masyarakat.filter((m) => new Date(m.createdAt).toISOString().split("T")[0] === selected).length);

        // Artikel
        const artikel = artikelRes.data;
        setArtikelPublish(artikel.length);
        setArtikelLog(artikel.filter((a) => new Date(a.createdAt).toISOString().split("T")[0] === selected).length);

        // Konsultasi
        const jadwal = konsultasiRes.data;
        setJumlahKonsultasi(jadwal.length);
        setJadwalByTanggal(
          jadwal.filter((j) => {
            const tgl = new Date(j.tgl_konsul).toISOString().split("T")[0];
            return (
              tgl === selected &&
              ["diterima", "selesai", "menunggu", "ditolak"].includes(j.status_konsul)
            );
          }).length
        );

        // Dokter
        const dokter = dokterRes.data;
        setJumlahDokter(dokter.length);
        setAllDokter(dokter.filter((d) => new Date(d.createdAt).toISOString().split("T")[0] === selected).length);
      } catch (err) {
        console.error("❌ : Gagal fetch data dashboard:", err);
      }
    };

    fetchData();
  }, [selectedDate]);

  return {
    setIsOpen,

    isOpen,
    toggleDropdown,
    jumlahKonsultasi,
    jumlahPengguna,
    verifikasiAkun,
    artikelLog,
    akunBaru,
    artikelPublish,
    allDokter,
    jumlahDokter,
    jadwalByTanggal,
    formatTanggal,
    dataBar,
    selected,
    handleLogout,

  };
};

export default useDashboard;
