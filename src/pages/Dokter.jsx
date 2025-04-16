import { useState } from "react";
// import Trash from "./icons/Trash";
import Modal from "../components/ModalTemplate";
import Sidebar from "../components/Sidebar/Sidebar";
import { Card, Typography } from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import renderModalContent  from "../components/ModalContent";
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


const TABLE_HEAD = ["Image", "Nama Artikel", "Spesialis","Tanggal", "Detail", "Action"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

function Dokter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    
  
    const openModal = (type) => {
      setModalType(type);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setModalType("");
    };
  return (
    <div className="w-screen h-screen flex flex-row bg-white">
      {/* kiri */}
      <div className="w-1/6 bg-blue-200">
        <Sidebar />
      </div>
      {/* kanan */}
      <div className="  w-5/6 h-screen flex flex-col p-4 overflow-x-hidden">
        {/* navbar */}
        <div className="flex flex-row justify-between gap-10 p-2 px-6 w-full items-center">
          <div className=" text-xl font-bold">Dokter</div>
          <div className="flex flex-row gap-4 items-center">
            <div className=" flex items-center rounded-xl px-14 justify-start py-1 border-2 border-gray-300 gap-2">
              <IoIosSearch className="text-xl" />
              Cari Data Dokter
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
            <div className="">
              <FaUser className="text-[30px] item-center" />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-[15px]">
                Jumlah Dokter
              </div>
              <div className="font-bold text-[15px]">
                20 orang
              </div>
            </div>
          </div>
          <div className="">
            <button
              className=" bg-[#033E61] rounded-xl px-4 py-2 cursor-pointer text-white"
              onClick={() => openModal("tambahform")}
            >
              + Tambah Data Artikell
            </button>
          </div>
        </div>

        {/* main  */}
        <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 ">
          {/* <Card className="h-full w-full overflow-scroll"> */}
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                          onClick={() => openModal("detailprofildokter")}
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Detail
                        </Typography>
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
      </div>
    </div>
  );
}

export default Dokter