import { useState, useEffect, useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { formatNumber, speakNumber } from "../../helper/FormatData";
import { getMemberInfo, useMemberPoints } from "../../apis/memberTransaction";
import { toast } from "react-toastify";
import ValidateSubmitModal from "../common/ValidateSubmitModal";

const UsePoint = ({ handleShow, reloadData }) => {
    const userId = useSelector((state) => state.auth.userId);
    const restaurantId = useSelector((state) => state.auth.restaurantId);

    const [dataFetch, setDataFetch] = useState(null);
    const [usePointData, setUsePointData] = useState({
        memberId: "",
        pointUse: "",
        cashierId: userId,
        restaurantId,
    });

    const [toggle, setToggle] = useState(false);
    const memberIdRef = useRef(null);
    const pointUseRef = useRef(null);
    const [errors, setErrors] = useState({ memberId: "", pointUse: "" });

    useEffect(() => {
        if (dataFetch && pointUseRef.current) {
            pointUseRef.current.focus();
        }
    }, [dataFetch]);

    useEffect(() => {
        if (toggle && memberIdRef.current) {
            memberIdRef.current.focus();
        }
    }, [toggle]);

    const handleChange = ({ target: { name, value } }) => {
        if (name === "pointUse") {
            const pointUse = Number(value);
            if (isNaN(pointUse) || pointUse < 1) {
                setErrors((prev) => ({ ...prev, pointUse: "Số điểm phải là số hợp lệ!" }));
                return;
            }
        }
        setUsePointData((prev) => ({ ...prev, [name]: value }));

        if (name === "pointUse" && dataFetch) {
            setErrors((prev) => ({
                ...prev,
                pointUse: Number(value) > dataFetch.memberPoint ? "Điểm của bạn không đủ!" : "",
            }));
        }
    };

    const handleKeyDown = async (e, field) => {
        if (e.key === "Enter" && usePointData[field]?.trim()) {
            if (field === "memberId") {
                const isValid = await fetchMemberData(usePointData.memberId);
                isValid ? orderIdRef.current?.focus() : memberIdRef.current?.select();
            } 
        }
    };

     const fetchMemberData = async (memberId) => {
        const response = await getMemberInfo(memberId, userId);

        if (!response.success) {
            setErrors(prev => ({ ...prev, memberId: response.errors }));
            return false;
        }

            setDataFetch(response.data);
            setErrors(prev => ({ ...prev, memberId: "" }));
            return true;
    };

    const handleSubmit = async () => {
        if (!isValid) return;

        try {
            const response = await useMemberPoints(usePointData, userId);
            if (response.status !== "Success") {
                setErrors((prev) => ({ ...prev, pointUse: response.message }));
                toast.error(response.message);
            } else {
                toast.success(response.message);
                handleShow(null);
                reloadData();
            }
        } catch {
            setErrors((prev) => ({ ...prev, pointUse: "Có lỗi xảy ra khi gửi giao dịch!" }));
            toast.error("Có lỗi xảy ra khi gửi giao dịch.");
        }
    };

    const isValid =
        usePointData.memberId &&
        usePointData.pointUse &&
        !errors.memberId &&
        !errors.pointUse;

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-[400px] p-5 bg-white rounded-lg shadow-lg border border-gray-300 relative">
            <button onClick={() => handleShow(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition">
                <IoCloseCircle size={25} />
            </button>

            <h1 className="text-2xl font-bold text-gray-700">{toggle ? "Xác nhận sử dụng điểm" : "Sử dụng điểm"}</h1>

            {toggle ? (
                <ValidateSubmitModal
                    orderValue={usePointData.pointUse}
                    memberName={dataFetch?.memberName}
                    handleSubmit={handleSubmit}
                    handleToggleModal={() => setToggle(!toggle)}
                />
            ) : (
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

                            {errors[field] && <p className="text-red-800 text-[12px] font-bold">{errors[field]}</p>}
                            {/* Hiển thị lỗi chính xác cho từng input */}

                            {field === "memberId" && dataFetch && !errors.memberId && (
                                <>
                                    <p className="text-green-800 text-[12px] font-bold">
                                        Khách hàng: {dataFetch?.memberName}
                                    </p>
                                    <p className="text-green-800 text-[12px] font-bold">
                                        SĐT: {dataFetch?.memberPhone} | Số dư: {formatNumber(dataFetch?.memberPoint)} VNĐ
                                    </p>
                                </>
                            )}


                            {field === "pointUse" && usePointData.pointUse && (
                                <p className="bg-green-100 p-2 rounded-md text-green-800 text-sm font-bold uppercase">
                                    {speakNumber(usePointData.pointUse)}
                                </p>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setToggle(!toggle)}
                            disabled={!isValid}
                            className={`w-full text-white font-medium py-2 rounded-md transition ${isValid ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Gửi
                        </button>
                        <button
                            onClick={() => handleShow(null)}
                            className="w-full bg-red-700 text-white font-medium py-2 rounded-md hover:bg-red-800 transition"
                        >
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsePoint;
