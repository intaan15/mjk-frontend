import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import.meta.env.VITE_BASE_URL

const useLogin = () => {
  // State management
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

  // Toggle password visibility
  const togglePassword = () => setShowPassword((prev) => !prev);

  // Fetch captcha function
  const fetchCaptcha = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/captcha/captcha`);
      setCaptcha(res.data.captcha);
      setCaptchaId(res.data.captchaId);
      setText("");
      setValid(false);
      setSuccess(false);
      setLoginError("");
    } catch (error) {
      console.error("❌ Gagal ambil captcha:", error);
    }
  };



  // Auto-fetch captcha on mount and set interval
  useEffect(() => {
    fetchCaptcha();
    const interval = setInterval(fetchCaptcha, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
      // Validate CAPTCHA
      const captchaRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captcha/validate`,
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
        setLoading(true);

        // Login
        const loginRes = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/auth/login_superadmin`,
            {
            username_superadmin: username,
            password_superadmin: password,
            }
        );

        console.log(loginRes.data.message || "Login berhasil");
        localStorage.setItem("token", loginRes.data.token);
        navigate("/dashboardadmin");
        } catch (error) {
        console.error("Error saat login:", error);
        setLoginError(
            error.response?.data?.message || "❌Terjadi kesalahan saat login"
        );
        console.error("Login error:", error.response);
        setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboardadmin"); // Langsung pindah
        }
    }, []);

    

  // Handle captcha input focus
  const handleCaptchaFocus = () => {
    setValid(false);
  };


  const clearErrors = () => {
    setLoginError("");
    setValid(false);
  };

  // Reset form
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setText("");
    setLoginError("");
    setValid(false);
    setSuccess(false);
    setLoading(false);
    fetchCaptcha();
  };

  return {
    // State
    showPassword,
    captcha,
    captchaId,
    text,
    valid,
    success,
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
    handleCaptchaFocus,
    clearErrors,
    resetForm,
  };
};

export default useLogin;