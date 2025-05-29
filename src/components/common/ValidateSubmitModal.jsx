import { formatNumber } from "../../helper/FormatData"

const ValidateSubmitModal = ({dataAPI,dataSumit,handleModal,handleSend}) => {
  return (
    <div className="w-full h-full">
        <p className="text-center text-lg"> Bạn có xác nhận giao dịch <span className="font-bold text-green-800">{formatNumber(Number(dataSumit.orderValue))} VNĐ </span> 
             cho khách hàng <span className=" font-bold text-green-800">{dataAPI.memberName}</span>.</p>
        <div className="flex justify-between items-center py-3 gap-2">
            <button  onClick={handleSend}
            className="w-full bg-gray-800 outline-none text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">Xác nhận</button>
            <button 
                onClick={handleModal}
            className="w-full bg-red-800 outline-none text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">Hủy</button>
        </div>
    </div>
  )
}

export default ValidateSubmitModal