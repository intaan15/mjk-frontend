import { useState } from "react";
// import Trash from "./icons/Trash";
import Modal from "../../components/ModalTemplate";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Card, Typography } from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import renderModalContent from "../../components/ModalContent";
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

const TABLE_HEAD = [
  "Image",
  "Nama Artikel",
  "Spesialis",
  "Tanggal",
  "Detail",
  "Action",
];

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
    <div className="flex flex-row w-full h-screen bg-white overflow-hidden">
      <main className="w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100">
        <div className="w-full  flex flex-col pt-4">
          {/* kanan */}
          <div className='flex items-end  justify-between'>
            <div className='text-xl font-bold text-[#025F96]'> Data Dokter</div>
            <div className="text-2xl gap-12 flex items-center justify-end ">
                <div className=" mt-3 flex items-center rounded-[19px] px-14 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
                <IoIosSearch className="text-gray-400 " />
                <p className="text-gray-400 text-[14px]">Cari nama dokter</p>
                </div>
                <div className="mt-3">
                <FaUser className="text-[30px] item-center text-[#292D32]" />
                </div>
            </div>
          </div>
          
          {/* Garis biru */}
          <div className="w-[100%] h-1 bg-[#1177B3] mt-4 mb-4"></div>
        </div>


          {/* choose */}
          <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
            <div className="flex flex-row gap-8 bg-gray-300 p-2 rounded-[25px] items-center px-6">
              <div className="">
                <FaUser className="text-[30px] item-center" />
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-[15px]">Jumlah Dokter</div>
                <div className="font-bold text-[15px]">20 orang</div>
              </div>
            </div>
            <div className="">
              <button
                className=" bg-[#033E61] rounded-[25px] px-4 py-2 cursor-pointer text-white text-[15px]"
                onClick={() => openModal("tambahform")}
              >
                + Tambah Data Dokter
              </button>
            </div>
          </div>

          {/* main  */}
          <div className="border-2 border-gray-300 rounded-xl h-auto w-full mt-4 overflow-x-hidden">
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
      </main>

    </div>
  );
}

export default Dokter;
