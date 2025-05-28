import { NavLink } from "react-router-dom"
import { MdDashboard } from "react-icons/md"
import { AiFillProduct } from "react-icons/ai"
import { PiWarehouseFill } from "react-icons/pi"
import { FaBox } from "react-icons/fa"
import { FaFileExport } from "react-icons/fa6"
import { BiSolidReport } from "react-icons/bi"
import { MdOutlineRememberMe } from "react-icons/md"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../stores/Auth/AuthSlice"
const Sidebar = () => {
    const dispatch = useDispatch();
    const [menuStates, setMenuStates] = useState({});

    const toggleMenu = (menuKey) => {
        setMenuStates((prevState) => ({
            ...prevState,
            [menuKey]: !prevState[menuKey]
        }));
    };
    return (
        <div className="w-64 h-full bg-gray-800 text-white p-4 relative
        ">
            <div className="text-lg font-bold mb-6 text-center">Sayaka Manager</div>
                <div className="mb-6 ">
                    <ul className="flex flex-col space-y-4">
                        <li className="mb-2">
                            <NavLink to="/" className={({ isActive }) => isActive ? "text-gray-white bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all" : "hover:text-gray-white hover:bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all"}>
                                <MdDashboard className="inline-block mr-2" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink to="/member-poin" className={({ isActive }) => isActive ? "text-gray-white bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all" : "hover:text-gray-white hover:bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all"}>
                                <MdOutlineRememberMe className="inline-block mr-2" />
                                Tích điểm thành viên
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink to="/product-manager" className={({ isActive }) => isActive ? "text-gray-white bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all" : "hover:text-gray-white hover:bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all"} onClick={() => toggleMenu("productsMenu")}>
                                <AiFillProduct className="inline-block mr-2" />
                                Quản lý sản phẩm
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink to="/warehourse" className={({ isActive }) => isActive ? "text-gray-white bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all" : "hover:text-gray-white hover:bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all"}>
                                <PiWarehouseFill className="inline-block mr-2" />
                                Quản lý kho
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink to="/package-product" className={({ isActive }) => isActive ? "text-gray-white bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all" : "hover:text-gray-white hover:bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all"}>
                                <FaBox className="inline-block mr-2" />
                                Đóng hàng
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink to="/product-delivery" className={({ isActive }) => isActive ? "text-gray-white bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all" : "hover:text-gray-white hover:bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all"}>
                                <FaFileExport className="inline-block mr-2" />
                                Xuất hàng
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink to="/report" className={({ isActive }) => isActive ? "text-gray-white bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all" : "hover:text-gray-white hover:bg-gray-700 flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all"}>
                                <BiSolidReport className="inline-block mr-2" />
                                Báo cáo
                            </NavLink>
                        </li>
                    </ul>
                     
                </div>
           <div className="absolute bottom-5 left-3 right-3">
                    <button className="w-full bg-gray-500 rounded-md px-3 py-3 
                    transition-all font-bold
                    hover:cursor-pointer hover:bg-blue-800 "
                    onClick={() => dispatch(logout())}
                    >Đăng xuất</button>
            </div>
        </div>
    )
}

export default Sidebar