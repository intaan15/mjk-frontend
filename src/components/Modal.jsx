import React from 'react'

function Modal() {
  return (
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
    )
}

export default Modal