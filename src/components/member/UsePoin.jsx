import { IoCloseCircle } from "react-icons/io5"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { formatNumber } from "../../helper/FormatData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UsePoin = ({ handleShow }) => {
    const [useDataFetch,setUseDataFetch] = useState(null)
    const [usePointData, setUsePointData] = useState({
        memberId: "",
        restaurantId: useSelector((state) => state.auth.restaurantId),
        pointUse: "",
        cashierId: useSelector((state)=>state.auth.userId),
    })
    const config = {
        headers:{
            "userId": useSelector((state)=>state.auth.userId)
        }
    }
     useEffect(() => {
        try {
            axios.get(`https://member.sayaka.vn/api/member/` + `${usePointData.memberId}`, config)
                .then(response => {
                    console.log(response.data);
                    setUseDataFetch(response.data.data)
                })
                .catch(error => {
                    console.error("Error fetching MemberPoin data:", error);
                });

        } catch (error) {
            console.log(error.message)
        }

    }, [usePointData.memberId]); // Theo dõi danh sách ID khách hàng
     const handleChange = (e) => {
        const { name, value } = e.target;
        setUsePointData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const postUsePoint = async() => {
        try{
            const post = await axios.post("https://member.sayaka.vn/api/transactions/use-point",usePointData,config)
            if(post.data.status != 'Success'){
                toast.error(post.data.message);
            }else{
                toast.success(post.data.message)
            }
        }catch(err){
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
                <h1 className="text-2xl font-bold text-gray-700">Sử dụng điểm</h1>
                <div className="w-full space-y-4">
                    {/* Mã khách hàng */}
                    <div className="flex flex-col">
                        <label htmlFor="ma_khach_hang" className="block text-sm font-medium text-gray-600 mb-1">
                            Mã khách hàng
                        </label>
                        <input
                            type="text"
                            name="memberId"
                            value={usePointData.memberId}
                            onChange={handleChange}
                            id="ma_khach_hang"
                            className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800  transition"
                            placeholder="Nhập mã khách hàng..."
                        />
                        <div className="flex flex-col justify-between items-start mt-1">
                            {
                                useDataFetch ? (
                                    <>
                                        <div>
                                            <p className="text-[12px] text-green-800">Tên KH: <span className="font-bold">{useDataFetch.memberName}</span></p>
                                            <div className="flex flex-col useDataFetchs-start">
                                                <p className="text-[12px] text-green-800">Số ĐT: <span className="font-bold">{useDataFetch.memberPhone}</span></p>
                                                <p className="text-[12px] text-green-800">Số Dư: <span className="font-bold">{formatNumber(useDataFetch.memberPoint)} VNĐ</span></p>
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
                            Số điểm sử dụng
                        </label>
                        <input
                            type="text"
                            name="pointUse"
                            value={usePointData.pointUse}
                            onChange={handleChange}
                            id="ma_hoa_don"
                            className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800  transition"
                            placeholder="Nhập điểm sử dụng..."
                        />
                    </div>


                    {/* Nút Gửi */}
                    <div className="flex justify-end gap-2">
                        <button 
                        onClick={ postUsePoint}
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
            </div>
        </>
    )
}

export default UsePoin