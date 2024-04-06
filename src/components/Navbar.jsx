import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-800 text-white py-2" >
        <div className="logo">
            <span className="font-bold text-xl mx-9">ToDo</span>
        </div>
      <ul className='flex gap-8 mx-9'>
        <li><a href="#">Home</a></li>
        <li><a href="#">Your Tasks</a></li>
      </ul>
    </nav>
  )
}

export default Navbar