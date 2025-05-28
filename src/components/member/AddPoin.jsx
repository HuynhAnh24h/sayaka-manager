import {  useState,useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";

const AddPoin = ({handleShow}) => {
    const [addPoinData, setAddPoinData] = useState({
        userId: "",
        restaurantId: useSelector((state) => state.auth.restaurantId),
        orderId: "",
        orderValue:"",
    });

    // State lưu trữ trạng thái check mã khách hàng
    const [isValidUser, setIsValidUser] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddPoinData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Check UserId Xem đạ có người hay chưa
     useEffect(() => {
        const checkUsers = async () => {
            try {
                const userIds = addPoinData.userId; // Nhập danh sách ID
                if (userIds && userIds.length > 0) {
                    const results = {};
                    for (const userId of userIds) {
                        const response = await axios.get(`/api/users/${userId}`);
                        results[userId] = response.data ? true : false;
                    }
                    setIsValidUsers(results);
                    console.log("Danh sách kiểm tra:", results);
                }
            } catch (error) {
                console.error("Lỗi kiểm tra User:", error);
            }
        };

        if (addPoinData.userId) {
            checkUsers(); // Gọi hàm khi danh sách thay đổi
        }
    }, [addPoinData.userId]); // Theo dõi danh sách ID khách hàng
    return (
        <>  
            <div className="flex flex-col justify-center items-center gap-4 w-[400px] h-auto px-6 py-5 bg-white rounded-lg 
            shadow-lg border border-gray-300 pointer-events-auto z-100 relative">
                <div className="absolute top-2 right-2">
                    <button onClick={() => handleShow(null)} className="text-gray-500 hover:text-gray-700 transition">
                        <IoCloseCircle size={25}/>
                    </button>
                </div>
                <h1 className="text-2xl font-bold text-gray-700">Tích điểm</h1>
                <div className="w-full space-y-4">
                    {/* Mã khách hàng */}
                    <div className="flex flex-col">
                        <label htmlFor="ma_khach_hang" className="block text-sm font-medium text-gray-600 mb-1">
                            Mã khách hàng
                        </label>
                        <input
                            type="text"
                            name="ma_khach_hang"
                            id="ma_khach_hang"
                            varlue={addPoinData.userId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800  transition"
                            placeholder="Nhập mã khách hàng..."
                        />
                        <div className="flex flex-col justify-between items-start mt-1">
                            <p className="text-[12px] text-green-800">Tên KH: <span className="font-bold">Huỳnh Anh</span></p>
                            <div className="flex flex-col items-start">
                                <p className="text-[12px] text-green-800">Số ĐT: <span className="font-bold">0971508299</span></p>
                                <p className="text-[12px] text-green-800">Số Dư: <span className="font-bold">16.000</span></p>
                            </div>
                        </div>
                        <p className="text-[12px] text-red-800">Mã không hợp lệ</p>
                    </div>

                    {/* Mã hóa đơn */}
                    <div className="flex flex-col">
                        <label htmlFor="ma_hoa_don" className="block text-sm font-medium text-gray-600 mb-1">
                            Mã hóa đơn
                        </label>
                        <input
                            type="text"
                            name="ma_hoa_don"
                            id="ma_hoa_don"
                            className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800  transition"
                            placeholder="Nhập mã hóa đơn..."
                        />
                    </div>

                    {/* Giá trị hóa đơn */}
                    <div className="flex flex-col">
                        <label htmlFor="gia_tri_hoa_don" className="block text-sm font-medium text-gray-600 mb-1">
                            Giá trị hóa đơn
                        </label>
                        <input
                            type="text"
                            name="gia_tri_hoa_don"
                            id="gia_tri_hoa_don"
                            className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800  transition"
                            placeholder="Nhập giá trị hóa đơn..."
                        />
                    </div>

                    {/* Nút Gửi */}
                    <div className="flex justify-end gap-2">
                        <button className="w-full bg-gray-700 outline-none text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">
                            Gửi
                        </button>
                        <button 
                        onClick={() => handleShow(null)}
                        className="w-full bg-gray-700 outline-none text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AddPoin