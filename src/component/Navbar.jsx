import React from 'react'
import '../styles/component/navbar.scss'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'
import { IoIosMail } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'
import { urlPage } from '../utils/constans'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { pathname } = useLocation()
    const isJobDetailPage = pathname.startsWith(urlPage.JOB_DETAIL)
    const { role } = useSelector((state) => state.user)
    
    return (
        <>
            <div className="fixed w-full">
                <nav className=" w-full nav-background border-b-2 border-gray-300 text-gray-900 py-2 xs:pb-4">
                    <div className="container mx-auto flex justify-end lg:justify-between pr-3">
                        <div className="relative lg:flex lg:flex-1 items-center text-white ml-5 hidden">
                            <Link href="/" className="relative block select-none font-custom text-4xl font-norma border-b-none">
                                Tutorin
                            </Link>
                        </div>
                        <div className="flex justify-end">
                            <div className="text-white flex items-center xs:mx-0">
                                <Link to={role === "student" ? urlPage.STUDENT_MESSAGE : urlPage.TUTOR_MESSAGE}>
                                    <IoIosMail className="h-8 w-8 cursor-pointer mr-5" />
                                </Link>
                                <Link to={role === "role" ? urlPage.STUDENT_PROFILE : urlPage.TUTOR_PROFILE}>
                                    <IoSettingsSharp className="h-7 w-7"/>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </nav>
                {isJobDetailPage && <SearchBar />}
            </div>
      </>
  )
}

export default Navbar