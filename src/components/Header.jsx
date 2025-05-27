import React from 'react'

const Header = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">My Application</div>
      <nav>
        <ul className="flex space-x-4">
            <div className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'>
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcellphones.com.vn%2Fsforum%2Favatar-trang&psig=AOvVaw0gD0EvgppZ_UJRNqWLkZxn&ust=1748394272884000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJixvMa6wo0DFQAAAAAdAAAAABAL" alt="" />
            </div>
        </ul>
      </nav>
    </div>
  )
}

export default Header