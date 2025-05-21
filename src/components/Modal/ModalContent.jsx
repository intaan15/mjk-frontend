import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";


export default function ModalContent({ modalType, onClose, data, idArtikel,idMasyarakat }) {
  const token = localStorage.getItem("token");
  const [dataArtikel, setDataArtikel] = useState(null);
  const [dataMasyarakat, setDataMasyarakat] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // toggle supaya efek rerender atau refetch data jalan
  };

  // GET DATA MASYARAKAT
  useEffect(() => {
    if (!idMasyarakat) return;

    const fetchDataMasyarakat = async () => {
      try {
        const response = await axios.get(
          `https://mjk-backend-production.up.railway.app/api/masyarakat/getbyid/${idMasyarakat}`
        );
        const filteredData = res.data.filter(
          (item) => item.verifikasi_akun_masyarakat === "diterima"
        );
        setDataMasyarakat(filteredData);
        console.log("Data masyarakat:", response.data);
      } catch (err) {
        console.error("Error fetching masyarakat:", err);
      }
    };

    fetchDataMasyarakat();
  }, [idMasyarakat]);

  // GET DATA ARTIKEL
  useEffect(() => {
    // Debug: pastikan props valid
    console.log("Fetching artikel...", { idArtikel, token });

    if (!idArtikel || !token) {
      console.error("Tidak bisa fetch: idArtikel/token tidak ada");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mjk-backend-production.up.railway.app/api/artikel/getbyid/${idArtikel}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Data diterima:", response.data);
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
  }, [idArtikel, token]); // Pastikan dependency lengkap

  // TAMBAH DATAAAA
  const [formData, setFormData] = useState({
    judul: "",
    tanggalTerbit: "",
    foto: null,
    kategori: "",
    deskripsi: "",
  });

  // Handle input teks dan select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      foto: e.target.files[0], // simpan file object
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
        "https://mjk-backend-production.up.railway.app/api/artikel/upload",
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
        nama_artikel: formData.judul,
        tgl_terbit_artikel: formData.tanggalTerbit,
        kategori_artikel: formData.kategori,
        detail_artikel: formData.deskripsi,
        gambar_artikel: imagePath,
      };

      const res = await axios.post(
        "https://mjk-backend-production.up.railway.app/api/artikel/create",
        artikelData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Artikel berhasil dibuat!");
      // onRefresh();
      onClose(false);
    } catch (error) {
      console.error(
        "Gagal buat artikel:",
        error.response?.data || error.message
      );
      alert("Gagal membuat artikel.");
    }
  };

  // UPDATE DATAAA ARTIKEL
  useEffect(() => {
    if (!dataArtikel) return;

    console.log("Data artikel diterima:", dataArtikel); // Debug

    setFormData({
      judul: dataArtikel.nama_artikel || "",
      tanggalTerbit: dataArtikel.tgl_terbit_artikel
        ? new Date(dataArtikel.tgl_terbit_artikel).toISOString().split("T")[0]
        : "",
      foto: null,
      kategori: dataArtikel.kategori_artikel || "",
      deskripsi: dataArtikel.detail_artikel || "",
    });
  }, [dataArtikel]);
  console.log("Form data:", formData);

  console.log("Artikel yang diterima:", dataArtikel);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      let imagePath = dataArtikel?.gambar_artikel || null; // <-- pakai optional chaining

      if (formData.foto) {
        const data = new FormData();
        data.append("foto", formData.foto);

        const uploadRes = await axios.post(
          "https://mjk-backend-production.up.railway.app/api/artikel/upload",
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
        nama_artikel: formData.judul,
        tgl_terbit_artikel: formData.tanggalTerbit,
        kategori_artikel: formData.kategori,
        detail_artikel: formData.deskripsi,
        gambar_artikel: imagePath,
      };

      await axios.patch(
        `https://mjk-backend-production.up.railway.app/api/artikel/update/${idArtikel}`,
        artikelData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Artikel berhasil diubah!");
      onClose(false);
    } catch (error) {
      console.error(
        "Gagal update artikel:",
        error.response?.data || error.message
      );
      alert("Gagal mengubah artikel.");
    }
  };

  switch (modalType) {
    // ARTIKEL
    case "editdataartikel":
      return (
        <>
          <div className="text-start w-full">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold">Edit Artikel</h1>

            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col gap-6 mt-4"
            >
              {/* Judul */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="judul"
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Judul
                </label>
                <textarea
                  id="judul"
                  name="judul"
                  rows="1"
                  className="w-4/5 p-2 border rounded"
                  placeholder="judul artikel"
                  value={formData.judul}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Tanggal Terbit */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="tanggalTerbit"
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Tanggal Terbit
                </label>
                <input
                  type="date"
                  id="tanggalTerbit"
                  name="tanggalTerbit"
                  value={formData.tanggalTerbit}
                  onChange={handleChange}
                  className="w-4/5 p-2 border rounded"
                  required
                />
              </div>

              {/* Foto Artikel */}
              <div className="flex items-start gap-4">
                <label
                  htmlFor="dropzone-file"
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Foto Artikel
                </label>
                <div className="flex flex-col w-4/5 gap-2">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-white dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>

                  {/* Preview gambar yang dipilih */}
                  {formData.foto ? (
                    <img
                      src={URL.createObjectURL(formData.foto)}
                      alt="preview"
                      className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                    />
                  ) : dataArtikel?.gambar_artikel ? ( // <-- tambahkan tanda tanya (optional chaining)
                    <img
                      src={dataArtikel.gambar_artikel}
                      alt="foto artikel lama"
                      className="w-[200px] h-[100px] object-cover rounded-xl border border-black"
                    />
                  ) : null}
                </div>
              </div>

              {/* Kategori */}
              <div className="flex items-center gap-4">
                <label
                  htmlFor="kategori"
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Kategori
                </label>
                <select
                  id="kategori"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="w-4/5 p-2 border rounded"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="kesehatan">Kesehatan</option>
                  <option value="obat">Obat</option>
                </select>
              </div>

              {/* Deskripsi */}
              <div className="flex items-start gap-4">
                <label
                  htmlFor="deskripsi"
                  className="block w-1/5 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  rows="4"
                  className="w-4/5 p-2 border rounded"
                  placeholder="Deskripsi artikel"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Tombol Submit */}
              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-200 rounded-xl cursor-pointer"
                >
                  Save change
                </button>
              </div>
            </form>
          </div>
        </>
      );

    case "detailartikel":
      return (
        <>
          <div className="text-start w-full ">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold">Detail Artikel</h1>
            <div className="flex-1 flex-row">
              <div className="flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Judul
                </label>
                <div className="w-4/5">
                  <div className="flex items-center w-full">
                    : {dataArtikel?.nama_artikel || "-"}
                  </div>
                </div>
              </div>

              <div className="flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Tanggal Terbit
                </label>
                <div className="w-4/5">
                  <div className="flex items-center w-full">
                    :{" "}
                    {dataArtikel?.tgl_terbit_artikel
                      ? new Date(
                          dataArtikel.tgl_terbit_artikel
                        ).toLocaleDateString()
                      : "-"}
                  </div>
                </div>
              </div>

              <div className="flex flex-column w-full justify-center items-start gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Foto Artikel
                </label>
                <div className="flex flex-col h-auto w-4/5 justify-center items-start gap-2">
                  <div className="flex w-full">
                    :
                    <img
                      src={dataArtikel?.gambar_artikel || null}
                      alt="foto artikel"
                      className="ml-2 border border-black w-[200px] h-[100px] object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Kategori
                </label>
                <div className="w-4/5">
                  <div className="flex items-center w-full">
                    : {dataArtikel?.kategori_artikel || "-"}
                  </div>
                </div>
              </div>

              <div className="flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5">
                  Deskripsi
                </label>
                <div className="w-4/5">
                  <div className="flex items-center w-full">
                    : {dataArtikel?.detail_artikel || "-"}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="px-4 py-2 bg-red-200 rounded-xl cursor-pointer mt-5">
                Save change
              </button>
            </div>
          </div>
        </>
      );

    case "tambahartikel":
      return (
        <>
          <div className="text-start w-full relative">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-xl font-[raleway] text-[#004A76] underline font-extrabold mb-6">
              Tambah Data Artikel
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="judul"
                  className="w-1/5 font-medium text-black font-[raleway] dark:text-black"
                >
                  Judul
                </label>
                <textarea
                  id="judul"
                  name="judul"
                  rows={1}
                  className="block p-2.5 w-4/5 text-sm  italic text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan Judul Artikel"
                  value={formData.judul}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <label
                  htmlFor="tanggalTerbit"
                  className="w-1/5 font-medium font-[raleway] text-gray-900 dark:text-black"
                >
                  Tanggal Penerbitan
                </label>
                <DatePicker
                  selected={
                    formData.tanggalTerbit
                      ? new Date(formData.tanggalTerbit)
                      : null
                  }
                  onChange={(date) =>
                    handleChange({
                      target: {
                        name: "tanggalTerbit",
                        value: date.toISOString().split("T")[0],
                      },
                    })
                  }
                  dateFormat="yyyy-MM-dd"
                  className="block p-2.5 w-5/5 text-sm text-gray-900 bg-gray-50 italic rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholderText="Tanggal penerbitan artikel"
                  value={formData.tanggalTerbit}
                  required
                />
                <IoCalendarOutline className="text-2xl text-[" />
              </div>

              <div className="flex items-center gap-4">
                <label
                  htmlFor="foto"
                  className="w-1/5 font-medium text-gray-900 dark:text-black  style={{ font-family: 'Nunito Sans' }}"
                >
                  Sampul Artikel
                </label>
                <div className="w-4/5">
                  <label
                    htmlFor="foto"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="foto"
                      name="foto"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  <div className="font-light text-[14px] self-start text-lime-500">
                    {formData.foto
                      ? formData.foto.name
                      : "Belum ada file yang dipilih"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label
                  htmlFor="kategori"
                  className="w-1/5 font-medium text-gray-900 dark:text-black"
                >
                  Kategori
                </label>
                <select
                  id="kategori"
                  name="kategori"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-4/5 p-2.5"
                  value={formData.kategori}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Obat">Obat</option>
                </select>
              </div>

              <div className="flex items-start gap-4">
                <label
                  htmlFor="deskripsi"
                  className="w-1/5 font-medium text-gray-900 dark:text-black"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  rows={4}
                  className="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Deskripsi artikel"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-200 rounded-xl cursor-pointer mt-5"
                >
                  Save change
                </button>
              </div>
            </form>
          </div>
        </>
      );

    // MODAL MASAYARAKAT
    case "detailprofilmasyarakat":
      console.log("Data di modal:", dataMasyarakat);
      return (
        <>
          <div className="text-start fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center ">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold">Profil Masyarakat</h1>

            <div className="flex flex-col justify-center items-center gap-4">
              <div className="bg-red-500 rounded-full p-12">foto</div>
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div>
                  <div className="text-[#025F96]">Nama</div>
                  <div>{dataMasyarakat.nama_masyarakat || " "}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">User</div>
                  <div>{dataMasyarakat.username_masyarakat || " "}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Email</div>
                  <div>{dataMasyarakat.email_masyarakat || " "}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">NIK</div>
                  <div>{dataMasyarakat.nik_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Alamat</div>
                  <div>{dataMasyarakat.alamat_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Nomor Telepon</div>
                  <div>{dataMasyarakat.notlp_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Jenis Kelamin</div>
                  <div>{dataMasyarakat.jeniskelamin_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Tanggal Lahir</div>
                  <div>{dataMasyarakat.tgl_lahir_masyarakat?.slice(0, 10)}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Foto KTP</div>
                  <div className=" bg-orange-200 h-50 rounded-xl">isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Selfie dengan KTP</div>
                  <div className="bg-orange-200 h-50 rounded-xl">isinama</div>
                </div>
              </div>
            </div>
            <div className=" text-center">
              <button
                className="px-4 py-2 bg-[#1177B3] text-white rounded-xl cursor-pointer mt-5"
                onClick={() => onClose(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </>
      );

    case "formeditmasyarakat":
      return (
        <>
          <div className="text-start ">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold">Profil Masyarakat</h1>

            <div className="flex flex-col justify-center items-center gap-4">
              <div className="bg-red-200 rounded-full p-12">foto</div>
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div>
                  <div className="text-[#025F96]">Nama</div>
                  <div>{data.nama_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Username</div>
                  <div>{data.username_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Email</div>
                  <div>{data.email_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">NIK</div>
                  <div>{data.nik_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Alamat</div>
                  <div>{data.alamat_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Nomor Telepon</div>
                  <div>{data.notlp_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Jenis Kelamin</div>
                  <div>{data.jeniskelamin_masyarakat}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Tanggal Lahir</div>
                  <div>{data.tgl_lahir_masyarakat?.slice(0, 10)}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Foto KTP</div>
                  <div className=" bg-orange-200 h-50 rounded-xl">isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Selfie dengan KTP</div>
                  <div className="bg-orange-200 h-50 rounded-xl">isinama</div>
                </div>
              </div>
            </div>

            <div className=" text-center">
              <button
                className="px-4 py-2 bg-[#1177B3] text-white rounded-xl cursor-pointer mt-5
                onClick={() => setShowModal(false)}
                "
              >
                Tutup
              </button>
            </div>
          </div>
        </>
      );

    // DOKTER
    case "tambahform":
      return (
        <>
          <div className="text-start w-full ">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold">Tambah Data Dokter</h1>
            <div className=" flex-1 flex-row">
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Nama
                </label>
                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full h-12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column w-full justify-center items-start gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Foto Profil
                </label>

                <div className=" flex flex-col h-auto w-4/5 justify-center items-start gap-2">
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-white hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-white"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                  </div>

                  <button className=" px-4 py-2 border-2 border-gray-200 rounded-xl cursor-pointer text-[#0c4a6e] hover:bg-[#004A76] hover:text-white">
                    Cancel
                  </button>
                </div>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Spesialis
                </label>

                <form class="w-4/5">
                  <label
                    for="Spesialis"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  ></label>
                  <select
                    id="Spesialis"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Buka Spesialis</option>
                    <option>Jantung</option>
                    <option>Mata</option>
                    <option>Mata</option>
                    <option>Mata</option>
                    <option>Mata</option>
                    <option>Mata</option>
                  </select>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Email
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  No. Handphone
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  No. STR
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Username
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Password
                </label>

                <form class="w-4/5">
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </form>
              </div>
            </div>
            <div className=" text-center">
              <button className="px-4 py-2 bg-[#004A76] text-white rounded-xl cursor-pointer mt-5">
                Tambah Data
              </button>
            </div>
          </div>
        </>
      );

    case "detailprofildokter":
      return (
        <>
          <detailprofildokter data={data} onClose={onClose} />
          <div className="">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <p className="text-center text-xl font-bold items-center py-2">
              Detail Profil Dokter
            </p>

            <div className="flex flex-col justify-center items-center gap-4">
              <div className="bg-red-200 rounded-full p-12">foto</div>
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div>
                  <div className="text-[#025F96]">Nama</div>
                  <div>{data.nama_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Username</div>
                  <div>{data.username_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Email</div>
                  <div>isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">NIK</div>
                  <div>isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Bidang Dokter</div>
                  <div>{data.spesialis_dokter}</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Nomor Telepon</div>
                  <div>09876543234567</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Jenis Kelamin</div>
                  <div>Perempuan</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Tanggal Lahir</div>
                  <div>isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Nomor.STR Kedokteran</div>
                  <div>isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Alamat</div>
                  <div>isinama</div>
                </div>
              </div>
            </div>
          </div>
        </>
      );

    default:
      return null;
  }
}
