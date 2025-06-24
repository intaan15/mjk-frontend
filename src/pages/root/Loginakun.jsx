import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { HiEye, HiEyeOff, HiOutlineRefresh } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { FaSpinner } from 'react-icons/fa';
import { motion } from "framer-motion";
import.meta.env.VITE_BASE_URL
import "../../index.css";
import useLogin from "../../components/_hooksPages/useLogin";


function Loginakun() {
 const {
    // State
    showPassword,
    captcha,
    text,
    valid,
    username,
    password,
    loginError,
    loading,
    
    // State setters
    setText,
    setUsername,
    setPassword,
    setValid,
    
    // Functions
    togglePassword,
    fetchCaptcha,
    handleSubmit,
  } = useLogin();
  const navigate = useNavigate();
  
  


  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-6 bg-gray-50">
      
      <div className="bg-[#025F96]/10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 rounded-[10px] w-xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-lg">
      
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-5">
          <img
            src="/Logo Mojokerto Sehat.svg"
            alt="Logo"
            className="w-[200px]"
          />
          <p className="font-[raleway] font-extrabold text-[#025F96] text-[20px]">
            MOJOKERTO SEHAT
          </p>
          <p className="text-[#438222] italic text-[10px]">
            by DinKes Kab.Mojokerto
          </p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">

          {/* Username */}
          <div className="relative">
            <VscAccount className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 pr-10 h-[40px] w-full border rounded-md text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 text-sm" 
              style={{ fontFamily: "Nunito Sans" }}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <TbLockPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-[40px] w-full border rounded-md text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 text-sm" 
              style={{ fontFamily: "Nunito Sans" }}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? (
                <HiEye className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <HiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>

          {/* Captcha */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          
            {/* Captcha Display and Refresh Button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-white px-2 sm:px-3 md:px-4 py-2 rounded text-sm sm:text-lg md:text-xl font-[Nunito] font-bold tracking-widest min-w-0 overflow-hidden flex-1 sm:w-32 md:w-40 lg:w-48">
                <div className="break-all">{captcha}</div>
              </div>
              <button
                type="button"
                className="bg-[#004A76] text-white px-2 sm:px-3 py-2  border rounded shadow-sm focus:ring-2 hover:bg-[#003252] focus:ring-blue-100  flex-shrink-0"
                onClick={fetchCaptcha}
              >
                <HiOutlineRefresh className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            {/* Captcha Input */}
            <input
              type="text"
              placeholder="Masukkan captcha"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setValid(false)}
              className={`pl-3 pr-3 h-[36px] sm:h-[40px] w-full border rounded-md text-gray-700 shadow-sm text-xs sm:text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none ${
                valid ? "border-red-500" : ""
              }`}
              style={{ fontFamily: "Nunito Sans" }}
            />
          </div>

          {/* Error Message */}
          {valid && (
            <p className="text-red-500 text-sm">Captcha tidak sesuai</p>
          )}
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          {/* Submit */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-[#004A76] text-white w-full h-[48px] rounded font-raleway font-semibold transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#003252]"
            }`}>
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Loading...
              </>
            ) : (
              "Masuk"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default Loginakun;
