import { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { formatNumber } from "../../helper/FormatData";
import { getMemberInfo, createTransaction } from "./../../apis/memberTransaction";
import { toast } from "react-toastify";
import ValidateSubmitModal from "../common/ValidateSubmitModal";

const AddPoin = ({ handleShow,reloadData }) => {
    const userId = useSelector((state) => state.auth.userId);
    const restaurantId = useSelector((state) => state.auth.restaurantId);
    const [addPointData, setAddPointData] = useState({ memberId: "", orderId: "", orderValue: "", cashierId: userId, restaurantId });
    const [dataFetch, setDataFetch] = useState(null);
    const [validateModal, setValidateModal] = useState(false);

    const handleChange = ({ target: { name, value } }) => setAddPointData(prev => ({ ...prev, [name]: value }));
    const handleToggleModal = () => setValidateModal(prev => !prev);

    useEffect(() => {
        if (!addPointData.memberId) return;
        getMemberInfo(addPointData.memberId, userId).then(data => setDataFetch(data));
    }, [addPointData.memberId]);
    const handleSubmit = async () => {
        const response = await createTransaction(addPointData, userId);
        response.status !== "Success" ? toast.error(response.message) : (toast.success(response.message), handleShow(null), reloadData());
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-[400px] p-5 bg-white rounded-lg shadow-lg border border-gray-300 relative pointer-events-auto z-100">
            <button onClick={() => handleShow(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition">
                <IoCloseCircle size={25} />
            </button>
            <h1 className="text-2xl font-bold text-gray-700">{validateModal ? "Xác nhận giao dịch" : "Tích điểm"}</h1>
            {validateModal ? (
                <ValidateSubmitModal orderValue={addPointData.orderValue} 
                memberName={dataFetch.memberName} handleToggleModal={handleToggleModal} handleSubmit={handleSubmit} />
            ) : (
                <div className="w-full space-y-4">
                    {["memberId", "orderId", "orderValue"].map((field, idx) => (
                        <div key={idx} className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-600 mb-1">{field === "memberId" ? "Mã khách hàng" : field === "orderId" ? "Mã hóa đơn" : "Giá trị hóa đơn"}</label>
                            <input type="text" name={field} 
                            value={addPointData[field]} onChange={handleChange} 
                            placeholder={`Nhập ${field === "memberId" ? "mã khách hàng" : field === "orderId" ? "mã hóa đơn" : "giá trị hóa đơn"}...`}
                                className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 transition" />
                        </div>
                    ))}
                    {dataFetch && <p className="text-green-800 text-[12px] font-bold">KH: {dataFetch.memberName}, SĐT: {dataFetch.memberPhone}, Số dư: {formatNumber(dataFetch.memberPoint)} VNĐ</p>}
                    <div className="flex justify-end gap-2">
                        <button onClick={handleToggleModal} className="w-full bg-gray-700 text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">Gửi</button>
                        <button onClick={() => handleShow(null)} className="w-full bg-gray-700 text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">Hủy bỏ</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPoin;
