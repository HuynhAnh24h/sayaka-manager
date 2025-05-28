import React, { useEffect } from 'react'

const ListMmember = ({data}) => {
    useEffect(() => {
        
    }, []);
  return (
    <>
        <table className='min-w-full bg-white border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-4 py-2 border-b text-center'>ID</th>
                        <th className='px-4 py-2 border-b text-center'>Tên thành viên</th>
                        <th className='px-4 py-2 border-b text-center'>Số điện thoại</th>
                        <th className='px-4 py-2 border-b text-center'>Ngày tích điểm</th>
                        <th className='px-4 py-2 border-b text-center'>Điểm tích</th>
                        <th className='px-4 py-2 border-b text-center'>Hành động</th>
                    </tr>
            </thead>
            <tbody>
                    {/* Example row */}
                    {data && data.map((member, index) => (
                        <tr key={index} className='hover:bg-gray-50'>
                            <td className='px-4 py-2 border-b text-center'>{member.id}</td>
                            <td className='px-4 py-2 border-b text-center'>{member.memberName}</td>
                            <td className='px-4 py-2 border-b text-center'>{member.memberPhone}</td>
                            <td className='px-4 py-2 border-b text-center'>{member.transactionValue}</td>
                            <td className='px-4 py-2 border-b text-center'>{member.transactionDate}</td>
                            <td className='px-4 py-2 border-b text-center'>
                                <button className='text-blue-500 hover:underline'>Xem chi tiết</button>
                            </td>
                        </tr>
                    ))}
                    {/* Static row for demonstration */}
            </tbody>
        </table>
    </>
  )
}

export default ListMmember