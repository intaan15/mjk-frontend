<div className="flex flex-row ">
      {/* navbar */}
      <main className="flex flex-col pl-8 pr-2 gap-1 bg-gray-500 ">
        <div className="flex flex-row grid-2 items-center justify-between  pt-2">
          <p className="text-3xl font-[Nunito Sans] font-bold text-[#004A76]">
            Dashboard
          </p>
           <button
                        onClick= {toggleDropdown}
                        className="flex items-center space-x-2 focus:outline-none cursor-pointer">
                          <TiUser className="w-[40px] h-[40px] text-[#292D32]"> </TiUser>
                          <div>
                            {isOpen && (
                              <div className="absolute  mt-2 w-44 origin-top-right rounded-xl shadow-lg bg-[#FFFFFF] ring-opacity-3 z-50 ">
                                <div className="py-1 items-center justify-center">
                                  <a
                                    href="#"
                                    className="flex flex-row py-2 text-xl font-bold text-[#004A76] gap-3">
                                    <HiOutlineUser className='text-[30px]' />
                                    Administrator{" "}
                                  </a>
                                  <a
                                    href="#"
                                    onClick={handleLogout}
                                    className="flex flex-row py-2 text-xl text-[#004A76] hover:bg-gray-100 gap-3">
                                    <IoLogOutOutline className='text-[30px]' />
                                    {" "}
                                    Log Out
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                      </button>
        </div>
        <img src="line style.svg" alt="" />

        {/* col 1 */}
        <div className="flex flex-row pl-1">
          <div className="">
            <div className="font-bold text-white pl-3 flex absolute flex-col pt-5  gap-16   ">
              <div className="justify-center items-center pt-2 ">
                <Calendar 
                className="w-5 h-5" 
                onChange={(date) => setSelectedDate(date)} 
                value={selectedDate}/>
                
              </div>
              <div className="items-end relative ">
                <h2 className="font-[raleway] text-[28px] font-bold text-white">
                  Hi, Admin
                </h2>
                <p className="font-[Nunito Sans] italic text-[20px] text-white font-medium ">
                  Selamat datang di Website Mojokerto Sehat
                </p>
              </div>
            </div>
            {/* <img src="img_org.svg" alt="" className="" /> */}
          </div>
        </div>

        {/* tengah/col2 */}
        <div className="bg-[#004A76] h-20  md:min-h-auto min-h-screen rounded-xl flex flex-row justify-center items-center shadow-md">
          <StatBox
            icon={
              <BsFillBarChartFill className="w-[30px] h-[30px] text-white font-[Nunito Sans]" />
            }
            title="Jumlah Pengguna"
            value={stats.jumlahPengguna}
          />
          <StatBox
            icon={<GrArticle className="w-[30px] h-[30px] text-white" />}
            title="Artikel Publish"
            value={stats.artikelPublish}
          />
          <StatBox
            icon={<FaUserClock className="w-[30px] h-[30px] text-white" />}
            title="Verifikasi Pengguna"
            value={stats.filteredData}
          />
        </div>

        {/* col 3 */}
        <div className="md:w-full h-auto rounded-3xl flex flex-col gap-3">
          <div>
            <p className="font-[Nunito Sans] text-2xl font-bold pl-5  text-[#025f96] justify-between ">
              Log Aktivitas Pengguna{" "}
            </p>
          </div>

           <div className="flex flex-row gird-rows-2 md:w-full gap-8 ">
            <div className="rounded-xl flex flex-row justify-center items-center lg:h-auto">
              <div className="flex flex-row ">
                <div className="grid grid-cols-2 gap-1 bg-[#D9D9D9] h-auto md:w-sm justify-center  rounded-xl p-4">
                  <div>
                    <h3 className="font-bold text-[16px] text-black underline">
                      Konsultasi
                    </h3>
                    <p className="text-[15px] text-black">{jumlahKonsultasi}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-black underline">
                      Akun Baru
                    </h3>
                    <p className="text-[15px] text-black">{stats.filteredData}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-black underline">
                      Dokter Aktif
                    </h3>
                    <p className="text-[15px] text-black">35 Akun Dokter</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-black underline">
                      Artikel Hari Ini
                    </h3>
                    <p className="text-[15px] text-black">{stats.artikelHariIni}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#D9D9D9] w-[2xl rounded-xl flex flex-row justify-center items-center">
              <Bar />
              <div>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="inline-block w-3 h-3 rounded-full bg-pink-400 mr-2"></span>
                    Konsultasi ({jumlahKonsultasi})
                  </p>
                  <p>
                    <span className="inline-block w-3 h-3 rounded-full bg-teal-400 mr-2"></span>
                    Masyarakat ({stats.filteredData})
                  </p>
                  <p>
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                    Dokter (150)
                  </p>
                  <p>
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                    Artikel ({stats.artikelHariIni})
                  </p>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </main>*/}
    </div>
  );
}