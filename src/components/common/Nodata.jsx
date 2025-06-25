import Loading from "./Loading"

const Nodata = () => {
  return (
     <div className="flex items-center flex-col justify-center h-[80vh] bg-gray-100">
      <div className="text-center text-gray-600">
        <h1 className="text-2xl font-semibold mb-2">Không có dữ liệu thành viên</h1>
      </div>
      <Loading className="h-[30vh]" />
    </div>
  )
}

export default Nodata