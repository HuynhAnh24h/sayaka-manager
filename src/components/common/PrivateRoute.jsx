import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const userId = useSelector((state) => state.auth.userId); // Kiểm tra trạng thái đăng nhập
    return userId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;