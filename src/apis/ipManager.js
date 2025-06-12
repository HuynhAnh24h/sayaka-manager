import axios from "axios"
const API_BASE_URL = "https://member.sayaka.vn/api"

// Rest API List IP Items

// Get
export const getListIP = async (userId)=>{
    try{
        const response = await axios.get(`${API_BASE_URL}/address`, {
            headers: { userId }
        })
         return { success: true, data: response.data.data };
    }catch(error){
        console.error("Lỗi lấy dữ liệu thành viên:", error);
        // Lấy tất cả lỗi từ server nếu có
        const errorMessages = error.response?.data?.errors || [error.response?.data?.message] || ["Lỗi không xác định từ server!"];

        return { success: false, errors: errorMessages };
    }
}

// Get
export const getOneIp = async(userId,iPid)=>{
    try{
        const response = await axios.get(`${API_BASE_URL}/address/${iPid}`, {
            headers: { userId }
        })
        return { success: true, data: response.data.data };

    }catch(error){
        console.error("Lỗi lấy dữ liệu thành viên:", error);
        // Lấy tất cả lỗi từ server nếu có
        const errorMessages = error.response?.data?.errors || [error.response?.data?.message] || ["Lỗi không xác định từ server!"];

        return { success: false, errors: errorMessages };
    }
}


// Put
export const updateIp = async(userId,bodyData) =>{
    try{

    }catch(error){
         console.error("Lỗi lấy dữ liệu thành viên:", error);
        // Lấy tất cả lỗi từ server nếu có
        const errorMessages = error.response?.data?.errors || [error.response?.data?.message] || ["Lỗi không xác định từ server!"];

        return { success: false, errors: errorMessages };
    }
}

// delete
export const deleteIp = async(userId, iPid)=>{
    try{

    }catch(error){
                 console.error("Lỗi lấy dữ liệu thành viên:", error);
        // Lấy tất cả lỗi từ server nếu có
        const errorMessages = error.response?.data?.errors || [error.response?.data?.message] || ["Lỗi không xác định từ server!"];

        return { success: false, errors: errorMessages };
    }
}