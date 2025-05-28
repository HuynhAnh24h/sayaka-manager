import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { FaSearch } from "react-icons/fa"
import { FaFilter } from "react-icons/fa"
import { ListMember } from '../components'
import axios from 'axios'
const MemberPoin = () => {
    const [data, setData] = useState(null);
    const [searchParams, setSearchParams] = useState({
        restaurantId: "",
        memberId: "",
        page: 1,
        pageSize: 100,
        transactionType: 0,
        memberPhone: "",
        startDate: "", 
        endDate: "" 
    });

    const handleSearch = () => {
        axios.post("https://member.sayaka.vn/api/transactions/get-list-transactions", searchParams)
        .then(response => {
            setData(response.data); // Nhận dữ liệu đã lọc từ API
        })
        .catch(error => {
            console.error("Lỗi khi gọi API:", error);
        });
    }

    // Fetch MemberPoin data
    useEffect(() => {
        try {
            const postData = {
                restaurantId: "",
                memberId: "",
                page: 1,
                pageSize: 100,
                transactionType: 0,
                memberPhone: ""
            }
            axios.post('https://member.sayaka.vn/api/transactions/get-list-transactions', postData)
                .then(response => {
                    setData(response.data);
                    console.log("MemberPoin data:", response.data);
                })
                .catch(error => {
                    console.error("Error fetching MemberPoin data:", error);
                });
        } catch (error) {
            console.error("Error loading MemberPoin:", error);
        }
    }, []);
    return (
        <MainLayout>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold'>Tích điểm thành viên</h1>
                <button className='bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-800 transition'>
                    Thêm thành viên
                </button>
            </div>
            <div className='flex justify-between items-center mb-4'>
                {/* Form Control List */}
                <div className='flex flex-wrap gap-3 space-y-4 items-end justify-between'>
                    <div className='flex flex-col mb-1 items-start'>
                        <label className='block text-sm font-medium mb-1'>Tên thành viên</label>
                        <input type="text" className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm'
                            value={searchParams.memberName}
                            onChange={(e) => setSearchParams({ ...searchParams, memberName: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col mb-1 items-start'>
                        <label className='block text-sm font-medium mb-1'>Nhà hàng</label>
                        <select className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm'>
                            <option value="">Chọn nhà hàng</option>
                            {data && [...new Set(data.map(res => res.restaurant))].map((restaurant, index) => (
                                <option key={index} value={restaurant}>
                                    {restaurant}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col mb-1 items-start'>
                        <label className='block text-sm font-medium mb-1'>Số điện thoại</label>
                        <input type="text" className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm' 
                            value={searchParams.memberPhone}
                            onChange={(e) => setSearchParams({ ...searchParams, memberPhone: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col mb-1 items-start'>
                        <label className='block text-sm font-medium mb-1'>Loại giao dịch</label>
                        <select className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm'>
                            <option value="">Chọn giao dịch</option>
                            <option value="restaurant1">Giao dịch 1</option>
                            <option value="restaurant2">Giao dịch 2</option>
                            <option value="restaurant3">Giao dịch 3</option>
                            <option value="restaurant4">Giao dịch 4</option>
                        </select>
                    </div>
                    <div className='flex flex-col mb-1 items-start'>
                        <label className='block text-sm font-medium mb-1'>Ngày bắt đầu</label>
                        <input type="date" className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm' 
                            value={searchParams.startDate}
                            onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col mb-1 items-start'>
                        <label className='block text-sm font-medium mb-1'>Ngày kết thúc</label>
                        <input type="date" className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm' />
                    </div>
                    <div className='flex flex-col mb-1 items-center'>
                        <button className='bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-800 transition'
                            onClick={handleSearch}
                        >
                            <FaFilter className='inline-block mr-2' />
                            Lọc
                        </button>
                    </div>
                </div>
                {/* Form Control List */}
            </div>
            <div className='overflow-x-auto overflow-y-scroll min-h-[calc(100vh-300px)]'>
                {data && data.length > 0 ? (
                    <ListMember data={data} />
                ) : (
                    <div className='text-center py-10'>
                        <p className='text-gray-500'>Không có dữ liệu thành viên.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default MemberPoin