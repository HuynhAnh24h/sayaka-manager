import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
const NotPound = () => {
    const userId = useSelector((state) => state.auth.userId); // Kiểm tra trạng thái đăng nhập
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600">Trang bạn tìm kiếm không tồn tại.</p>
        {
            userId ?<Navigate to="/" replace > Quay về trang chủ</Navigate> : <Navigate to="/login" replace > Quay về đăng nhập</Navigate>
        }
    </div>
  )
}

export default NotPound