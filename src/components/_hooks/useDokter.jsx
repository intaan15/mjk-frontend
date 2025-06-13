import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '../Modal/ToastModal';
import { rating } from '@material-tailwind/react';
import.meta.env.VITE_BASE_URL

export default function useDokter ({idDokter,token,onClose,onAddSuccess}) {
    // console.log("idDokter:", idDokter);
    // console.log("token:", token);
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
    
    //console.log(formData)
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
            // console.log("Response:", res.data);
            if (onAddSuccess) {
                onAddSuccess(dokterData); // data dokter baru dari response
            }
            showSuccessToast("Berhasil menambah data dokter");
            onClose();
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
      e.preventDefault();
      try {
        // Ambil path foto lama dari data yang sudah ada
        let imgPath = dataDokterbyId?.foto_profil_dokter || "";

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
          password_dokter: formData.password_dokter,
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

        showSuccessToast("Berhasil mengupdate data dokter");
        onClose();
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Error updating data";

        console.error("Gagal update dokter:", message);
        showErrorToast(message);
      }
    //   {
    //     console.error(
    //       "Error updating data:",
    //       error.response?.data || error.message || error
    //     );
    //     showErrorToast("Gagal mengupdate data dokter");
    //   }
    };




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
    
    }
  )
}
