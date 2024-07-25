import React from 'react'
import '../styles/component/navbar.scss'
import { FiAlignJustify } from 'react-icons/fi'

const Navbar = () => {
  return (
    <nav>
        <div className=" md:hidden flex justify-between items-center">
            <label className="logo">Tutorin</label>
            <label htmlFor="check" className="checkbtn">
                <FiAlignJustify />
            </label>
        </div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
            <FiAlignJustify />
        </label>
        <label className="logo">Tutorin</label>
        <ul>
            <li><a className="#" href="#">Promotions</a></li>
            <li><a href="#">Students</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">Location</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
  )
}

export default Navbar