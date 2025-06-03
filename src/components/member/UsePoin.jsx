import { useState, useEffect, useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { formatNumber, speakNumber } from "../../helper/FormatData";
import { getMemberInfo, useMemberPoints } from "../../apis/memberTransaction";
import { toast } from "react-toastify";
import ValidateSubmitModal from "../common/ValidateSubmitModal";

const UsePoin = ({ handleShow, reloadData }) => {
    const userId = useSelector((state) => state.auth.userId);
    const restaurantId = useSelector((state) => state.auth.restaurantId);
    const [dataFetch, setDataFetch] = useState(null);
    const [usePointData, setUsePointData] = useState({ memberId: "", pointUse: "", cashierId: userId, restaurantId });
    const [toogle, setToogle] = useState(false)
    const memberIdRef = useRef(null);
    const pointUseRef = useRef(null);
    const [errors, setErrors] = useState({ memberId: "" });
    const handleChange = ({ target: { name, value } }) => {
        setUsePointData(prev => ({ ...prev, [name]: value }))
    };
    const handleKeyDown = async (e, field) => {
        if (e.key === "Enter" && usePointData[field]?.trim()) {
            if (field === "memberId") {
                await fetchMemberData(usePointData.memberId);
                errors.memberId ? memberIdRef.current?.select() : pointUseRef.current?.focus();
            }
        }
    };
    const fetchMemberData = async (memberId) => {

        try {
        const data = await getMemberInfo(memberId, userId);
        if (!data) throw new Error("Mã khách hàng không hợp lệ!");

        setDataFetch(data);
        setErrors(prev => ({ ...prev, memberId: "" }));
        
        // Nếu hợp lệ, tự động chuyển đến ô tiếp theo
        setTimeout(() => pointUseRef.current?.focus(), 0);
    } catch {
        setDataFetch(null);
        setErrors(prev => ({ ...prev, memberId: "Mã khách hàng không hợp lệ!" }));
        setTimeout(() => memberIdRef.current?.select(), 0);
    }
    }
    useEffect(() => {
        if (memberIdRef.current) {
            memberIdRef.current.focus();
        }
    }, [toogle]);

    const handleToogle = () => { setToogle((prev) => !prev) }

    const handleSubmit = async () => {
        const response = await useMemberPoints(usePointData, userId);
        response.status !== "Success" ? toast.error(response.message) : (toast.success(response.message), handleShow(null), reloadData());
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-[400px] p-5 bg-white rounded-lg shadow-lg border border-gray-300 relative pointer-events-auto z-100">
            <button onClick={() => handleShow(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition">
                <IoCloseCircle size={25} />
            </button>
            <h1 className="text-2xl font-bold text-gray-700">{toogle ? "Xác nhận sử dụng điểm" : "Sử dụng điểm"}</h1>
            {
                toogle ? (<ValidateSubmitModal orderValue={usePointData.pointUse} memberName={dataFetch.memberName} handleSubmit={handleSubmit} handleToggleModal={handleToogle} />) : (
                    <div className="w-full space-y-4">
                        {["memberId", "pointUse"].map((field, idx) => (
                            <div key={idx} className="flex flex-col">
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    {field === "memberId" ? "Mã khách hàng" : "Số điểm sử dụng"}
                                </label>
                                <input
                                    type="text"
                                    name={field}
                                    value={usePointData[field]}
                                    onChange={handleChange}
                                    onKeyDown={(e) => handleKeyDown(e, field)}
                                    ref={field === "memberId" ? memberIdRef : pointUseRef}
                                    placeholder={`Nhập ${field === "memberId" ? "mã khách hàng" : "số điểm sử dụng"}...`}
                                    className={`w-full px-4 py-2 outline-none border rounded-md focus:ring-2 transition ${errors[field] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-800"
                                        }`}
                                />
                                {errors[field] && <span className="text-red-600 text-sm pt-1">{errors[field]}</span>}

                                {/* Hiển thị thông tin khách hàng khi dữ liệu hợp lệ */}
                                {field === "memberId" && !errors.memberId && dataFetch && (
                                    <div className="flex flex-col justify-start pt-1">
                                        <p className="text-green-800 text-[12px] font-bold">Khách hàng: {dataFetch.memberName}</p>
                                        <p className="text-green-800 text-[12px] font-bold">SĐT: {dataFetch.memberPhone}, Số dư: {formatNumber(dataFetch.memberPoint)} VNĐ</p>
                                    </div>
                                )}

                                {/* Hiển thị số điểm đọc bằng chữ nếu là pointUse */}
                                {field === "pointUse" && usePointData.pointUse && (
                                    <span className="font-bold text-sm text-green-800 capitalize pt-1">
                                        {speakNumber(usePointData.pointUse)}
                                    </span>
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleToogle}
                                className={`w-full text-white font-medium py-2 rounded-md transition ${usePointData.memberId && usePointData.pointUse && !errors.memberId ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                disabled={!usePointData.memberId || !usePointData.pointUse || errors.memberId}
                            >
                                Gửi
                            </button>
                            <button onClick={() => handleShow(null)} className="w-full bg-red-700 text-white font-medium py-2 rounded-md hover:bg-red-800 transition">Hủy bỏ</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default UsePoin
