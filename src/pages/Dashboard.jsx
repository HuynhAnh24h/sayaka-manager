import MainLayout from '../layout/MainLayout'
import { formatDate, formatNumber,formatRestaurantName } from '../helper/FormatData'
import ListMemberBalance from '../components/dashboard/ListMemberBalance'
const Dashboard = () => {

  return (
    <MainLayout>
        <ListMemberBalance />
    </MainLayout>
  )
}

export default Dashboard