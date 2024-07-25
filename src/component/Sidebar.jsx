import React from 'react'

import '../styles/component/sidebar.scss'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { urlPage } from '../utils/constans'

const Sidebar = () => {
    return (
        <>
        <div className="flex fixed flex-col items-center w-16 md:w-[210px] h-full overflow-hidden text-gray-700 bg-gray-100 mt-[52px] md:mt-[58px]">
            <a className="flex items-center w-full px-3 mt-3" href="#">
                <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                <span className="ml-2 text-sm font-bold hidden md:block">Tutorin</span>
            </a>
            <div className="w-full px-2">
                <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
                    <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
                        <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="ml-2 text-sm font-medium hidden md:block">Job</span>
                    </a>
                    <Link to={urlPage.STUDENT_PROFILE} className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
                        <FiUser className="h-6 w-6"/>
                        <span className="ml-2 text-sm font-medium hidden md:block">Profile</span>
                    </Link>
                    <a className="flex items-center w-full h-12 px-3 mt-2 bg-gray-300 rounded" href="#">
                        <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span className="ml-2 text-sm font-medium hidden md:block">Message</span>
                    </a>
                </div>
                <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar