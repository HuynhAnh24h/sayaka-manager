import axios from "axios";

const API_BASE_URL = "https://member.sayaka.vn/api";

// Lấy dữ liệu thành viên qua mã vạch
export const getMemberInfo = async (memberId, userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/member/${memberId}`, {
            headers: { userId }
        });
        return { success: true, data: response.data.data };
    } catch (error) {
        console.error("Lỗi lấy dữ liệu thành viên:", error);

        // Lấy tất cả lỗi từ server nếu có
        const errorMessages = error.response?.data?.errors || [error.response?.data?.message] || ["Lỗi không xác định từ server!"];

        return { success: false, errors: errorMessages };
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

        // Kiểm tra phản hồi từ server để lấy tất cả thông báo lỗi
        const errorMessages = error.response?.data?.errors || error.response?.data?.message || "Lỗi không xác định!";

        return { status: "Error", message: errorMessages };
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
        return { status: "Error", message: error.message.response.message };
    }
};

// Lấy tất cả danh sách thành viên
export const getTransactions = async (postData, userId) => {
    try {
        const config = { headers: { userId } };
        const response = await axios.post(`${API_BASE_URL}/transactions/get-list-transactions`, postData, config);
        const data = response.data.data
        console.log("Danh sách giao dịch:", data);
        return data
    } catch (error) {
        console.error("Lỗi tải danh sách giao dịch:", error);
        return null;
    }
};

// Lấy thông tin order
export const getOrderInfo = async(inPutQr)=>{
    try{
        const response = await axios.get(`${API_BASE_URL}/parseOrder/${inPutQr}`)
        if(response){
            const data = response.data.data
            return data
        }else{
            console.log("Can't Get API")
        }
    }catch(err){
        console.log("Some one error", err.message)
        return null
    }
}