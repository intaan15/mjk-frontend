import { useState,useEffect } from "react";
import axios from "axios";

// import Trash from "./icons/Trash";
import Modal from "../../components/ModalTemplate";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Card, Typography } from "@material-tailwind/react";
import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { TiUser } from 'react-icons/ti'
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




function Dokter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDropdown = () => {setIsOpen(!isOpen);};
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const TABLE_HEAD = [
    "Foto",
    "Nama Dokter",
    "Spesialis",
    "Kontak",
    "Detail",
    "Action",
  ];

  // useEffect(() => {
  //   axios.get(`https://mjk-backend-production.up.railway.app/api/dokter/getall`)
  //       .then((res) => {
  //         console.log(res.data);
  //         setData(filteredData);
  //       })
  //       .catch((err) => {
  //       console.error('Error fetching data:', err);
  //       });
  //   }, []);

    // useEffect(() => {
    //   console.log(filteredRows); // Ini untuk memeriksa apakah filteredRows berisi data
    // }, [filteredRows]);

  return (
    <div className="flex flex-rown">
      <main className="w-full md:5/6 flex flex-col pl-18 pr-5 gap-1 bg-gray-100">
        <div className="w-full  flex flex-col pt-4">
          {/* kanan */}
          <div className='flex items-end  justify-between'>
            <div className='text-[25px] font-[raleway] font-bold text-[#004A76]'> Data Dokter</div>
            <div className="text-2xl gap-12 flex items-center justify-end ">
                <div className=" mt-3 flex items-center rounded-[19px] px-14 justify-start py-1 border-[1.5px] border-gray-300 gap-2">
                <IoIosSearch className="text-gray-400"/>
                  <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-gray-700 text-sm outline-none bg-transparent"
                  />
                </div>
                <button onClick={toggleDropdown} className="items-center focus:outline-none cursor-pointer pt-3">
                  <TiUser className='w-[40px] h-[40px] text-[#292D32]'> </TiUser>
                  <div>
                      {isOpen && (
                      <div className="absolute right-3 w-44 origin-top-right mt-2 shadow-xl rounded-xl bg-white ring-1 ring-blue ring-opacity-3 z-50 ">
                          <div className="py-1">
                          <a href="#" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100 ">Administrator</a>
                          <a href="/" className="font-[raleway] block py-2 text-sm text-gray-700 hover:bg-gray-100"> Log Out</a>
                          </div>
                      </div>)}
                  </div>
                </button>
            </div>
          </div>
          
          {/* Garis biru */}
          <div className="w-[100%] h-1 bg-[#1177B3] mt-4 mb-4"></div>
        </div>


          {/* choose */}
          <div className="flex flex-row justify-between w-full  items-center px-10 py-2">
            <div className="flex flex-row gap-8 bg-gray-300 p-2 rounded-[25px] items-center px-6">
              <div className="bg-white p-3 rounded-full flex items-center justify-center">
                <FaUser className="text-[30px] item-center text-[#979797]" />
              </div>
              <div className="flex flex-col">
                <div className="font-[raleway] text-white font-bold text-[15px]">Jumlah Pengguna</div>
                <div className="font-[Nunito] text-white font-medium text-[15px]">{data.length}</div>
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
                {filteredRows.map(({ nama_dokter,username_dokter,spesialis_dokter, str_dokter,p_masyarakat}, index) => {
                  console.log({ foto_profil_dokter, username_dokter, email_masyarakat, notlp_masyarakat, nik_masyarakat }); 
                  const isLast = index === filteredRows.length - 1;
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
