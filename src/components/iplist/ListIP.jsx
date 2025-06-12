
import { FaTrashAlt } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { FaCheck } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
const ListIP = ({data,handelGetOneItem,handleDelete}) => {
    return (
        <>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-700 font-semibold">
                        <th className="px-4 py-3 border-b text-center">STT</th>
                        <th className="px-4 py-3 border-b text-left">Tên IP</th>
                        <th className="px-4 py-3 border-b text-left">Địa chỉ IP</th>
                        <th className="px-4 py-3 border-b text-center">Trạng thái</th>
                        <th className="px-4 py-3 border-b text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((value,index)=>(
                        <tr key={value.id} className="hover:bg-gray-100 border-b hover:cursor-pointer transition-colors">
                            <td className="px-4 py-3 text-center">{index+1}</td>
                            <td className="px-4 py-3 ">{value.ipName}</td>
                            <td className="px-4 py-3 ">{value.ipValue}</td>
                            <td className="px-4 py-3 text-center ">{value.isEnabled ? (
                                <p className="text-xl flex justify-center items-center text-green-800"><FaCheck /></p>):
                                (<p className="text-xl flex justify-center items-center text-red-800"><IoMdClose /></p>)}
                            </td>
                            <td className="px-4 py-3 flex justify-center items-center gap-2">
                                <button 
                                // Truyền ID vào cho hàm handle sử dụng
                                onClick={() => handelGetOneItem(value.id)}
                                className='bg-yellow-600 text-white rounded-md py-2 hover:bg-yellow-800 transition px-5
                                    font-semibold   
                                '><MdEdit /></button>
                                <button className='bg-red-600 text-white rounded-md py-2 hover:bg-red-800 transition px-5
                                    font-semibold
                                'onClick={()=>handleDelete(value.id)}><FaTrashAlt /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ListIP