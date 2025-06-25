import DataTableWithPagination from "../common/DataTableWithPagination"
import { useEffect, useState } from "react";
import { getListMemberBalance } from "../../apis/dashboard";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
const columns = [
    { key: "memberName", label: "Tên thành viên" },
    { key: "memberPhone", label: "SĐT" },
    { key: "totalTransaction", label: "Số giao dịch" },
    { key: "currentBalance", label: "Số tiền đã dùng" },
];
const ListMemberBalance = () => {
    const [searchParams, setSearchParams] = useState(
        {
            "page": 1,
            "pageSize": 10,
            "memberName": "",
            "memberPhone": ""
        })
    const [dataBalance, setDataBalance] = useState(null)
    const userId = useSelector(state => state.auth.userId)
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getListMemberBalance(searchParams, userId)
            .then((response) => {
                if (response) {
                    setDataBalance(response || []);
                }
            })
            .finally(() => setLoading(false));
    }, [searchParams.page]);

    console.log("Set thành công dataBalance:", dataBalance?.transactions);
    return (
        <>
            {
                loading ? <Loading /> : <DataTableWithPagination
                    data={dataBalance?.transactions || []}
                    columns={columns}
                    currentPage={dataBalance?.page || 1}
                    totalPages={dataBalance?.totalPage || 1}
                    onPageChange={(newPage) => {
                        setSearchParams((prev) => ({
                            ...prev,
                            page: newPage,
                        }));
                    }}
                />
            }

        </>
    )
}

export default ListMemberBalance