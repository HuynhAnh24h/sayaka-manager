import axios from "axios";
const API_BASE_URL = "https://member.sayaka.vn/api";

export const getListMemberBalance = async (params,userId) => {
  try {
    const config = { headers: { userId } };
    const response = await axios.post(`${API_BASE_URL}/transactions/get-member-balances`, params, config);
    console.log("Member balance data fetched successfully:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching member balance:", error);
    throw error;
  }
};
