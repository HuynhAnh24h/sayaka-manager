import React, { useEffect,useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { FaSearch } from "react-icons/fa"
import { FaFilter } from "react-icons/fa";
import { ListMember } from '../components';

const MemberPoin = () => {
    const [searchTerm, setSearchTerm] = useState({
        name: '',
        phone: '',
        restaurantID: '',
        memberId: '',
        page: '1',
        pageSize: '10',
        transactionType: '',
        memberPoin:""
    });
    useEffect(() => {
        try{
            
            const fetchMemberPoin = async () => {
                // Simulate fetching member points data
                const response = await fetch('https://member.sayaka.vn/api/transactions/get-list-transactions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
            }
        }catch(error){
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
                        value={searchTerm.name}
                        onChange={(e) => setSearchTerm({ ...searchTerm, name: e.target.value })}
                    />
                </div>
                <div className='flex flex-col mb-1 items-start'>
                    <label className='block text-sm font-medium mb-1'>Nhà hàng</label>
                    <select className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm'
                        value={searchTerm.restaurantID} 
                        onChange={(e) => setSearchTerm({ ...searchTerm, restaurantID: e.target.value })}>
                        <option value="">Chọn nhà hàng</option>     
                        <option value="restaurant1">Nhà hàng 1</option>
                        <option value="restaurant2">Nhà hàng 2</option>     
                        <option value="restaurant3">Nhà hàng 3</option>
                        <option value="restaurant4">Nhà hàng 4</option>
                    </select>
                </div>
              
                <div className='flex flex-col mb-1 items-start'>
                    <label className='block text-sm font-medium mb-1'>Số điện thoại</label>
                    <input type="text" className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm' />
                </div>
                <div className='flex flex-col mb-1 items-start'>
                    <label className='block text-sm font-medium mb-1'>Loại giao dịch</label>
                    <select className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm'
                        value={searchTerm.transactionType}      
                        onChange={(e) => setSearchTerm({ ...searchTerm, transactionType: e.target.value })} 
                    >
                        <option value="">Chọn giao dịch</option>     
                        <option value="restaurant1">Giao dịch 1</option>
                        <option value="restaurant2">Giao dịch 2</option>     
                        <option value="restaurant3">Giao dịch 3</option>
                        <option value="restaurant4">Giao dịch 4</option>
                    </select>
                </div>
                <div className='flex flex-col mb-1 items-start'>
                    <label className='block text-sm font-medium mb-1'>Ngày bắt đầu</label>
                    <input type="date" className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm' />
                </div>
                  <div className='flex flex-col mb-1 items-start'>
                    <label className='block text-sm font-medium mb-1'>Ngày kết thúc</label>
                    <input type="date" className='w-full px-2 py-1 outline-none border boder-gray-600 rounded-sm' />
                </div>
                <div className='flex flex-col mb-1 items-center'>
                    <button className='bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-800 transition'>
                        <FaFilter className='inline-block mr-2'/>
                        Lọc
                    </button>
                </div>
           </div>
           {/* Form Control List */}
        </div>
        <div className='overflow-x-auto overflow-y-scroll min-h-[calc(100vh-300px)]'>
            <ListMember />
        </div>
    </MainLayout>    
  )
}

export default MemberPoin