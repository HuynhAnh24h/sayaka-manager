import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const userId = localStorage.getItem("userId"); // Lấy User ID từ localStorage

    return userId ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute