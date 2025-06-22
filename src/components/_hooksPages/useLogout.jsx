import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dari localStorage
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      confirmButtonColor: "#004A76",
      cancelButtonText: "Tidak"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/login");
      }

    });
  };

  return {
    handleLogout,
  };
};

export default useLogout;