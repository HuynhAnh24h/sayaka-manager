import { formatDate, formatNumber,formatRestaurantName } from '../../helper/FormatData'
const ListMmember = ({ data,paginationControls,  currentPage, totalPage }) => {
    return (
        <>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-700 font-semibold">
                        <th className="px-4 py-3 border-b text-center">Mã GD</th>
                        <th className="px-4 py-3 border-b text-left">Ngày tích điểm</th>
                        <th className="px-4 py-3 border-b text-left">Tên thành viên</th>
                        <th className="px-4 py-3 border-b text-left">Số điện thoại</th>
                        <th className="px-4 py-3 border-b text-center">Số điểm</th>
                        <th className="px-4 py-3 border-b text-center">Giá trị hóa đơn</th>
                        <th className="px-4 py-3 border-b text-center">Nhà hàng</th>
                        <th className="px-4 py-3 border-b text-center">Mã hóa đơn</th>
                        <th className="px-4 py-3 border-b text-left">Tiêu đề</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((member, index) => (
                        <tr key={index} className="hover:bg-gray-100 border-b hover:cursor-pointer transition-colors">
                            <td className="px-4 py-3 text-center">{member.id}</td>
                            <td className="px-4 py-3">{formatDate(member.transactionDate)}</td>
                            <td className="px-4 py-3">{member.memberName}</td>
                            <td className="px-4 py-3">{member.memberPhone}</td>
                            <td className={`${member.transactionValue > 0 ? "text-green-600" : "text-red-600"} text-center font-bold px-4 py-3`}>
                                {formatNumber(member.transactionValue)}
                            </td>
                            <td className=' text-center px-4 py-3'>
                                {member.orderValue > 0 ? formatNumber(member.orderValue) : <p className="text-red-600 font-bold">-</p>}
                            </td>
                            <td className="px-4 py-3 text-center">{formatRestaurantName(member.restaurant)}</td>
                            <td className="px-4 py-3 text-center">{member.orderId ? member.orderId : <p className="text-red-600 font-bold">-</p>}</td>
                            <td className="px-4 py-3">{member.transactionTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600 flex items-center gap-2 font-semibold">
                    <span>Tổng số giao dịch: {data ? data.length : 0}</span> | <span>Trang { currentPage} / {totalPage}</span>
                </p>
                {paginationControls}
            </div>
        </>
    )
}

export default ListMmember