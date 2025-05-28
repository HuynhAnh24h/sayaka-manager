import { useEffect, useState,useRef} from 'react'
import MainLayout from '../layout/MainLayout'
import { FaFilter } from "react-icons/fa"
import { ListMember, AddPoin, UsePoin } from '../components/member'
import { useSelector } from 'react-redux'
import { Loading } from '../components'
import axios from 'axios'
const MemberPoin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const modalRef = useRef(null);
     const [activeTab, setActiveTab] = useState(null);
    const [searchParams, setSearchParams] = useState({
        restaurantId: "",
        memberId: "",
        page: 1,
        pageSize: 100,
        transactionType: 0,
        memberPhone: "",
        startDate: "",
        endDate: "",
    });
    const userIdLocal = useSelector((state) => state.auth.userId);
    const handleSearch = () => {
        console.log("searchParams", searchParams);
        // axios.post("https://member.sayaka.vn/api/transactions/get-list-transactions", searchParams)
        //     .then(response => {
        //         setData(response.data); // Nhận dữ liệu đã lọc từ API
        //     })
        //     .catch(error => {
        //         console.error("Lỗi khi gọi API:", error);
        //     });
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
            const config = {
            headers: {
                "userId": userIdLocal // Thay thế bằng User ID thực tế
            }
        };
            axios.post('https://member.sayaka.vn/api/transactions/get-list-transactions',postData,config)
                .then(response => {
                    setData(response.data);
                    setLoading(false)
                })
                .catch(error => {
                    console.error("Error fetching MemberPoin data:", error);
                });
        } catch (error) {
            console.error("Error loading MemberPoin:", error);
        }
    }, []);

    // Control active tab
    useEffect(() => {
    if (!activeTab) return;
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setActiveTab(null); // Đóng popup
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [activeTab]);
    return (
        <MainLayout>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-3">
                <h1 className="text-2xl font-bold">Tích điểm thành viên</h1>
                <div className='flex items-center space-x-2'>
                    <button className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-800 transition"
                        onClick={() => setActiveTab("addPoin")}>
                        Tích điểm
                    </button>
                    <button className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-800 transition"
                        onClick={() => setActiveTab("usePoin")}>
                        Sử dụng điểm
                    </button>
                </div>
            </div>
             {activeTab === "addPoin" && (
                <div ref={modalRef} className="fixed top-0 left-0 right-0 bg-[rgba(0,0,0,0.1)] pointer-events-none
                p-4 shadow-md z-50 h-screen flex justify-center items-center">
                    <AddPoin handleShow={setActiveTab} />
                </div>
            )}
            {activeTab === "usePoin" && (<div ref={modalRef} className="fixed top-0 left-0 right-0 bg-[rgba(0,0,0,0.1)] pointer-events-none 
            p-4 shadow-md z-50 h-screen flex justify-center items-center">
                    <UsePoin handleShow={setActiveTab}/>
            </div>)}

            <div className="mb-4">
                {/* Form Control List */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {/* Tên thành viên */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1">Tên thành viên</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-600 rounded-md"
                            value={searchParams.memberName}
                            onChange={(e) => setSearchParams({ ...searchParams, memberName: e.target.value })}
                        />
                    </div>

                    {/* Nhà hàng */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1">Nhà hàng</label>
                        <select className="w-full px-3 py-2 border border-gray-600 rounded-md">
                            <option value="">Chọn nhà hàng</option>
                            {data && [...new Set(data.map(res => res.restaurant))].map((restaurant, index) => {
                                const restaurantData = data.find(res => res.restaurant === restaurant);
                                return (
                                    <option key={index} value={restaurantData?.restaurantId}>
                                        {restaurant}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Số điện thoại */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-600 rounded-md"
                            value={searchParams.memberPhone}
                            onChange={(e) => setSearchParams({ ...searchParams, memberPhone: e.target.value })}
                        />
                    </div>

                    {/* Ngày bắt đầu */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-600 rounded-md"
                            value={searchParams.startDate}
                            onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
                        />
                    </div>

                    {/* Ngày kết thúc */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-600 rounded-md" />
                    </div>

                    {/* Button Lọc */}
                    <div className="flex justify-start items-end">
                        <button className="bg-gray-700 text-white inline-block w-[50%] rounded-md py-2
                        hover:bg-gray-800 
                        
                        transition">
                            <FaFilter className="inline-block mr-2" />
                            Lọc
                        </button>
                    </div>
                </div>
            </div>

          {
            loading ? <Loading/>:(

            <div className="overflow-auto min-h-[calc(100vh-300px)]">
                {data && data.length > 0 ? (
                    <ListMember data={data} />
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Không có dữ liệu thành viên.</p>
                    </div>
                )}
            </div>
            )
          }

        </MainLayout>
    )
}

export default MemberPoin