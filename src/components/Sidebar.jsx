import { NavLink } from "react-router-dom";
import { MdOutlineRememberMe } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/Auth/AuthSlice";
import { FaNetworkWired, FaCode } from "react-icons/fa";

const Sidebar = () => {
    const dispatch = useDispatch()
    const position = useSelector(state => state.auth.position)
    console.log(position)
    return (
        <div className="w-64 h-full bg-gray-800 text-white p-4 relative">
            <div className="text-lg font-bold mb-6 text-center">Sayaka Manager</div>
            <div className="mb-6">
                <ul className="flex flex-col space-y-4">
                    <li className="mb-2">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`
                            }
                        >
                            <MdOutlineRememberMe className="inline-block mr-2" />
                            Tích điểm thành viên
                        </NavLink>
                    </li>
                    {position !== "Cashier" && (
                        <>
                            <li className="mb-2">
                                <NavLink 
                                    to="/ip-manager" 
                                    className={({ isActive }) => 
                                        `flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`
                                    }
                                >
                                    <FaNetworkWired className="inline-block mr-2" />
                                    Quản lý IP
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink 
                                    to="/test-page-component" 
                                    className={({ isActive }) => 
                                        `flex items-center font-bold text-md px-5 py-2 rounded-sm transition-all ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`
                                    }
                                >
                                    <FaCode className="inline-block mr-2" />
                                    Developer Page
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="absolute bottom-5 left-3 right-3">
                <button 
                    className="w-full bg-gray-500 rounded-md px-3 py-3 transition-all font-bold hover:bg-red-800" 
                    onClick={() => dispatch(logout())}
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
