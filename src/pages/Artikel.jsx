import { useState } from "react";
// import Trash from "./icons/Trash";
import Modal1 from "../components/Modal1";
import Sidebar from "../components/Sidebar/Sidebar";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Image", "Nama Artikel", "Tanggal", "Detail", "Action"];

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
];


export default function Artikel() {
  const [open, setOpen] = useState(false);
  return (
    <div className="container flex flex-row w-screen h-screen justify-center items-center  bg-[#F2F2F2]">
      {/* kiri */}
      <div className=" w-1/6 bg-blue-200">
        <Sidebar />
      </div>

      {/* kanan  */}
      <div className=" bg-red-200 w-5/6 h-screen flex flex-col p-4">
        {/* navbar */}
        <div className="flex flex-row bg-yellow-200 justify-end gap-10 p-2 px-6 w-full">
          <div className=" bg-red-500 ">search</div>
          <div className=" bg-green-300">profil</div>
        </div>

        <div className=" bg-black h-[2px] w-full" />

        {/* choose */}
        <div className="flex flex-row justify-between w-full bg-blue-400 items-center px-10">
          <div className="flex flex-row gap-5 bg-slate-300 p-2 rounded-2xl">
            <div className="">Kategori : </div>
            <div className="">Artikel Kesehatan</div>
            <div className="">Artikel Obat</div>
          </div>
          <div className="">
            <button
              className=" bg-red-600 rounded-xl px-4 py-2 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              + Tambah Data Artikel
            </button>
          </div>
        </div>

        {/* main  */}
        <div className="">
          <Card className="h-full w-full overflow-scroll">
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
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>

        <Modal1 open={open} onClose={() => setOpen(false)}>
          <div className="text-start w-full ">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold">Tambah Artikel</h1>
            <div className=" flex-1 flex-row">
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Judul
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
                  Foto Artikel
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

                  <button className=" px-4 py-2 bg-red-200 rounded-xl cursor-pointer">
                    change
                  </button>
                </div>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Kategori
                </label>

                <form class="w-4/5">
                  <label
                    for="kategori"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  ></label>
                  <select
                    id="kategori"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Pilih Katergori</option>
                    <option value="US">Kesehatan</option>
                    <option value="CA">Obat</option>
                  </select>
                </form>
              </div>
              <div className=" flex flex-column h-auto w-full justify-center items-center gap-10 mt-8">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black w-1/5"
                >
                  Deskripsi
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
              <button className="px-4 py-2 bg-red-200 rounded-xl cursor-pointer mt-5">
                Save change
              </button>
            </div>
          </div>
        </Modal1>
      </div>
    </div>
  );
}
