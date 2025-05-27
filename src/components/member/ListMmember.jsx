import React, { useEffect } from 'react'

const ListMmember = ({id, name, }) => {
    useEffect(() => {
        
    }, []);
  return (
    <>
        <table className='min-w-full bg-white border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-4 py-2 border-b text-center'>ID</th>
                        <th className='px-4 py-2 border-b text-center'>Tên thành viên</th>
                        <th className='px-4 py-2 border-b text-center'>Số điểm</th>
                        <th className='px-4 py-2 border-b text-center'>Ngày tích điểm</th>
                        <th className='px-4 py-2 border-b text-center'>Hành động</th>
                    </tr>
            </thead>
            <tbody>
                    {/* Example row */}
                    <tr className='hover:bg-gray-50'>
                        <td className='px-4 py-2 border-b text-center'>1</td>
                        <td className='px-4 py-2 border-b text-center'>Nguyễn Văn A</td>
                        <td className='px-4 py-2 border-b text-center'>1000</td>
                        <td className='px-4 py-2 border-b text-center'>2023-10-01</td>
                        <td className='px-4 py-2 border-b text-center'>
                            <button className='text-blue-500 hover:underline'>Xem chi tiết</button>
                        </td>
                    </tr>
                    {/* Add more rows as needed */}
            </tbody>
        </table>
    </>
  )
}

export default ListMmember