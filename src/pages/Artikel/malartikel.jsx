import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Modal from "../../components/ModalTemplate";
import renderModalContent from "../../components/ModalContent";
import Basetable from "../../components/Table/Basetable";


import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Swal from "sweetalert2";

const handleDelete = () => {
  Swal.fire({
    title: "Yakin mau hapus?",
    text: "Data yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      // Lanjutkan proses delete
      Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
    }
  });
};



export default function Artikel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };
  
  const columns = [
  {
    accessorKey: "gambar_artikel",
    header: "Gambar",
    enableSorting: false,
    cell: ({ getValue }) => {
      const imageUrl = getValue();
      return (
        <img 
          src="foto"
          alt="Foto Dokter" 
          className="w-10 h-10 object-cover rounded-full" 
        />
      );} 
  },
  {
    accessorKey: "nama_artike",
    header: "Judul Artikel",
    enableSorting: false,
  },
  {
    accessorKey: "email_masyarakat",
    header: "Email",
    enableSorting: false,
  },
  {
    accessorKey: "tgl_terbit_artikel",
    header: "Tgl.Terbit",
    enableSorting: false,
  },
  {
    accessorKey: "kategori_artikel",
    header: "Kategori",
    enableSorting: false,
  },
  {
    accessorKey: "detail",
    header: "Detail",
    enableSorting: false,
    cell: ({ row }) => (
    <div className="flex gap-2 items-center bg-[#FAFBFD] p-2 rounded-xl border-1 border-[#979797]">
      <button onClick={() => handleEdit(row.original)} title="Edit">
        <FaEdit className="text-gray-600 hover:text-[#004A76] text-lg" />
      </button>
    </div>),
  },
  {
    accessorKey: "Action",
    header: "Aksi",
    enableSorting: false,
    cell: ({ row }) => (
    <div className="flex gap-2 items-center bg-[#FAFBFD] p-2 rounded-xl border-1 border-[#979797]">
      <button onClick={() => handleEdit(row.original)} title="Edit">
        <FaEdit className="text-gray-600 hover:text-[#004A76] text-lg" />
      </button>
    </div>),
  },]

  return (
    <div className="container flex flex-row h-screen bg-amber-500">
      <main className=' w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100 '>
    
        {/* navbar */}
        <div className="flex flex-row justify-between gap-10 p-2 px-6 w-full items-center">
          <div className=" text-xl font-bold">Artikel</div>
          <div className="flex flex-row gap-4 items-center">
            <div className=" flex items-center rounded-xl px-14 justify-start py-1 border-2 border-gray-300 gap-2">
              <IoIosSearch className="text-xl" />
              Cari artikel
            </div>
            <div>
              <FaUser className="text-[30px] item-center" />
            </div>
          </div>
        </div>

        <img src="line style.svg" alt="" />
        
        {/* choose */}
        <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
          <div className="flex flex-row gap-8 bg-slate-300 p-2 rounded-4xl items-center px-6">
            <div className="">Kategori : </div>
            <div className="bg-slate-300 rounded-4xl border-2 border-black px-4 py-1">
              Artikel Kesehatan
            </div>
            <div className="bg-slate-300 rounded-4xl border-2 border-black px-4 py-1">
              Artikel Obat
            </div>
          </div>
          <div className="">
            <button
              className=" bg-[#033E61] rounded-xl px-4 py-2 cursor-pointer text-white"
              onClick={() => openModal("tambahform")}
            >
              + Tambah Data Artikel
            </button>
          </div>
        </div>

        {/* main  */}
        <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4   overflow-x-hidden">
          {/* <Card className="h-full w-full overflow-scroll"> */}
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-slate-300 sticky top-0 z-10">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="p-4 border-b border-blue-gray-100 bg-slate-300"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {TABLE_ROWS.map(({ name, job, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {job}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {job}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        <Typography
                          as="button"
                          onClick={handleDelete}
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Hapus
                        </Typography>
                        <Typography
                          as="button"
                          onClick={() => openModal("editform")}
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Modal open={isModalOpen} onClose={closeModal}>
          {renderModalContent(modalType, closeModal)}
        </Modal>
     
      </main>
     
    </div>
  );
}
