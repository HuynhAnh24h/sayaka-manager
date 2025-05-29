import { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { formatNumber } from "../../helper/FormatData";
import { getMemberInfo, useMemberPoints } from "../../apis/memberTransaction";
import { toast } from "react-toastify";
import ValidateSubmitModal from "../common/ValidateSubmitModal";

const UsePoin = ({ handleShow }) => {
    const userId = useSelector((state) => state.auth.userId);
    const restaurantId = useSelector((state) => state.auth.restaurantId);
    const [dataFetch, setDataFetch] = useState(null);
    const [usePointData, setUsePointData] = useState({ memberId: "", pointUse: "", cashierId: userId, restaurantId });
    const [toogle,setToogle] = useState(false)
    const handleChange = ({ target: { name, value } }) => setUsePointData(prev => ({ ...prev, [name]: value }));

    useEffect(() => {
        if (!usePointData.memberId) return;
        getMemberInfo(usePointData.memberId, userId).then(data => setDataFetch(data));
    }, [usePointData.memberId]);

    const handleToogle = () =>{setToogle((prev)=>!prev)}

    const handleSubmit = async () => {
        const response = await useMemberPoints(usePointData, userId);
        response.status !== "Success" ? toast.error(response.message) :( toast.success(response.message), handleShow(null));
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-[400px] p-5 bg-white rounded-lg shadow-lg border border-gray-300 relative pointer-events-auto z-100">
            <button onClick={() => handleShow(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition">
                <IoCloseCircle size={25} />
            </button>
            <h1 className="text-2xl font-bold text-gray-700">{toogle ? "Xác nhận giao dịch": "Sử dụng điểm"}</h1>
            {
                toogle ?(<ValidateSubmitModal orderValue ={usePointData.pointUse} memberName={dataFetch.memberName} handleSubmit={handleSubmit} handleToggleModal={handleToogle}/>) :(
                <div className="w-full space-y-4">
                    {["memberId", "pointUse"].map((field, idx) => (
                        <div key={idx} className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-600 mb-1">{field === "memberId" ? "Mã khách hàng" : "Số điểm sử dụng"}</label>
                            <input type="text" name={field} value={usePointData[field]} onChange={handleChange} placeholder={`Nhập ${field === "memberId" ? "mã khách hàng" : "số điểm sử dụng"}...`}
                                className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 transition" />
                        </div>
                    ))}
                    {dataFetch && <p className="text-green-800 text-[12px] font-bold">KH: {dataFetch.memberName}, SĐT: {dataFetch.memberPhone}, Số dư: {formatNumber(dataFetch.memberPoint)} VNĐ</p>}
                    <div className="flex justify-end gap-2">
                        <button onClick={handleToogle} className="w-full bg-gray-700 text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">Gửi</button>
                        <button onClick={() => handleShow(null)} className="w-full bg-gray-700 text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">Hủy bỏ</button>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default UsePoin;
