import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { urlPage } from '../utils/constans'
import SearchBar from './SearchBar'
import Modal from './Modal'
import '../styles/component/navbar.scss'
import { IoIosMail } from 'react-icons/io'
import { IoLogOut, IoSettingsSharp } from 'react-icons/io5'

const Navbar = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const isJobDetailPage = pathname.startsWith(urlPage.JOB_DETAIL)
    const { role } = useSelector((state) => state.user)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleLogoutClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmLogout = () => {
        Cookies.remove('token')
        dispatch({
            type: 'LOGOUT',
        })
        setIsModalOpen(false)
    };

    return (
        <>
            <div className="fixed w-full">
            <nav className="w-full nav-background border-b-2 border-gray-300 text-gray-900 py-2 xs:pb-4">
                <div className="container mx-auto flex justify-end lg:justify-between pr-3">
                    <div className="relative lg:flex lg:flex-1 items-center text-white ml-5 hidden">
                        <Link to="/" className="relative block select-none font-custom text-4xl font-norma border-b-none">
                            {/* Tutorin */}
                        </Link>
                    </div>
                    <div className="flex justify-end">
                        <div className="text-white flex items-center xs:mx-0">
                        <Link to={role === "student" ? urlPage.STUDENT_MESSAGE : urlPage.TUTOR_MESSAGE}>
                            <IoIosMail className="h-8 w-8 cursor-pointer mr-5 hover:text-blue-400" />
                        </Link>
                        <Link to={role === "student" ? urlPage.STUDENT_PROFILE : urlPage.TUTOR_PROFILE}>
                            <IoSettingsSharp className="h-7 w-7 mr-5 hover:text-blue-400"/>
                        </Link>
                            <IoLogOut className="h-7 w-7 cursor-pointer hover:text-blue-400" onClick={handleLogoutClick} />
                        </div>
                    </div>
                </div>
            </nav>
            {isJobDetailPage && <SearchBar />}
            </div>
            <Modal
                isOpen={isModalOpen}
                title="Logout Confirmation"
                content="Are you sure you want to logout?"
                onConfirm={handleConfirmLogout}
                onCancel={closeModal}
                confirmLabel="Logout"
                cancelLabel="Cancel"
            />
        </>
    );
};

export default Navbar;
