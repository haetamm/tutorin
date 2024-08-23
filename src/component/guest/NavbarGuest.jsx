import React, { useEffect, useState } from 'react'
import { FaStudiovinari } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { urlPage } from '../../utils/constans'
import '../../styles/component/guest/navbar-guest.scss'
import { useDispatch, useSelector } from 'react-redux'
import { scrollTop } from '../../utils/helper'

const NavbarGuest = () => {
  const { pathname } = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.sidebarGuest.isOpen)

  const toggleSidebarGuest = () => {
    dispatch({
      type: isOpen ? 'CLOSE_SIDEBAR_GUEST' : 'OPEN_SIDEBAR_GUEST',
    })
  }

  const closeNavbar = () => {
    dispatch({
      type: 'CLOSE_SIDEBAR_GUEST'
    })
  }
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { path: urlPage.LOGIN, label: 'Sign', extraClass: '' },
    { path: urlPage.REGISTER_STUDENT, label: 'STUDENT', extraClass: 'hidden md:block border-2 border-black py-1 rounded-md' },
    { path: urlPage.REGISTER_TUTOR, label: 'TEACHER', extraClass: 'hidden md:block border-2 border-black py-1 rounded-md' }
  ]

  const staticLinks = [
    { label: 'Home', extraClass: 'cursor-pointer' },
    { label: 'Services', extraClass: 'cursor-pointer' },
    { label: 'Blog', extraClass: 'cursor-pointer' },
    { label: 'Contact us', extraClass: 'cursor-pointer' }
  ]

  const isActive = (path) => pathname === path

  return (
    <>
      <nav className={`fixed w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : ''} flex justify-end gap-4 lg:gap-0 lg:justify-between items-center`}>
        <div className="logo" onClick={scrollTop}>
          <Link to='/'>
            <FaStudiovinari className="h-[60px] w-[60px] hidden lg:block"/>
          </Link>
          <Link to='/' className="text-2xl mr-2 lg:mr-8 hidden lg:block">Tutorin</Link>
          <div className="hidden lg:flex gap-6 font-semibold">
            {staticLinks.map((link, index) => (
              <div key={index} className={link.extraClass}>{link.label}</div>
            ))}
          </div>
        </div>
        <ul className="flex items-center">
          {navLinks.map((link, index) => (
            <li key={index} className={`${link.extraClass}`}>
              <Link
                to={link.path}
                onClick={() => { scrollTop(); closeNavbar() }}
                className={`${isActive(link.path) ? 'nav-background border-white text-white' : ''} py-2 hover:text-blue-300 cursor-pointer`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div onClick={toggleSidebarGuest} className={`${isOpen ? 'hamburger-active' : ''} hamburger`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </nav>
    </>
  )
}

export default NavbarGuest
