import axios from "axios";
const API_BASE_URL = 'https://member.sayaka.vn/api';

const getTransactions = async (postData, userIdLocal) => {
    try {
        const config = { headers: { "userId": userIdLocal } };
        const response = await axios.post(`${API_BASE_URL}/transactions/get-list-transactions`, postData, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

export { getTransactions };