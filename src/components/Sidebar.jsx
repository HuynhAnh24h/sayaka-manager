import { Link } from "react-router-dom"
import { MdDashboard } from "react-icons/md"
import { AiFillProduct } from "react-icons/ai"
import { PiWarehouseFill } from "react-icons/pi"
import { FaBox } from "react-icons/fa"
import { FaFileExport } from "react-icons/fa6"
import { BiSolidReport } from "react-icons/bi"
import { MdOutlineRememberMe } from "react-icons/md"
import { useState } from "react"

const Sidebar = () => {
    const [menuStates, setMenuStates] = useState({});

    const toggleMenu = (menuKey) => {
        setMenuStates((prevState) => ({
            ...prevState,
            [menuKey]: !prevState[menuKey]
        }));
    };
    return (
        <div className="w-64 h-full bg-gray-800 text-white p-4">
            <div className="text-lg font-bold mb-6 text-center">Sayaka Manager</div>
            <div className="mb-6">
                <ul className="flex flex-col space-y-4">
                    <li className="mb-2">
                        <Link to="/" className="hover:text-gray-white hover:bg-gray-700 
                            flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all">
                            <MdDashboard className="inline-block mr-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/member-poin" className="hover:text-gray-white hover:bg-gray-700 
                            flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all" onClick={() => toggleMenu("productsMenu")}>
                            <MdOutlineRememberMe className="inline-block mr-2"/>
                            Tích điểm thành viên
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/" className="hover:text-gray-white hover:bg-gray-700 
                            flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all" onClick={() => toggleMenu("productsMenu")}>
                            <AiFillProduct className="inline-block mr-2"/>
                            Quản lý sản phẩm
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/" className="hover:text-gray-white hover:bg-gray-700 
                            flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all">
                            <PiWarehouseFill className="inline-block mr-2"/>
                            Quản lý kho
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/" className="hover:text-gray-white hover:bg-gray-700 
                            flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all">
                            <FaBox className="inline-block mr-2"/>
                            Đóng hàng
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/" className="hover:text-gray-white hover:bg-gray-700 
                            flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all">
                            <FaFileExport className="inline-block mr-2" />
                            Xuất hàng
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/" className="hover:text-gray-white hover:bg-gray-700 
                            flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all">
                            <BiSolidReport className="inline-block mr-2" />
                            Báo cáo
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar