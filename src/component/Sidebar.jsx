import React from 'react'
import { FiUser } from 'react-icons/fi'
import { PiBagFill } from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { urlPage } from '../utils/constans'
import '../styles/component/sidebar.scss'
import { IoFolderOpen } from 'react-icons/io5'
import { IoMdNotifications } from 'react-icons/io'
import { FaStudiovinari } from 'react-icons/fa'
import { scrollTop } from '../utils/helper'

const Sidebar = () => {
  const { role } = useSelector((state) => state.user)
  const { pathname } = useLocation()

  const links = [
    {
      to: role === 'student' ? urlPage.STUDENT_CREATE_JOB : urlPage.HOME,
      label: role === 'student' ? 'Request Tutor' : 'Request',
      icon: <PiBagFill className="h-6 w-6" />,
    },
    {
      to: role === 'student' ? urlPage.STUDENT_PROFILE : urlPage.TUTOR_PROFILE,
      label: 'Profile',
      icon: <FiUser className="h-6 w-6" />,
    },
    {
      to: role === 'student' ? urlPage.STUDENT_NOTIFICATION : urlPage.TUTOR_NOTIFICATION,
      label: 'Notifications',
      icon: <IoMdNotifications className="h-6 w-6" />,
    },
    ...(role === 'tutor'
      ? [
          {
            to: urlPage.TUTOR_APPLICATIONS,
            label: 'Applications',
            icon: <IoFolderOpen className="h-6 w-6" />,
          },
        ]
      : []),
  ]

  return (
    <div className="flex fixed flex-col items-center w-16 lg:w-[210px] h-full overflow-hidden nav-background text-white">
      <a className="flex items-center w-full px-3 mt-2 h-[60px]">
         <Link to='/'>
          <FaStudiovinari className="h-[60px] w-[60px] hidden lg:block"/>
        </Link>
      <div className="text-2xl mr-2 lg:mr-8 hidden lg:block">Tutorin</div>
      </a>
      <div className="w-full px-2 mt-0">
        <div className="flex flex-col items-center w-full">
          {links.map((link, index) => {
            const isActive = pathname.startsWith(link.to)
            return (
              <Link
                onClick={scrollTop}
                key={index}
                to={link.to}
                className={`flex items-center w-full h-[3rem] px-3 mt-2 rounded hover:bg-gray-300 ${
                  isActive ? 'bg-slate-400' : ''
                }`}
              >
                {link.icon}
                <span className="ml-2 text-md font-medium hidden lg:block">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
