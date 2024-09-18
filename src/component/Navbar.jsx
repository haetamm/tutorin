import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { roles, urlPage } from '../utils/constans'
import SearchBar from './SearchBar'
import { IoMdNotifications } from 'react-icons/io'
import { IoLogOut, IoSettingsSharp } from 'react-icons/io5'
import { scrollTop } from '../utils/helper'

const Navbar = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const isJobDetailPage = pathname.startsWith(urlPage.JOB_DETAIL)
    const { role } = useSelector((state) => state.user)

    const isHide = pathname.startsWith(urlPage.HOME)

    const handleLogout = () => {
        dispatch({
            type: 'OPEN_MODAL',
            payload: {
                content: 'Logout',
                confirmLabel: 'Logout',
                type: 'Small'
            }
        })
    }

    return (
        <>
            <div className="fixed w-full">
                <div className="w-full nav-background border-b-2 border-gray-300 text-gray-900 py-2 xs:pb-4">
                    <div className="container mx-auto flex justify-end lg:justify-between pr-3">
                        <div className="relative lg:flex lg:flex-1 items-center text-white ml-5 hidden">
                            <Link to="/" className="relative block select-none font-custom text-4xl font-norma border-b-none">
                                {/* Tutorin */}
                            </Link>
                        </div>
                        <div className="flex justify-end">
                            <div className="text-white flex items-center xs:mx-0">
                                <Link onClick={scrollTop} to={role === roles.STUDENT ? urlPage.STUDENT_NOTIFICATION : urlPage.TUTOR_NOTIFICATION}>
                                    <IoMdNotifications className="h-8 w-8 cursor-pointer mr-5 hover:text-blue-400" />
                                </Link>
                                <Link onClick={scrollTop} to={role === roles.STUDENT ? urlPage.STUDENT_PROFILE : urlPage.TUTOR_PROFILE}>
                                    <IoSettingsSharp className="h-7 w-7 mr-5 hover:text-blue-400"/>
                                </Link>
                                {isHide && <IoLogOut className="h-7 w-7 cursor-pointer hover:text-blue-400" onClick={handleLogout} />}
                            </div>
                        </div>
                    </div>
                </div>
                {isJobDetailPage && <SearchBar />}
            </div>
        </>
    )
}

export default Navbar
