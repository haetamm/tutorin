import React from 'react'
import { FaStudiovinari } from 'react-icons/fa'
import '../../styles/component/guest/sidebar-guest.scss'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { urlPage } from '../../utils/constans'
import { scrollTop } from '../../utils/helper'

const SideBarGuest = () => {
    const { pathname } = useLocation()
    const isOpen = useSelector((state) => state.sidebarGuest.isOpen)
    const dispatch = useDispatch()

    const toggleSidebarGuest = () => {
        dispatch({
            type: isOpen ? 'CLOSE_SIDEBAR_GUEST' : 'OPEN_SIDEBAR_GUEST',
        })
    }
    
    const navItems = [
        { path: urlPage.REGISTER_STUDENT, label: 'Student' },
        { path: urlPage.REGISTER_TUTOR, label: 'Teacher' },
        { path: '#', label: 'Services' },
        { path: '#', label: 'Blog' },
        { path: '#', label: 'Contact Us' }
    ]

    const isActive = (path) => pathname === path

    return (
        <>
            {isOpen && (
                <div className="menubar block lg:hidden h-full">
                    <Link to="/" onClick={() => { scrollTop(); toggleSidebarGuest() }} className="flex p-[10px] pt-1 pb-0 items-center">
                        <FaStudiovinari className="h-[60px] w-[60px]" />
                        <div className="text-2xl mr-2 lg:mr-8">Tutorin</div>
                    </Link>
                    <div className="border-2 border-blue-200 my-2"></div>
                    <ul className="overflow-auto h-screen text-lg">
                        {navItems.map((item, index) => (
                            <li key={index} className="w-full py-1 hover:bg-white rounded-md">
                                <Link 
                                    to={item.path} 
                                    onClick={() => { scrollTop(); toggleSidebarGuest() }}
                                    className={`${isActive(item.path) ? 'text-white bg-black' : ''} py-2 px-4 rounded-md`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default SideBarGuest
