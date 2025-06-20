import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return {
    handleLogout,
  };
};

export default useAuth;