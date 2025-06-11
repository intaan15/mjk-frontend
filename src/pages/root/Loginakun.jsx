import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { HiEye, HiEyeOff, HiOutlineRefresh } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { FaSpinner } from 'react-icons/fa';
import { motion } from "framer-motion";
import axios from "axios";
import.meta.env.VITE_BASE_URL
import "../../index.css";


function Loginakun() {
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [text, setText] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const togglePassword = () => setShowPassword((prev) => !prev);

  const fetchCaptcha = async () => {
    try {
      // console.log("API URL:",import.meta.env.VITE_BASE_URL);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/captcha/captcha`);
      setCaptcha(res.data.captcha);
      setCaptchaId(res.data.captchaId);
      setText("");
      setValid(false);
      setSuccess(false);
      setLoginError("");
    } catch (error) {
      console.error("Gagal ambil captcha:", error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
    const interval = setInterval(fetchCaptcha, 60000);
    return () => clearInterval(interval);
  }, []);

  
const MotionButton = ({ isLoading }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className="bg-indigo-600 text-white px-4 py-2 rounded"
    disabled={isLoading}
  >
    {isLoading ? 'Loading...' : 'Click Me'}
  </motion.button>
);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validasi CAPTCHA
      const captchaRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captcha/validate`,
        {
          captchaId,
          userInput: text,
        }
      );
      // console.log("CAPTCHA Response:", captchaRes.data);

      if (!captchaRes.data.success) {
        setValid(true);
        setSuccess(false);
        return;
      }

      setValid(false);
      setLoading(true);

      // Login
      const loginRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login_superadmin`,
        {
          username_superadmin: username,
          password_superadmin: password,
        }
      );

      console.log(loginRes.data);
      localStorage.setItem("token", loginRes.data.token);
      navigate("/dashboardadmin");
    } catch (error) {
      console.error("Error saat login:", error);
      setLoginError(
        error.response?.data?.message || "Terjadi kesalahan saat login"
        
      );
      console.error("Login error:", error.response);

      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="bg-[#025F96]/10 px-10 py-6 rounded-[10px] md:w-2/6 ">
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div className="relative">
            <VscAccount className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 pr-3 h-[40px] w-full border rounded-md text-gray-700 shadow-sm text-sm focus:ring-2 focus:ring-blue-100" style={{ fontFamily: "Nunito Sans" }}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <TbLockPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-[40px] w-full border rounded-md text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 text-sm" style={{ fontFamily: "Nunito Sans" }}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? (
                <HiEye className="w-5 h-5" />
              ) : (
                <HiEyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Captcha */}
          <div className="flex flex-row items-center gap-2">
            <div className="bg-white px-4 py-2 rounded text-xl font-[Nunito] font-bold tracking-widest w-60 h-auto overflow-hidden">
              {captcha}
            </div>
            <button
              type="button"
              className="bg-[#004A76] text-white px-3 py-2 rounded hover:bg-blue-800"
              onClick={fetchCaptcha}
            >
              <HiOutlineRefresh />
            </button>
            <input
              type="text"
              placeholder="Masukkan captcha"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setValid(false)}
              className={`pl-3 pr-3 h-[40px] w-full border rounded-md text-gray-700 shadow-sm text-sm focus:ring-2 focus:ring-blue-100 ${valid ? "border-red-500" : ""}`} style={{ fontFamily: "Nunito Sans" }} 
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
            }`}
          >
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
