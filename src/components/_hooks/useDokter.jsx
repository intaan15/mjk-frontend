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
    
            //console.log("Data diterima:", response.data);
            setDataDokterbyId(response.data);
            console.log("Data dokter by ID:", response.data);
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

      console.log("Data dokter diterima:", dataDokterbyId);

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
    
    console.log(formData)
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

    // SUBMIT FORM TAMBAH DOKTER
    const handleSubmit = async (e) => {
        e.preventDefault();

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
            console.log("Response:", res.data);
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


    //UPDATE DATA
    const handleEditSubmitDokter = async (e) => {
      const token = localStorage.getItem("token");
      e.preventDefault();
      try {
        // Ambil path foto lama dari data yang sudah ada
        let imgPath = dataDokterbyId?.foto_profil_dokter || "";

        if (formData.foto_profil_dokter) {
          // ✅ VALIDASI UKURAN MAKSIMAL 2MB
          if (formData.foto_profil_dokter.size > 2 * 1024 * 1024) {
            showErrorToast(`Ukuran gambar terlalu besar (${(file.size / 1024 / 1024).toFixed(2)}MB). Maksimal 2MB.`);
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

        console.log("Data dokter yang akan diupdate:", dokterData);
        console.log(
          "Type foto_profil_dokter:",
          typeof dokterData.foto_profil_dokter
        );

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

        // if (onUpdateSuccess) {
        //   onUpdateSuccess(dokterData); // Kirim data terbaru ke parent
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
