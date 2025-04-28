import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { HiEye, HiEyeOff, HiOutlineRefresh } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import axios from "axios";
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
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const fetchCaptcha = async () => {
    try {
      const res = await axios.get("https://mjk-backend-five.vercel.app/api/captcha/captcha");
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
    const interval = setInterval(fetchCaptcha, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validasi CAPTCHA
      const captchaRes = await axios.post(
        "https://mjk-backend-five.vercel.app/api/captcha/validate",
        {
          captchaId,
          userInput: text,
        }
      );

      if (!captchaRes.data.success) {
        setValid(true);
        setSuccess(false);
        return;
      }

      setValid(false);
      setSuccess(true);

      // Login
      const loginRes = await axios.post(
        "https://mjk-backend-five.vercel.app/api/auth/login_superadmin",
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

      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="bg-[#025F96]/10 px-10 py-6 rounded-[10px] w-[380px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-5">
          <img
            src="/Logo Mojokerto Sehat.svg"
            alt="Logo"
            className="w-[200px]"
          />
          <p className="font-raleway font-extrabold text-[#025F96] text-[20px]">
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
              className="pl-10 pr-3 h-[40px] w-full border rounded-md text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 font-[Nunito-Sans]"
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
              className="pl-10 pr-10 h-[40px] w-full border rounded-md text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-100 font-[Nunito-Sans]"
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
            <div className="bg-white px-4 py-2 rounded text-xl font-bold tracking-widest w-[130px] h-auto overflow-hidden">
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
              className={`p-2 border rounded w-[140px] text-sm ${valid ? "border-red-500" : ""}`}
            />
          </div>

          {/* Error Message */}
          {valid && (
            <p className="text-red-500 text-sm">Captcha tidak sesuai</p>
          )}
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#004A76] text-white w-full h-[48px] rounded hover:bg-[#003252] transition-all font-raleway font-semibold"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

export default Loginakun;
