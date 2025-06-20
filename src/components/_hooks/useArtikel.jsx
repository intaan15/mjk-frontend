import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../Modal/ToastModal";
import DOMPurify from "dompurify";

export default function useArtikel({ idArtikel, token, onClose }) {
  const [dataArtikel, setDataArtikel] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formArtikel, setFormArtikel] = useState({
    judul: "",
    gambar_artikel: null, 
    kategori: "",
    deskripsi: "",
  });


  const fetchArtikel = useCallback(async () => {
    if (!idArtikel || !token) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/artikel/getbyid/${idArtikel}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDataArtikel(response.data);
    } catch (error) {
      console.error("Gagal fetch artikel:", {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
      showErrorToast("Gagal memuat data artikel");
    } finally {
      setIsLoading(false);
    }
  }, [idArtikel, token]);

  

  useEffect(() => {
    fetchArtikel(); 
  }, [fetchArtikel]);

  useEffect(() => {
    if (!dataArtikel) return;

    setFormArtikel({
      judul: dataArtikel.nama_artikel || "",
      gambar_artikel: null, // UBAH DARI foto JADI gambar_artikel
      kategori: dataArtikel.kategori_artikel || "",
      deskripsi: dataArtikel.detail_artikel || "",
    });
  }, [dataArtikel]);
  // console.log("Form data:", formArtikel);

  function escapeHTML(html) {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // UBAH NAMA FUNGSI JADI handleChangeArtikel
  const handleChangeArtikel = useCallback((eOrname, value) => {
    if (typeof eOrname === "string") {
      // dari TipTap
      const sanitizedValue = DOMPurify.sanitize(value);
      setFormArtikel((prev) => ({
        ...prev,
        [eOrname]: sanitizedValue, // gunakan value yang sudah di-escape
      }));
    } else {
      // dari input biasa
      const { name, value } = eOrname.target;
      setFormArtikel((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  // UBAH NAMA FUNGSI JADI handleFileChangeArtikel
  const handleFileChangeArtikel = (e) => {
    console.log("File selected:", e.target.files[0]); // Debug
    setFormArtikel((prev) => ({
      ...prev,
      gambar_artikel: e.target.files[0], 
    }));
  };

  // UBAH NAMA FUNGSI JADI handleChangeKategoriArtikel
  const handleChangeKategoriArtikel = (e) => {
    const { name, value } = e.target;
    setFormArtikel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formArtikel.judul.trim()) {
      showErrorToast("Judul artikel wajib diisi.");
      return;
    }
    if (!formArtikel.kategori.trim()) {
      showErrorToast("Kategori artikel wajib diisi.");
      return;
    }
    if (!formArtikel.deskripsi.trim()) {
      showErrorToast("Deskripsi artikel wajib diisi.");
      return;
    }
    if (!formArtikel.gambar_artikel) {
      showErrorToast("Gambar artikel wajib dipilih.");
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("foto", formArtikel.gambar_artikel); // UBAH DARI formData.foto

      // Langkah 1: Upload gambar
      const uploadRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/artikel/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imagePath = uploadRes.data.path;

      // Langkah 2: Kirim data artikel sesuai struktur backend
      const artikelData = {
        nama_artikel: formArtikel.judul,
        kategori_artikel: formArtikel.kategori,
        detail_artikel: DOMPurify.sanitize(formArtikel.deskripsi),
        gambar_artikel: imagePath,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/artikel/create`,
        artikelData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSuccessToast("Artikel berhasil dibuat!");
      onClose(false);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat menambah artikel.";

      console.error("Gagal menambah artikel:", message);
      showErrorToast(message);
    }
  };

  // UBAH NAMA FUNGSI JADI handleEditSubmitArtikel
  const handleEditSubmitArtikel = async (e) => {
    e.preventDefault();

    try {
      let imagePath = dataArtikel?.gambar_artikel || null;

      if (formArtikel.gambar_artikel) {
        // ✅ VALIDASI UKURAN MAKSIMAL 2MB
        if (formArtikel.gambar_artikel.size > 2 * 1024 * 1024) {
          showErrorToast("Ukuran gambar maksimal 2MB.");
          return;
        }

        // Upload gambar
        const data = new FormData();
        data.append("foto", formArtikel.gambar_artikel);

        const uploadRes = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/artikel/upload`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        imagePath = uploadRes.data.path;
      }

      const artikelData = {
        nama_artikel: formArtikel.judul,
        kategori_artikel: formArtikel.kategori,
        detail_artikel: DOMPurify.sanitize(formArtikel.deskripsi),
        gambar_artikel: imagePath,
      };

      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/artikel/update/${idArtikel}`,
        artikelData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSuccessToast("Artikel berhasil diubah!");
      onClose(false);
    } catch (error) {
      const status = error.response?.status;
      let message =
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat mengubah artikel.";

      if (status === 413) {
        message = "Ukuran file terlalu besar. Maksimal 2MB.";
      }

      console.error("Gagal update artikel:", message);
      showErrorToast(message);
    }
  };
  

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage("");
  };

  //UPDATE UPLOAD GAMBAR
  const handleResetFile = () => {
    setFormArtikel((prev) => ({
        ...prev,
        gambar_artikel: null,
    }));

    // Reset input file supaya UI input juga kosong
    const inputFile = document.getElementById("gambar_artikel");
    if (inputFile) inputFile.value = "";
  };

  return {
    formArtikel, 
    dataArtikel,
    handleChangeArtikel, 
    handleFileChangeArtikel, // UBAH DARI handleFileChange
    handleChangeKategoriArtikel, // UBAH DARI handleChangeKategori
    handleSubmit,
    handleEditSubmitArtikel, // UBAH DARI handleEditSubmit
    handleImageClick,
    closeImageModal,
    showImageModal,
    selectedImage,
    handleResetFile, 
  };
}
