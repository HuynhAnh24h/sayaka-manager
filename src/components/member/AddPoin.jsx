import { useState } from "react";
const AddPoin = () => {
    const [addPoinData, setAddPoinData] = useState({
        ma_khach_hang: "",
        ma_hoa_don: "",
        gia_tri_hoa_don: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddPoinData({
            ...addPoinData,
            [name]: value
        });
    }
    console.log("Data gửi API",addPoinData)
  return (
    <>
        <div className='flex flex-col justify-center items-center gap-3 w-[50vh] h-[50vh] px-3 py-2 bg-gray-100 rounded-lg shadow-md
            pointer-events-auto z-100
        '>
            <h1 className="text-2xl font-bold">Tích điểm</h1>
            <div>
                <div className='flex flex-col'>
                <label htmlFor="ma_khach_hang" className='block text-sm font-medium mb-1'>Mã khách hàng</label>
                <input type="text" name="ma_khach_hang" id="ma_khach_hang" className='w-full px-3 py-2 border border-gray-600 rounded-md' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="ma_hoa_don" className='block text-sm font-medium mb-1'>Mã hóa đơn</label>
                <input type="text" name="ma_hoa_don" id="ma_hoa_don" className='w-full px-3 py-2 border border-gray-600 rounded-md' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="gia_tri_hoa_don" className='block text-sm font-medium mb-1'>Giá trị hóa đơn</label>
                <input type="text" name="gia_tri_hoa_don" id="gia_tri_hoa_don" className='w-full px-3 py-2 border border-gray-600 rounded-md' />
            </div>
            </div>
        </div>
    </>
  )
}

export default AddPoin