import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTransactions } from '../api';

const useMemberPoin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const userIdLocal = useSelector((state) => state.auth.userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = { restaurantId: "", memberId: "", page: 1, pageSize: 100, transactionType: 0, memberPhone: "" };
                const result = await getTransactions(postData, userIdLocal);
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error("Error loading MemberPoin:", error);
            }
        };
        fetchData();
    }, [userIdLocal]);

    return { data, loading };
};

export default useMemberPoin;