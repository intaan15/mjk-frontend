import React from "react";

export default function renderModalContent(modalType, onClose) {
  const setOpen = () => {
    onClose(false);
  };
  switch (modalType) {
    case "tambahform":
      return (
        <>
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
                    <option value="kesehatan">Kesehatan</option>
                    <option value="obat">Obat</option>
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
        </>
      );

    case "editform":
      return (
        <>
          <div className="text-start w-full ">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold">Edit Artikel</h1>
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
                    <option value="kesehatan">Kesehatan</option>
                    <option value="obat">Obat</option>
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
        </>
      );

    case "detailprofildokter":
      return (
        <>
          <div className="text-start ">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold">Detail Profil Dokter</h1>

            <div className="flex flex-col justify-center items-center gap-4">
              <div className="bg-red-200 rounded-full p-12">foto</div>
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div>
                  <div className="text-[#025F96]">Nama</div>
                  <div>isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Username</div>
                  <div>isinama</div>
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
                  <div>isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Nomor Telepon</div>
                  <div>isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Jenis Kelamin</div>
                  <div>isinama</div>
                </div>
                <div>
                  <div className="text-[#025F96]">Tanggal Lahir</div>
                  <div>isinama</div>
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
              <button className="px-4 py-2 bg-red-200 rounded-xl cursor-pointer mt-5">
                Save change
              </button>
            </div>
          </div>
        </>
      );

    default:
      return null;
  }
}
