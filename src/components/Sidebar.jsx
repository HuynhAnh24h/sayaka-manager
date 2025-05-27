import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4">
      <ul>
        <li className="mb-2">
            <Link to="/" className="hover:text-gray-400">QL Member Poin</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar