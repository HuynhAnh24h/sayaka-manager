
import { useState, useEffect, useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { formatNumber, speakNumber } from "../../helper/FormatData";
import { getMemberInfo, createTransaction, getOrderInfo } from "./../../apis/memberTransaction";
import { toast } from "react-toastify";
import ValidateSubmitModal from "../common/ValidateSubmitModal";


const AddPoin = ({ handleShow, reloadData }) => {
    const userId = useSelector(state => state.auth.userId);
    const restaurantId = useSelector(state => state.auth.restaurantId);
    const [addPointData, setAddPointData] = useState({
        memberId: "",
        orderId: "",
        orderValue: "",
        cashierId: userId,
        restaurantId: restaurantId
    });
    const [errors, setErrors] = useState({ memberId: "", orderId: "" });
    const [dataFetch, setDataFetch] = useState(null);
    const [validateModal, setValidateModal] = useState(false);
    const memberIdRef = useRef(null);
    const orderIdRef = useRef(null);
    const orderValueRef = useRef(null);
    const [dataOrderInfo, setDataOrderInfo] = useState(null);

    useEffect(() => {
        if (memberIdRef.current) {
            memberIdRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (dataOrderInfo) {
            setAddPointData(prev => ({
                ...prev,
                orderId: dataOrderInfo.orderId || "",
                orderValue: dataOrderInfo.orderValue || ""
            }));
        }
    }, [dataOrderInfo]);

    const handleChange = ({ target: { name, value } }) => {
        setAddPointData(prev => ({ ...prev, [name]: value }));
    };

    const handleKeyDown = async (e, field) => {
        if (e.key === "Enter" && addPointData[field]?.trim()) {
        if (field === "memberId") {
            await fetchMemberData(addPointData.memberId);
            if (!errors.memberId) {
                orderIdRef.current?.focus();
            } else {
                memberIdRef.current?.select();
            }
        } else if (field === "orderId") {
            await fetchInfoOrder(addPointData.orderId);
            if (!errors.orderId) {
                orderValueRef.current?.focus();
            } else {
                orderIdRef.current?.select();
            }
        }
    }
    };

    const handleToggleModal = () => setValidateModal(prev => !prev);

    const fetchMemberData = async (memberId) => {
        try {
            const data = await getMemberInfo(memberId, userId);
            if (!data) {
                setErrors(prev => ({ ...prev, memberId: "Mã khách hàng không hợp lệ!" }));
                setDataFetch(null);
                setTimeout(() => {
                    memberIdRef.current?.focus();
                    memberIdRef.current?.select();
                }, 0);
                return;
            }
            setDataFetch(data);
            setErrors(prev => ({ ...prev, memberId: "" }));

            // Nếu hợp lệ, tự động chuyển xuống input orderId
            setTimeout(() => {
                orderIdRef.current?.focus();
            }, 0);
        } catch (error) {
            setErrors(prev => ({ ...prev, memberId: "Lỗi lấy dữ liệu khách hàng!" }));
            setDataFetch(null);
            setTimeout(() => {
                memberIdRef.current?.focus();
                memberIdRef.current?.select();
            }, 0);
        }
    };

    const fetchInfoOrder = async (orderId) => {
        try {
            const data = await getOrderInfo(orderId);
            if (!data) {
                setErrors(prev => ({ ...prev, orderId: "Mã hóa đơn không hợp lệ!" }));
                setDataOrderInfo(null); // Xóa thông tin hóa đơn nếu không hợp lệ
                setTimeout(() => {
                    orderIdRef.current?.focus();
                    orderIdRef.current?.select();
                }, 0);
                return;
            }
            setDataOrderInfo(data);
            setErrors(prev => ({ ...prev, orderId: "" }));
        } catch (error) {
            setErrors(prev => ({ ...prev, orderId: "Lỗi lấy thông tin đơn hàng!" }));
            setDataOrderInfo(null);
            setTimeout(() => {
                orderIdRef.current?.focus();
                orderIdRef.current?.select();
            }, 0);
        }
    };

    const handleSubmit = async () => {
        if (!addPointData.memberId || !addPointData.orderId || !addPointData.orderValue) {
            toast.error("Vui lòng nhập đủ thông tin.");
            return;
        }

        try {
            const response = await createTransaction(addPointData, userId);
            if (response.status !== "Success") {
                toast.error(response.message);
            } else {
                toast.success(response.message);
                handleShow(null);
                reloadData();
            }
        } catch (error) {
            console.error("Lỗi gửi giao dịch:", error);
            toast.error("Có lỗi xảy ra khi gửi giao dịch.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-[400px] p-5 bg-white rounded-lg shadow-lg border border-gray-300 relative pointer-events-auto z-100">
            <button onClick={() => handleShow(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition">
                <IoCloseCircle size={25} />
            </button>
            <h1 className="text-2xl font-bold text-gray-700">{validateModal ? "Xác nhận giao dịch" : "Tích điểm"}</h1>
            {validateModal ? (
                <ValidateSubmitModal
                    orderValue={addPointData.orderValue}
                    memberName={dataFetch?.memberName}
                    handleToggleModal={handleToggleModal}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <div className="w-full space-y-4">
                    {["memberId", "orderId"].map((field, idx) => (
                        <div key={idx} className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                {field === "memberId" ? "Mã khách hàng" : "Mã hóa đơn"}
                            </label>
                            <input
                                type="text"
                                name={field}
                                value={addPointData[field]}
                                onChange={handleChange}
                                disabled={field === "orderId" ? (!addPointData.memberId || errors.memberId) : false} // Khóa orderId nếu memberId sai
                                onKeyDown={(e) => handleKeyDown(e, field)}
                                ref={field === "memberId" ? memberIdRef : field === "orderId" ? orderIdRef : orderValueRef}
                                placeholder={`Nhập ${field === "memberId" ? "mã khách hàng" : "mã hóa đơn"}...`}
                                className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 transition"
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

                            {field === "orderId" && dataOrderInfo && !errors.orderId && (
                                <div>
                                    <p className="block text-sm font-medium text-gray-600 mb-1 mt-2">Mã hóa đơn</p>
                                    <input type="text" placeholder={dataOrderInfo?.orderId} disabled={true}
                                        className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 transition"
                                    />
                                    <p className="block text-sm font-medium text-gray-600 mb-1 mt-2">Giá trị hóa đơn</p>
                                    <input type="text" placeholder={formatNumber(dataOrderInfo?.orderValue) + " VNĐ"} disabled={true}
                                        className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 transition"
                                    />
                                    <span className="text-green-800 text-[12px] font-bold uppercase">{speakNumber(dataOrderInfo?.orderValue)}</span>
                                </div>
                            )}
                        </div>
                    ))}


                    <div className="flex justify-end gap-2">
                        <button onClick={handleToggleModal} className="w-full bg-gray-700 text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">Gửi</button>
                        <button onClick={() => handleShow(null)} className="w-full bg-red-700 text-white font-medium py-2 rounded-md hover:bg-red-800 transition">Hủy bỏ</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPoin;

