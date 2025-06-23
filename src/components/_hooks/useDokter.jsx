import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { showSuccessToast, showErrorToast } from '../Modal/ToastModal';
import.meta.env.VITE_BASE_URL

export default function useDokter ({idDokter,token,onClose,modalType,onAddSuccess}) {
    const [dataDokterbyId, setDataDokterbyId] = useState(null);

    //Menyimpan data inputan 
    const [formData, setFormData] = useState({
        nama_dokter: "",
        username_dokter: "",
        email_dokter:"",
        rating_dokter:"",
        spesialis:"",
        password_dokter:"",
        str_dokter :"",
        notlp_dokter:"",
        foto_profil_dokter:null,

    });

    // console.log(formData)
    
    useEffect(() => {
        // Debug: pastikan props valid
        const token = localStorage.getItem("token");
        if (!idDokter || !token) {
            console.error("Tidak bisa fetch: idDokter/token tidak ada");
        return;
        }
    
        // console.log("Fetching Dokter...", { idDokter, token });
    
    
        const fetchData = async () => {
        try {
            const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/dokter/getbyid/${idDokter}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
    
            setDataDokterbyId(response.data);
            // console.log("Data dokter by ID:", response.data);
            console.log("☑️ Data diterima oleh form");
        } catch (error) {
            console.error("Gagal fetch dokter:", {
            status: error.response?.status,
            message: error.message,
            data: error.response?.data,
            });
        }
        };
            fetchData();
    }, [idDokter, token]);

    useEffect(() => {
        if (modalType === "tambahdatadokter") {
            // Reset semua data termasuk dataDokterbyId
            setDataDokterbyId(null);
            
            // Reset form data ke default
            const newPassword = generatePassword(8);
            setFormData({
                nama_dokter: "",
                username_dokter: "",
                email_dokter:"",
                rating_dokter:"",
                spesialis:"",
                password_dokter: newPassword,
                str_dokter :"",
                notlp_dokter:"",
                foto_profil_dokter:null,
            });
      }
    }, [modalType]);


        

    useEffect(() => {
      
      const token = localStorage.getItem("token");
      if (!dataDokterbyId) return;

      console.log("☑️ Data dokter diterima");

      setFormData({
        nama_dokter: dataDokterbyId.nama_dokter || "",
        username_dokter: dataDokterbyId.username_dokter || "",
        email_dokter: dataDokterbyId.email_dokter || "",
        notlp_dokter: dataDokterbyId.notlp_dokter || "",
        rating_dokter: dataDokterbyId.rating_dokter || "",
        // PENTING: Jangan set foto_profil_dokter ke string path di sini
        // Biarkan null supaya tidak conflict dengan File object
        foto_profil_dokter: null,
        spesialis: dataDokterbyId.spesialis_dokter
          ? {
              label: dataDokterbyId.spesialis_dokter,
              value: dataDokterbyId.spesialis_dokter,
            }
          : null,
        str_dokter: dataDokterbyId.str_dokter || "",
        password_dokter: dataDokterbyId.password_dokter || "",
      });
    }, [dataDokterbyId]);

    // console.log("☑️ Data dokter diterima:",formData);
    // console.log("foto_profil_dokter:", formData.foto_profil_dokter);


    //handle opsi poli yang dipilih
    const handleChangeSelect = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            spesialis: selectedOption
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };


    //UPDATE GAMBAR SETELAG UPLOAD
    const handleFileChange = (e) => {
        setFormData((prev) => ({
        ...prev,
             foto_profil_dokter: e.target.files[0],
        }));
    };




    const validateForm = () => {
      const errors = {};
      
      // Validasi nama dokter
      if (!formData.nama_dokter?.trim()) {
          errors.nama_dokter = "Nama dokter wajib diisi";
      } else if (formData.nama_dokter.trim().length < 3) {
          errors.nama_dokter = "Nama dokter minimal 3 karakter";
      } else if (!/^[a-zA-Z\s.]+$/.test(formData.nama_dokter)) {
          errors.nama_dokter = "Nama dokter hanya boleh berisi huruf, spasi, dan titik";
      }
  
      // Validasi username
      if (!formData.username_dokter?.trim()) {
          errors.username_dokter = "Username wajib diisi";
      } else if (formData.username_dokter.trim().length < 4) {
          errors.username_dokter = "Username minimal 4 karakter";
      } else if (!/^[a-zA-Z0-9._]+$/.test(formData.username_dokter)) {
          errors.username_dokter = "Username hanya boleh berisi huruf, angka, titik, dan underscore";
      }
  
      // Validasi email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email_dokter?.trim()) {
          errors.email_dokter = "Email wajib diisi";
      } else if (!emailRegex.test(formData.email_dokter)) {
          errors.email_dokter = "Format email tidak valid";
      }
  
      // Validasi nomor telepon
      const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
      if (!formData.notlp_dokter?.trim()) {
          errors.notlp_dokter = "Nomor telepon wajib diisi";
      } else if (!phoneRegex.test(formData.notlp_dokter.replace(/\s/g, ''))) {
          errors.notlp_dokter = "Format nomor telepon tidak valid (contoh: 081234567890)";
      }
  
      // Validasi STR dokter
      if (!formData.str_dokter?.trim()) {
          errors.str_dokter = "Nomor STR wajib diisi";
      } else if (formData.str_dokter.trim().length < 10) {
          errors.str_dokter = "Nomor STR minimal 10 karakter";
      } else if (!/^[0-9A-Za-z\/\-]+$/.test(formData.str_dokter)) {
          errors.str_dokter = "Format STR tidak valid";
      }
  
      // Validasi spesialis
      if (!formData.spesialis?.value) {
          errors.spesialis = "Spesialis dokter wajib dipilih";
      }
  
      // Validasi foto profil
      if (!formData.foto_profil_dokter) {
          errors.foto_profil_dokter = "Foto profil wajib diupload";
      } else {
          // Cek ukuran file
          if (formData.foto_profil_dokter.size > 20 * 1024 * 1024) {
              const sizeMB = Math.round(formData.foto_profil_dokter.size / (1024 * 1024));
              errors.foto_profil_dokter = `Ukuran gambar terlalu besar (${sizeMB}MB). Maksimal 20MB`;
          }
          
          // Cek tipe file
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
          if (!allowedTypes.includes(formData.foto_profil_dokter.type)) {
              errors.foto_profil_dokter = "Format file harus JPG, JPEG, atau PNG";
          }
      }
  
      return errors;
    };

    const checkDuplicateData = async () => {
      try {
          const token = localStorage.getItem("token");
          
          // Cek username duplikat
          const checkUsername = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/dokter/check-username/${formData.username_dokter}`,
              {
                  headers: { Authorization: `Bearer ${token}` }
              }
          );
          
          if (checkUsername.data.exists) {
              showErrorToast("Username sudah digunakan oleh dokter lain");
              return false;
          }
  
          // Cek email duplikat
          const checkEmail = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/dokter/check-email/${formData.email_dokter}`,
              {
                  headers: { Authorization: `Bearer ${token}` }
              }
          );
          
          if (checkEmail.data.exists) {
              showErrorToast("Email sudah digunakan oleh dokter lain");
              return false;
          }
  
          // Cek STR duplikat
          const checkSTR = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/dokter/check-str/${formData.str_dokter}`,
              {
                  headers: { Authorization: `Bearer ${token}` }
              }
          );
          
          if (checkSTR.data.exists) {
              showErrorToast("Nomor STR sudah terdaftar");
              return false;
          }
  
          return true;
      } catch (error) {
          console.error("Error checking duplicate data:", error);
          return true; // Lanjutkan jika gagal cek duplikasi
      }
    };
  


    // SUBMIT FORM TAMBAH DOKTER
    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          // Tampilkan error pertama
          const firstError = Object.values(validationErrors)[0];
          showErrorToast(`❗ ${firstError}`);
          
          // Atau tampilkan semua error
          // const errorList = Object.values(validationErrors).join('\n');
          showErrorToast(`❗ Mohon perbaiki error berikut:\n${errorList}`);
          
          return;
        }

        // 2. CEK DUPLIKASI DATA (OPSIONAL)
        if (typeof checkDuplicateData === 'function') {
          try {
              const isDuplicateValid = await checkDuplicateData();
              if (!isDuplicateValid) {
                  return;
              }
          } catch (error) {
              console.error("Error checking duplicate data:", error);
              showErrorToast("❗ Gagal memeriksa duplikasi data");
              return;
          }
        }

        try {

            const token = localStorage.getItem("token");
            const data = new FormData();

            data.append("foto", formData.foto_profil_dokter);

            const uploadRes = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/dokter/upload/admin`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            const imgPath = uploadRes.data.path;

            const dokterData = {
                nama_dokter: formData.nama_dokter,
                username_dokter: formData.username_dokter,
                email_dokter: formData.email_dokter,
                notlp_dokter:formData.notlp_dokter,
                foto_profil_dokter: imgPath,
                spesialis_dokter: formData.spesialis?.value||"",
                str_dokter: formData.str_dokter,
                password_dokter:formData.password_dokter
               
            };
            // console.log("inidokterr_baru",dokterData)
          

            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/dokter/create`,
                dokterData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            //console.log("Response:", res.data);
            if (onAddSuccess) {
                onAddSuccess(dokterData); // data dokter baru dari response
            }
            
            showSuccessToast("Berhasil menambah data dokter");
            onClose(false);
        } catch (error) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Error add data";

          console.error("Gagal menambah data dokter:", message);
          showErrorToast(message);
        }
    };

    
    //UPDATE UPLOAD GAMBAR
    const handleResetFile = () => {
        setFormData((prev) => ({
            ...prev,
            foto_profil_dokter: null,
        }));

        // Reset input file supaya UI input juga kosong
        const inputFile = document.getElementById("foto_profil_dokter");
        if (inputFile) inputFile.value = "";
    };



    // UPDATE DATA DOKTER

    const validateEditForm = () => {
      const errors = {};
      const fieldkosong = [];

      const requiredFields = [
        { key: 'nama_dokter', label: 'Nama Dokter' },
        { key: 'username_dokter', label: 'Username' },
        { key: 'email_dokter', label: 'Email' },
        { key: 'NIK', label: 'NIK' },
        { key: 'notlp_dokter', label: 'Nomor Telepon' },
        { key: 'alamat', label: 'Alamat' },
        { key: 'jeniskelamin_masyarakat', label: 'Jenis Kelamin' },
        { key: 'tanggalLahir', label: 'Tanggal Lahir' },
        { key: 'str_dokter', label: 'Nomor STR' }
      ];

      requiredFields.forEach(field => {
        if (!formData[field.key]?.toString().trim()) {
          fieldkosong.push(field.label);
        }
      });
    

      if (fieldkosong.length > 0) {
        return {
          isValid: false,
          errors: { general: 'Data tidak boleh kosong' },
          fieldkosong: fieldkosong
        };
      }

      
      // Validasi nama dokter
      if (!formData.nama_dokter?.trim()) {
          errors.nama_dokter = "Nama dokter wajib diisi";
      } else if (formData.nama_dokter.trim().length < 3) {
          errors.nama_dokter = "Nama dokter minimal 3 karakter";
      } else if (!/^[a-zA-Z\s.,-]+$/.test(formData.nama_dokter.trim())) {
          errors.nama_dokter = "Nama dokter hanya boleh berisi huruf, spasi, titik, koma, dan tanda hubung";
      } else if (formData.nama_dokter.trim().length > 100) {
          errors.nama_dokter = "Nama dokter maksimal 100 karakter";
      }
  
      // Validasi username
      if (!formData.username_dokter?.trim()) {
          errors.username_dokter = "Username wajib diisi";
      } else if (formData.username_dokter.trim().length < 4) {
          errors.username_dokter = "Username minimal 4 karakter";
      } else if (formData.username_dokter.trim().length > 50) {
          errors.username_dokter = "Username maksimal 50 karakter";
      } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.username_dokter.trim())) {
          errors.username_dokter = "Username hanya boleh berisi huruf, angka, titik, underscore, dan tanda hubung";
      }
  
      // Validasi email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email_dokter?.trim()) {
          errors.email_dokter = "Email wajib diisi";
      } else if (!emailRegex.test(formData.email_dokter.trim())) {
          errors.email_dokter = "Format email tidak valid";
      } else if (formData.email_dokter.trim().length > 100) {
          errors.email_dokter = "Email maksimal 100 karakter";
      }
  
      // Validasi nomor telepon Indonesia
      const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
      if (!formData.notlp_dokter?.trim()) {
          errors.notlp_dokter = "Nomor telepon wajib diisi";
      } else {
          const cleanPhone = formData.notlp_dokter.replace(/\s+/g, '');
          if (!phoneRegex.test(cleanPhone)) {
              errors.notlp_dokter = "Format nomor telepon tidak valid (contoh: 081234567890 atau +6281234567890)";
          }
      }
  
      // Validasi STR dokter
      if (!formData.str_dokter?.trim()) {
          errors.str_dokter = "Nomor STR wajib diisi";
      } else if (formData.str_dokter.trim().length < 10) {
          errors.str_dokter = "Nomor STR minimal 10 karakter";
      } else if (formData.str_dokter.trim().length > 50) {
          errors.str_dokter = "Nomor STR maksimal 50 karakter";
      }
  
      // Validasi spesialis
      if (!formData.spesialis?.value) {
          errors.spesialis = "Spesialis dokter wajib dipilih";
      }
  
      // Validasi foto profil (jika ada file baru)
      if (formData.foto_profil_dokter && formData.foto_profil_dokter instanceof File) {
          // Cek ukuran file (20MB)
          if (formData.foto_profil_dokter.size > 20 * 1024 * 1024) {
              const sizeMB = Math.round(formData.foto_profil_dokter.size / (1024 * 1024));
              errors.foto_profil_dokter = `Ukuran gambar terlalu besar (${sizeMB}MB). Maksimal 20MB`;
          }
          
          // Cek ukuran minimum (1KB)
          if (formData.foto_profil_dokter.size < 1024) {
              errors.foto_profil_dokter = "File gambar terlalu kecil. Minimal 1KB";
          }
          
          // Cek tipe file
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
          if (!allowedTypes.includes(formData.foto_profil_dokter.type)) {
              errors.foto_profil_dokter = "Format file harus JPG, JPEG, PNG, atau WEBP";
          }
      }
  
      return errors;
    };
    
    const checkDuplicateDataForEdit = async () => {
      try {
          const token = localStorage.getItem("token");
          
          if (!token) {
              throw new Error("Token tidak ditemukan");
          }
  
          // Cek username duplikat (kecuali milik dokter ini)
          try {
              const checkUsername = await axios.get(
                  `${import.meta.env.VITE_BASE_URL}/api/dokter/check-username/${encodeURIComponent(formData.username_dokter.trim())}?exclude_id=${idDokter}`,
                  {
                      headers: { Authorization: `Bearer ${token}` },
                      timeout: 10000
                  }
              );
              
              if (checkUsername.data.exists) {
                  showErrorToast("❗ Username sudah digunakan oleh dokter lain");
                  return false;
              }
          } catch (error) {
              if (error.response?.status !== 404) {
                  console.error("Error checking username:", error);
              }
          }
  
          // Cek email duplikat (kecuali milik dokter ini)
          try {
              const checkEmail = await axios.get(
                  `${import.meta.env.VITE_BASE_URL}/api/dokter/check-email/${encodeURIComponent(formData.email_dokter.trim())}?exclude_id=${idDokter}`,
                  {
                      headers: { Authorization: `Bearer ${token}` },
                      timeout: 10000
                  }
              );
              
              if (checkEmail.data.exists) {
                  showErrorToast("❗ Email sudah digunakan oleh dokter lain");
                  return false;
              }
          } catch (error) {
              if (error.response?.status !== 404) {
                  console.error("Error checking email:", error);
              }
          }
  
          // Cek STR duplikat (kecuali milik dokter ini)
          try {
              const checkSTR = await axios.get(
                  `${import.meta.env.VITE_BASE_URL}/api/dokter/check-str/${encodeURIComponent(formData.str_dokter.trim())}?exclude_id=${idDokter}`,
                  {
                      headers: { Authorization: `Bearer ${token}` },
                      timeout: 10000
                  }
              );
              
              if (checkSTR.data.exists) {
                  showErrorToast("❗ Nomor STR sudah terdaftar");
                  return false;
              }
          } catch (error) {
              if (error.response?.status !== 404) {
                  console.error("Error checking STR:", error);
              }
          }
  
          return true;
      } catch (error) {
          console.error("Error in checkDuplicateDataForEdit:", error);
          // Tidak memblokir proses jika pengecekan duplikasi gagal
          return true;
      }
    };
  
    // POST -- UPDATE DATA
    const handleEditSubmitDokter = async (e) => {
      const token = localStorage.getItem("token");
      e.preventDefault();

      const validationErrors = validateEditForm();
      if (Object.keys(validationErrors).length > 0) {
          const firstError = Object.values(validationErrors)[0];
          showErrorToast(`❗ ${firstError}`);
          return;
      }

       // 2. CEK DUPLIKASI DATA (jika fungsi tersedia)
      if (typeof checkDuplicateDataForEdit === 'function') {
          try {
              const isDuplicateValid = await checkDuplicateDataForEdit();
              if (!isDuplicateValid) {
                  return;
              }
          } catch (error) {
              console.error("Error checking duplicate data:", error);
              showErrorToast("❗ Gagal memeriksa duplikasi data");
              return;
          }
      }
      try {
        const token = localStorage.getItem("token");
        // Ambil path foto lama dari data yang sudah ada
        let imgPath = dataDokterbyId?.foto_profil_dokter || "";

        if (formData.foto_profil_dokter) {
          // ✅ VALIDASI UKURAN MAKSIMAL 2MB
          if (formData.foto_profil_dokter.size > 20 * 1024 * 1024) {
            const sizeMB = Math.round(formData.foto_profil_dokter.size / (1024 * 1024)); // Hitung ukuran dalam MB
            showErrorToast(` ❗Ukuran gambar terlalu besar (${sizeMB}MB). Maksimal 20MB.`);
            return;
          }
        }

        // Cek apakah ada file baru yang diupload (File object)
        if (
          formData.foto_profil_dokter &&
          formData.foto_profil_dokter instanceof File
        ) {
          const data = new FormData();
          data.append("foto", formData.foto_profil_dokter);

          const uploadRes = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/dokter/upload/admin`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          imgPath = uploadRes.data.path;
        }

        const dokterData = {
          nama_dokter: formData.nama_dokter,
          username_dokter: formData.username_dokter,
          email_dokter: formData.email_dokter,
          foto_profil_dokter: imgPath, // Pastikan ini selalu string
          spesialis_dokter: formData.spesialis?.value || "",
          str_dokter: formData.str_dokter,
          notlp_dokter: formData.notlp_dokter,
          // password_dokter: formData.password_dokter,
        };


        // Debug: tampilkan data yang akan diupdate
        // console.log("Data dokter yang akan diupdate:", dokterData);
        // console.log(
        //   "Type foto_profil_dokter:",
        //   typeof dokterData.foto_profil_dokter
        // );

        await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/dokter/update/${idDokter}`,
          dokterData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Jika ada callback onUpdateSuccess, panggil dengan data dokter yang sudah diupdate
        // if (onUpdateSuccess) {
        //   onUpdateSuccess(updateResponse.data.dokter || updateResponse.data.data || dokterData);
        // }
        showSuccessToast("Berhasil mengupdate data dokter");
        onClose(false);
      } catch (error) {
        const status = error.response?.status;
        let message =
          error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat mengubah data dokter.";

        if (status === 413) {
          message = "Ukuran file terlalu besar. Maksimal 2MB.";
        }

        console.error("Gagal update artikel:", message);
        showErrorToast(message); // <-- ini toast yang akan muncul
      }
    };

    const generatePassword = (length = 8) => {
      // set random karakter
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      console.log("👌generate password succes")
      return password;
    };

    const regeneratePassword = () => {
      const newPassword = generatePassword(8); // Perbaiki nama fungsi
      setFormData(prev => ({
        ...prev,
        password_dokter: newPassword,
        
      }));
      console.log("☑️regenerate password succes")
    };


    useEffect(() => {
        if (modalType === "tambahdatadokter") {
            setDataDokterbyId(null);
            const newPassword = generatePassword(8); 
            setFormData(prev => ({
                ...prev,
                password_dokter: newPassword
            }));
        }
    }, [modalType]); 




  return ({
    dataDokterbyId,
    formData,
    handleInputChange,
    handleEditSubmitDokter,
    handleChange,
    handleFileChange,
    handleSubmit,
    handleChangeSelect,
    handleResetFile,
    generatePassword,  
    regeneratePassword      
    
    }
  )
}
