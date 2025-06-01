import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../stores/Auth/AuthSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [dataLogin, setDataLogin] = useState({ username: "", password: "" });
  const dispatch = useDispatch();

  const handleDataLogin = (e) => {
    const { name, value } = e.target;
    setDataLogin(prevData => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://member.sayaka.vn/api/auth/login", dataLogin);
      if (response.data.data) {
        dispatch(login({
          userId: response.data.data.userId || "Không lấy được ID người dùng",
          restaurantId: response.data.data.restaurantId || "Không lấy được ID nhà hàng",
          restaurantName: response.data.data.restaurantName || "Không lấy được tên nhà hàng",
          userFullName: response.data.data.userFullName || "Không lấy được tên người dùng"
        }));

        window.location.href = "/"
      } else {
        toast.error("Đăng nhập thất bại! Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Lỗi đăng nhập. Vui lòng kiểm tra lại thông tin!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Đăng nhập</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              name="username"
              value={dataLogin.username}  
              onChange={handleDataLogin}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={dataLogin.password}
              name="password"
              onChange={handleDataLogin}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none transition-all"
              placeholder="••••••••"
            />

          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-gray-800" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Forgot password?</a>
          </div>

          <button 
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          className="w-full bg-gray-600 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
