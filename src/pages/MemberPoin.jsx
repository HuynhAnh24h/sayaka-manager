import { useEffect, useState, useRef } from "react";
import MainLayout from "../layout/MainLayout";
import { FaFilter } from "react-icons/fa";
import { ListMember, AddPoin, UsePoin } from "../components/member";
import { useSelector } from "react-redux";
import { Loading } from "../components";
import { getTransactions } from "../apis/memberTransaction";

const MemberPoin = () => {
    const userId = useSelector((state) => state.auth.userId);
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
    });
    useEffect(() => {
        getTransactions(searchParams, userId).then(setData).finally(() => setLoading(false));
    }, []);
    const reloadData = () =>{
         getTransactions(searchParams, userId).then(setData).finally(() => setLoading(false));
    }

    useEffect(() => {
        if (!activeTab) return;
        const handleClickOutside = (event) => modalRef.current && !modalRef.current.contains(event.target) && setActiveTab(null);
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeTab]);

    return (
        <MainLayout>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-3">
                <h1 className="text-2xl font-bold">Tích điểm thành viên</h1>
                <div className="flex space-x-2">
                    {["addPoin", "usePoin"].map((tab) => (
                        <button key={tab} className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-800 transition" onClick={() => setActiveTab(tab)}>
                            {tab === "addPoin" ? "Tích điểm" : "Sử dụng điểm"}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab && (
                <div ref={modalRef} className="fixed inset-0 bg-[rgba(0,0,0,0.1)] flex justify-center items-center">
                    {activeTab === "addPoin" ? <AddPoin handleShow={setActiveTab} reloadData = {reloadData}/> : <UsePoin handleShow={setActiveTab} reloadData={reloadData}/>}
                </div>
            )}

            <div className="mb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {["memberName", "memberPhone", "startDate", "endDate"].map((field, idx) => (
                    <div key={idx} className="flex flex-col">
                        <label className="block text-sm font-medium mb-1">{field === "memberName" ? "Tên thành viên" : field === "memberPhone" ? "Số điện thoại" : field === "startDate" ? "Ngày bắt đầu" : "Ngày kết thúc"}</label>
                        <input type={field.includes("Date") ? "date" : "text"} className="w-full px-3 py-2 border border-gray-600 rounded-md"
                            value={searchParams[field]} onChange={(e) => setSearchParams((prev) => ({ ...prev, [field]: e.target.value }))} />
                    </div>
                ))}

                <div className="flex justify-start items-end">
                    <button className="bg-gray-700 text-white w-[50%] rounded-md py-2 hover:bg-gray-800 transition">
                        <FaFilter className="inline-block mr-2" /> Lọc
                    </button>
                </div>
            </div>

            {loading ? <Loading /> : (
                <div className="overflow-auto min-h-[calc(100vh-300px)]">
                    {data && data.length > 0 ? <ListMember data={data} /> : <div className="text-center py-10"><p className="text-gray-500">Không có dữ liệu thành viên.</p></div>}
                </div>
            )}
        </MainLayout>
    );
};

export default MemberPoin;
