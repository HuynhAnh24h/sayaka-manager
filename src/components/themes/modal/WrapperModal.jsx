
// Components để hiển thị layout cho modal
const WrapperModal = ({open,onClose, children}) => {
  return (
    <div className="fixed top-0 left-0 width-full h-screen flex justify-center items-center">
      <div className="max-w-md bg-white rounded-sm shadow-md">
        {children}  
      </div>
    </div>
  )
}

export default WrapperModal