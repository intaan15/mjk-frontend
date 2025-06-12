import axios from 'axios'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '../Modal/ToastModal'
import DOMPurify from 'dompurify';
import.meta.env.VITE_BASE_URL

export default function useArtikel({idArtikel,token,onClose}) {
    const [dataArtikel, setDataArtikel] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
     // TAMBAH DATAAAA
    const [formData, setFormData] = useState({
        judul: "",
        foto: null,
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

            setFormData({
            judul: dataArtikel.nama_artikel || "",
            foto: null,
            kategori: dataArtikel.kategori_artikel || "",
            deskripsi: dataArtikel.detail_artikel || "",
            });
        }, [dataArtikel]);
        // console.log("Form data:", formData);
        
  // Handle input teks dan select
        // const handleChange = (name, value) => {
        //     const { name, value } = e.target;
        //     console.log("handleChange:", { name, value }); // Debug
        //     console.log(e);
        //     console.log(e?.target);
        //     setFormData((prev) => ({
        //     ...prev,
        //     [name]: value,
        //     }));
        // };
        function escapeHTML(html) {
            return html
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        }

        const handleChange = (eOrname, value) => {
            if (typeof eOrname === "string") {
                // dari TipTap
                const sanitizedValue = DOMPurify.sanitize(value);
                // console.log(sanitizedValue)
                setFormData((prev) => ({
                ...prev,
                [eOrname]: sanitizedValue, // gunakan value yang sudah di-escape
                }));
            } else {
                // dari input biasa
                const { name, value } = eOrname.target;
                setFormData((prev) => ({
                ...prev,
                [name]: value,
             }));
            }
        };

  // Handle file upload
        const handleFileChange = (e) => {
            setFormData((prev) => ({
            ...prev,
            foto: e.target.files[0], // simpan file object
            }));
        };

    
        const handleChangeKategori = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        };
  // SUBMIT FORM
        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
            const data = new FormData();
            data.append("foto", formData.foto); // file asli

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
            // const sanitizedDeskripsi = DOMPurify.sanitize(formData.deskripsi);
            const artikelData = {
                nama_artikel: formData.judul,
                kategori_artikel: formData.kategori,
                detail_artikel: DOMPurify.sanitize(formData.deskripsi),
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
            // alert("Artikel berhasil dibuat!");
            // onRefresh();
            onClose(false);
            } catch (error) {
            console.error(
                "Gagal buat artikel:", {
                status: error.response?.status,
                message: error.response?.data?.message,
                data: error.response?.data,
                }
            );
            showErrorToast("Gagal membuat artikel.");
            console.error("Gagal buat artikel:", error);
            // alert("Gagal membuat artikel.");
            }
        };

        // UPDATE DATAAA ARTIKEL
       
        // console.log("Form data:", formData);

        // console.log("Artikel yang diterima:", dataArtikel);

        const handleEditSubmit = async (e) => {
            e.preventDefault();

            try {
            let imagePath = dataArtikel?.gambar_artikel || null; // <-- pakai optional chaining

            if (formData.foto) {
                const data = new FormData();
                data.append("foto", formData.foto);

                const uploadRes = await axios.post(
                "${import.meta.env.VITE_BASE_URL}/api/artikel/upload",
                data,
                {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                    },
                }
                );
                imagePath = uploadRes.data.path;
                // console.log(imagePath)
            }

            const artikelData = {
                nama_artikel: formData.judul,
                kategori_artikel: formData.kategori,
                detail_artikel: DOMPurify.sanitize(formData.deskripsi),
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

            // alert("Artikel berhasil diubah!");
            showSuccessToast("Artikel berhasil diubah!")
            onClose(false);
            } catch (error) {
               const message =
                    error.response?.data?.message || error.message || "Terjadi kesalahan saat mengubah artikel.";

                console.error("Gagal update artikel:", message);

                showErrorToast(message);
            // alert("Gagal mengubah artikel.");
            }
        };

        const handleImageClick = (imageSrc) => {
            setSelectedImage(imageSrc);
            setShowImageModal(true);
        };
        
        const closeImageModal = () => {
            setShowImageModal(false);
            setSelectedImage('');
         };



return {

   // Data states
        formData,
        dataArtikel,
        
        // Modal zoom states
        showImageModal,
        selectedImage,
        
        // Form handlers
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEditSubmit,
        handleChangeKategori,
        
        // Modal zoom handlers
        handleImageClick,
        closeImageModal,
  }
}
