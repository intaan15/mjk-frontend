import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '../Modal/ToastModal';
import DataMasyarakat from '../../pages/Masyarakat/DataMasyarakat';
import.meta.env.VITE_BASE_URL



export default function useMasyarakat({idMasyarakat,token,onClose, onAddSuccess}) {
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [dataMasyarakatbyId, setDataMasyarakatbyId] = useState(null);
  const [previewFotoKTP, setPreviewFotoKTP] = useState(dataMasyarakatbyId?.foto_ktp_masyarakat || null);
  const [fotoKTPFile, setFotoKTPFile] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [formData, setFormData] = useState({
    nama: "",
    username: "",
    email:"",
    NIK:"",
    alamat:"",
    notlp:"",
    jeniskelamin_masyarakat:"",
    tanggalLahir:"",
    foto_ktp_masyarakat:null,
    selfie_ktp_masyarakat:null,
    foto_profil_masyarakat:null,
  });

  const handleFotoKTPChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoKTPFile(file);

    }
  };

  useEffect(() => {
    // Debug: pastikan props valid
    const token = localStorage.getItem("token");
    if (!idMasyarakat || !token) {
      return;
    }

    const fetchData = async () => {
      try {
          const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/masyarakat/getbyid/${idMasyarakat}`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          setDataMasyarakatbyId(response.data);
          // console.log("☑️Data diterima:", response.data);
      } catch (error) {
          console.error("Gagal fetch masyarakat:", {
              status: error.response?.status,
              message: error.message,
              data: error.response?.data,
          });
      }
  };
    fetchData();
  }, [idMasyarakat, token, refreshTrigger]);

  const handleRefreshData = () => {
      setRefreshTrigger(prev => prev + 1);
  };



  useEffect(() => {
    if (!dataMasyarakatbyId) return;

    // console.log("📦 Data dari API:", dataMasyarakatbyId); // Debug

    setFormData({
      nama: dataMasyarakatbyId.nama_masyarakat || "",
      username: dataMasyarakatbyId.username_masyarakat || "",
      email: dataMasyarakatbyId.email_masyarakat || "",
      NIK:dataMasyarakatbyId.nik_masyarakat || "",
      alamat:dataMasyarakatbyId.alamat_masyarakat || "",
      jeniskelamin_masyarakat:dataMasyarakatbyId.jeniskelamin_masyarakat || "",
      notlp:dataMasyarakatbyId.notlp_masyarakat || "",
      tanggalLahir:dataMasyarakatbyId.tgl_lahir_masyarakat
        ? new Date(dataMasyarakatbyId.tgl_lahir_masyarakat).toISOString().split("T")[0]
        : "",
     foto_ktp_masyarakat: dataMasyarakatbyId.foto_ktp_masyarakat || null,
     selfie_ktp_masyarakat: dataMasyarakatbyId.selfie_ktp_masyarakat || null,
     foto_profil_masyarakat:null,


    });
    // console.log("iniform",formData); // Debug
    // console.log("inifotoktp",formData.selfie_ktp_masyarakat); // Debug
  }, [dataMasyarakatbyId]);

 

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
    ...prev,
    [name]: value,
    }));
  };

 
  const handleFileChange = (e) => {
      setFormData((prev) => ({
      ...prev,
      foto: e.target.files[0], // simpan file object
      
      }));
  };

  // UPDATE DATAAA Masyarakat

    // 1. Cek validasi Update inputan 
    const validateUpdateForm = (formData) => {
      const errors = {};
      const fieldkosong = [];
    
      // Daftar field yang wajib diisi
      const requiredFields = [
        { key: 'nama', label: 'Nama' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'NIK', label: 'NIK' },
        { key: 'notlp', label: 'Nomor Telepon' },
        { key: 'alamat', label: 'Alamat' },
        { key: 'jeniskelamin_masyarakat', label: 'Jenis Kelamin' },
        { key: 'tanggalLahir', label: 'Tanggal Lahir' }
      ];

      // Cek field yang kosong terlebih dahulu
      requiredFields.forEach(field => {
        if (!formData[field.key] || (typeof formData[field.key] === 'string' && formData[field.key].trim() === '')) {
          fieldkosong.push(field.label);
        }
      });

      // Jika ada field yang kosong, return dengan pesan error umum
      if (fieldkosong.length > 0) {
        return {
          isValid: false,
          errors: { general: 'Data tidak boleh kosong' },
          fieldkosong: fieldkosong
        };
      }

      // Validasi Nama (required, min 2 karakter)
      if (!formData.nama || formData.nama.trim() === '') {
        errors.nama = 'Nama wajib diisi';
      } else if (formData.nama.trim().length < 2) {
        errors.nama = 'Nama minimal 2 karakter';
      } 
    
      // Validasi Username (required, min 3 karakter, no special chars)
      if (!formData.username || formData.username.trim() === '') {
        errors.username = 'Username wajib diisi';
      } else if (formData.username.trim().length < 3) {
        errors.username = 'Username minimal 3 karakter';
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
        errors.username = 'Username hanya boleh berisi huruf, angka, dan underscore';
      }
    
      // Validasi Email (required, format email)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || formData.email.trim() === '') {
        errors.email = 'Email wajib diisi';
      } else if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Format email tidak valid';
      }
    
      // Validasi NIK (required, 16 digit angka)
      if (!formData.NIK || formData.NIK.trim() === '') {
        errors.NIK = 'NIK wajib diisi';
      } else if (!/^\d{16}$/.test(formData.NIK.trim())) {
        errors.NIK = 'NIK harus berupa 16 digit angka';
      }
    
      // Validasi No Telepon (required, format Indonesia)
      if (!formData.notlp || formData.notlp.trim() === '') {
        errors.notlp = 'Nomor telepon wajib diisi';
      } else if (!/^(08|62)\d{8,12}$/.test(formData.notlp.trim().replace(/[\s-]/g, ''))) {
        errors.notlp = 'Format nomor telepon tidak valid (contoh: 08123456789)';
      }
    
      // Validasi Alamat (required, min 10 karakter)
      if (!formData.alamat || formData.alamat.trim() === '') {
        errors.alamat = 'Alamat wajib diisi';
      } else if (formData.alamat.trim().length < 10) {
        errors.alamat = 'Alamat minimal 10 karakter';
      }
    
      // Validasi Jenis Kelamin (required)
      if (!formData.jeniskelamin_masyarakat) {
        errors.jeniskelamin_masyarakat = 'Jenis kelamin wajib dipilih';
      } else if (!['Laki-laki', 'Perempuan'].includes(formData.jeniskelamin_masyarakat)){
        errors.jeniskelamin_masyarakat = 'Jenis kelamin tidak valid';
      }
    
      // Validasi Tanggal Lahir (required, tidak boleh masa depan, minimal 17 tahun)
      if (!formData.tanggalLahir) {
        errors.tanggalLahir = 'Tanggal lahir wajib diisi';
      } else {
        const birthDate = new Date(formData.tanggalLahir);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (birthDate > today) {
          errors.tanggalLahir = 'Tanggal lahir tidak boleh di masa depan';
        
        } else if (age > 100) {
          errors.tanggalLahir = 'Tanggal lahir tidak valid';
        }
      }
    
      // Validasi File Foto (optional, tapi jika ada harus valid)
      if (formData.foto) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 20 * 1024 * 1024; // 2MB
    
        if (!allowedTypes.includes(formData.foto.type)) {
          errors.foto = 'Format foto harus JPG, JPEG, atau PNG';
        } else if (formData.foto.size > maxSize) {
          errors.foto = 'Ukuran foto maksimal 2MB';
        }
      }
    
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    };
    
    const handleEditSubmit = async (e) => {
      e.preventDefault();
      const validation = validateUpdateForm(formData);
      if (!validation.isValid) {
        const firstError = Object.values(validation.errors)[0];
        showErrorToast(firstError);
        // console.log("Validation errors:", validation.errors);
        return;
      }

      try {
        let imagePath = dataMasyarakatbyId.foto_ktp_masyarakat|| null; // <-- pakai optional chaining

        if (formData.foto) {
            const data = new FormData();
            data.append("foto", formData.foto);
            const uploadRes = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/auth/register_masyarakat`,
            data,
            {
                headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
                },
            }
            );
              if (!uploadRes.data?.path) {
              throw new Error("Upload gagal: path tidak ditemukan"); // <-- ini penting
            }
            imagePath = uploadRes.data.path;
      }

      const masyarakatData = {
          nama_masyarakat: formData.nama,
          username_masyarakat: formData.username,
          email_masyarakat: formData.email,
          nik_masyarakat: formData.NIK,
          notlp_masyarakat:formData.notlp,
          alamat_masyarakat: formData.alamat,
          jeniskelamin_masyarakat: formData.jeniskelamin_masyarakat,
          tgl_lahir_masyarakat: formData.tanggalLahir,
          // foto_ktp_masyarakat: imagePath,
          // selfie_ktp_masyarakat:imagePath,
          // foto_profil_masyarakat:imagePath
      };
      // console.log("inimasyarakat",masyarakatData)

      const updateResponse = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/masyarakat/update/${idMasyarakat}`,
        masyarakatData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedData = updateResponse.data?.data || masyarakatData;
      if (onAddSuccess) {
        onAddSuccess(updatedData); // data masyarakat baru dari response
      }
        showSuccessToast("Data masyarakat berhasil diubah");
        onClose(false);
        if (typeof refreshData === 'function') {
          await refreshData();
        }

        return;
      } catch (error) {
        console.error("Gagal update Data Masyarakat:", error.response?.data || error.message);
        showErrorToast("Gagal mengubah Data Masyarakat");
      }
    };

const openPreview = (imageSrc, imageAlt) => {
        setPreviewImage({ src: imageSrc, alt: imageAlt });
        setIsPreviewOpen(true);
    };

    const closePreview = () => {
      setPreviewImage(null);
      setIsPreviewOpen(false);
    };

  return ({
    dataMasyarakatbyId,
    formData,
    handleChange,
    handleFileChange,
    handleEditSubmit,
    handleFotoKTPChange,
    previewFotoKTP,
    fotoKTPFile,
    previewImage,
    isPreviewOpen,
    openPreview,
    closePreview
   

  }
   

)
}
