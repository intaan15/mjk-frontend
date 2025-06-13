import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../Modal/ToastModal";
import DOMPurify from "dompurify";

export default function useArtikel({ idArtikel, token, onClose }) {
  const [dataArtikel, setDataArtikel] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  // UBAH NAMA DARI formData JADI formArtikel
  const [formArtikel, setFormArtikel] = useState({
    judul: "",
    gambar_artikel: null, // UBAH DARI foto JADI gambar_artikel
    kategori: "",
    deskripsi: "",
  });

  useEffect(() => {
    // Debug: pastikan props valid
    if (!idArtikel || !token) {
      // console.error("Tidak bisa fetch: idArtikel/token tidak ada");
      return;
    }

    // console.log("Fetching artikel...", { idArtikel, token });
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/artikel/getbyid/${idArtikel}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("Data diterima:", response.data);
        setDataArtikel(response.data);
      } catch (error) {
        console.error("Gagal fetch artikel:", {
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });
      }
    };

    fetchData();
  }, [idArtikel, token]);

  useEffect(() => {
    if (!dataArtikel) return;

    // console.log("Data artikel diterima:", dataArtikel); // Debug

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
  const handleChangeArtikel = (eOrname, value) => {
    if (typeof eOrname === "string") {
      // dari TipTap
      const sanitizedValue = DOMPurify.sanitize(value);
      // console.log(sanitizedValue)
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
  };

  // UBAH NAMA FUNGSI JADI handleFileChangeArtikel
  const handleFileChangeArtikel = (e) => {
    console.log("File selected:", e.target.files[0]); // Debug
    setFormArtikel((prev) => ({
      ...prev,
      gambar_artikel: e.target.files[0], // UBAH DARI foto JADI gambar_artikel
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
      // console.log("Token:", token);

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
      // console.log("Artikel berhasil dibuat:", res.data);
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
    console.log("Klik gambar:", imageSrc); // Debug
    setSelectedImage(imageSrc);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage("");
  };

  return {
    // UBAH NAMA RETURN
    formArtikel, // UBAH DARI formData
    dataArtikel,
    handleChangeArtikel, // UBAH DARI handleChange
    handleFileChangeArtikel, // UBAH DARI handleFileChange
    handleChangeKategoriArtikel, // UBAH DARI handleChangeKategori
    handleSubmit,
    handleEditSubmitArtikel, // UBAH DARI handleEditSubmit
    handleImageClick,
    closeImageModal,
    showImageModal,
    selectedImage,
  };
}
