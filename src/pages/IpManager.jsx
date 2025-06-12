import { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { ListIP } from '../components/iplist'
import { getListIP,getOneIp } from '../apis/ipManager'
import { useSelector } from 'react-redux'
import { Loading } from '../components'

const IpManager = () => {
    const userId = useSelector((state) => state.auth.userId)
    const [fetchListData, setFetchListData] = useState(null)
    const [fetchOndeDataItem, setOneDataItem] = useState(null)
    const [loading, setLoading] = useState(false)
    // Get All list
    useEffect(() => {
        setLoading(true);
        getListIP(userId)
            .then((response) => {
                if (response) {
                    setFetchListData(response.data)
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handelGetOneItem = async (id) => {
       const oneIpData = await getOneIp(userId,id)
       if(oneIpData){
           setOneDataItem(oneIpData.data)
       }else{
            console.log("Không có dữ liệu cho data này")
       }
    }
    console.log("Data vừa lấy của 1 user là: ",fetchOndeDataItem)


    const handleUpdateItem = async (userId,id) =>{
        console.log(userId, id)
    }
    const handleDelete = async (id)=>{
        if(id){
            console.log(id)
        }else{
            console.log("không có ID")
        }
    }

    const handleModal = () =>{

    }
    return (
        <MainLayout>
            <div className='flex flex-col gap-3'>
                <div className='flex justify-end items-center'>
                    <button className='bg-gray-700 text-white rounded-md py-2 hover:bg-gray-800 transition px-5
                    font-semibold
                '>
                        Thêm IP
                    </button>
                </div>
                {
                    loading ? <Loading /> : 
                    <ListIP 
                        data={fetchListData} 
                        handelGetOneItem={handelGetOneItem} 
                        handleDelete={handleDelete} 
                        handleModal={handleModal}
                    />
                }
            </div>
        </MainLayout>
    )
}

export default IpManager