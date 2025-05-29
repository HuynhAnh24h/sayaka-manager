import { formatNumber,speakNumber } from "../../helper/FormatData"
const ValidateSubmitModal = ({orderValue, memberName, handleSubmit, handleToggleModal}) => {
  return (
    <div className="w-full h-full">
        <p className="text-center text-lg"> Bạn có xác nhận giao dịch <span className="font-bold text-green-800">{formatNumber(Number(orderValue))} VNĐ </span> 
             cho khách hàng <span className=" font-bold text-green-800">{memberName}</span>.</p>
        <div className="flex justify-between items-center py-3 gap-2">
            <button  onClick={handleSubmit}
            className="w-full bg-gray-700 outline-none text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">Xác nhận</button>
            <button 
                onClick={handleToggleModal}
            className="w-full bg-red-700 outline-none text-white font-medium py-2 rounded-md hover:bg-red-800 transition">Hủy</button>
        </div>
    </div>
  )
}

export default ValidateSubmitModal