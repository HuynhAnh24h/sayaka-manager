import { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { formatNumber } from "../../helper/FormatData";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ValidateSubmitModal from "../common/ValidateSubmitModal";

const AddPoin = ({ handleShow }) => {
    const [addPointData, setAddPointData] = useState({
        memberId: "",
        restaurantId: useSelector((state) => state.auth.restaurantId),
        orderId: "",
        orderValue: "",
        cashierId: useSelector((state) => state.auth.userId),
    });

    // State lưu trữ trạng thái check mã khách hàng
    const [dataFetch, setDataFetch] = useState(null)
    const [disable, setDisable] = useState(true)
    const [validate, setValidate] = useState("")
    const [validatModal, setValidateModal] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddPointData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const config = {
        headers: {
            "userId": useSelector((state) => state.auth.userId)
        }
    }
    // Check UserId Xem đạ có người hay chưa
    useEffect(() => {
        try {
            axios.get(`https://member.sayaka.vn/api/member/` + `${addPointData.memberId}`, config)
                .then(response => {
                    console.log(response.data);
                    setDataFetch(response.data.data)
                })
                .catch(error => {
                    console.error("Error fetching MemberPoin data:", error);
                });

        } catch (error) {
            console.log(error.message)
        }

    }, [addPointData.memberId]); // Theo dõi danh sách ID khách hàng

    const handleSubmit = () => {
        setValidateModal(prev => !prev);
    }

    const handleSendAPI = async () => {
        try {
            const post = await axios.post("https://member.sayaka.vn/api/transactions/create-transaction", addPointData, config)
            if (post.data.status != 'Success') {
                toast.error(post.data.message);
            } else {
                toast.success(post.data.message)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <>

            <div className="flex flex-col justify-center items-center gap-4 w-[400px] h-auto px-6 py-5 bg-white rounded-lg 
            shadow-lg border border-gray-300 pointer-events-auto z-100 relative">
                <div className="absolute top-2 right-2">
                    <button onClick={() => handleShow(null)} className="text-gray-500 hover:text-gray-700 transition">
                        <IoCloseCircle size={25} />
                    </button>
                </div>
                <h1 className="text-2xl font-bold text-gray-700">Tích điểm</h1>
                {
                    validatModal ? (<ValidateSubmitModal
                        dataAPI={dataFetch}
                        dataSumit={addPointData}
                        handleModal={handleSubmit}
                        handleSend={handleSendAPI} />) : (
                        <div className="w-full space-y-4">
                            {/* Mã khách hàng */}
                            <div className="flex flex-col">
                                <label htmlFor="ma_khach_hang" className="block text-sm font-medium text-gray-600 mb-1">
                                    Mã khách hàng
                                </label>
                                <input
                                    type="text"
                                    id="ma_khach_hang"
                                    value={addPointData.memberId}
                                    name="memberId"
                                    onChange={handleChange}

                                    className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800  transition"
                                    placeholder="Nhập mã khách hàng..."
                                />
                                <div className="flex flex-col justify-between items-start mt-1">
                                    {
                                        dataFetch ? (
                                            <>
                                                <div>
                                                    <p className="text-[12px] text-green-800">Tên KH: <span className="font-bold">{dataFetch.memberName}</span></p>
                                                    <div className="flex flex-col dataFetchs-start">
                                                        <p className="text-[12px] text-green-800">Số ĐT: <span className="font-bold">{dataFetch.memberPhone}</span></p>
                                                        <p className="text-[12px] text-green-800">Số Dư: <span className="font-bold">{formatNumber(dataFetch.memberPoint)} VNĐ</span></p>
                                                    </div>
                                                </div>

                                            </>
                                        ) : (<>
                                            <p className="text-[12px] text-red-800">Mã không hợp lệ</p>
                                        </>)
                                    }
                                </div>
                            </div>

                            {/* Mã hóa đơn */}
                            <div className="flex flex-col">
                                <label htmlFor="ma_hoa_don" className="block text-sm font-medium text-gray-600 mb-1">
                                    Mã hóa đơn
                                </label>
                                <input
                                    type="text"
                                    id="ma_hoa_don"
                                    value={addPointData.orderId}
                                    name="orderId"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800  transition"
                                    placeholder="Nhập mã hóa đơn..."
                                />
                                <p className="text-[12px] text-red-800">{validate}</p>
                            </div>

                            {/* Giá trị hóa đơn */}
                            <div className="flex flex-col">
                                <label htmlFor="gia_tri_hoa_don" className="block text-sm font-medium text-gray-600 mb-1">
                                    Giá trị hóa đơn
                                </label>
                                <input
                                    type="text"
                                    value={formatNumber(Number(addPointData.orderValue))}
                                    name="orderValue"
                                    id="gia_tri_hoa_don"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800  transition"
                                    placeholder="Nhập giá trị hóa đơn..."
                                />
                                <p className="text-[12px] text-red-800">{validate}</p>
                            </div>
                            {/* Nút Gửi */}
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-gray-700 outline-none text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">
                                    Gửi
                                </button>
                                <button
                                    onClick={() => handleShow(null)}
                                    className="w-full bg-gray-700 outline-none text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">
                                    Hủy bỏ
                                </button>
                            </div>
                        </div>
                    )
                }


            </div>
        </>

    )
}

export default AddPoin