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

// Tạo tích điểm cho thành viên
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

// Sử dụng điểm cho thành viên
export const useMemberPoints = async (data, userId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/transactions/use-point`, data, {
            headers: { userId }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi sử dụng điểm:", error);
        return { status: "Error", message: error.message };
    }
};

// Lấy tất cả danh sách thành viên
export const getTransactions = async (postData, userId) => {
    try {
        const config = { headers: { userId } };
        const response = await axios.post(`${API_BASE_URL}/transactions/get-list-transactions`, postData, config);
        const data = response.data.data
        console.log(response.data.data.totalPage)
        return data
    } catch (error) {
        console.error("Lỗi tải danh sách giao dịch:", error);
        return null;
    }
};