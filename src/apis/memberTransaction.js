import axios from "axios";

const API_BASE_URL = "https://member.sayaka.vn/api";

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

export const createTransaction = async (transactionData, userId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/transactions/create-transaction`, transactionData, {
            headers: { userId }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi tạo giao dịch:", error);
        return { status: "Error", message: error.message };
    }
};