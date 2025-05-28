import { useSelector } from "react-redux"
import avatar from "../assets/avatar.webp"

const Header = () => {
  const userName = useSelector((state) => state.auth.userFullName);
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold"></div>
      <nav>
        <ul className="flex justify-center items-center space-x-4">
            <div className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'>
                <img src={avatar} alt="Đây là cái avatar của tui" className="rounded-full" />
            </div>
            {
              userName ? (
                <p className="text-white font-semibold">
                  {userName}
                </p>
              ) : (<p></p>)
            }
        </ul>
      </nav>
    </div>
  )
}

export default Header