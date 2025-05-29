import axios from "axios";

const API_BASE_URL = "https://member.sayaka.vn/api";

// Lấy dữ liệu thành viên qua mã vạch
export const getMemberInfo = async (memberId, userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/member/${memberId}`, {
            headers: { userId }
        });
        return response.data.data;
    } catch (error) {
        console.error("Lỗi lấy dữ liệu thành viên:", error);
        return null;
    }
};
