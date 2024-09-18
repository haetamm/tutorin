import React from 'react'
import { FiUser } from 'react-icons/fi'
import { PiBagFill } from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { roles, urlPage } from '../utils/constans'
import '../styles/component/sidebar.scss'
import { IoFolderOpen, IoLogOutSharp } from 'react-icons/io5'
import { IoMdNotifications } from 'react-icons/io'
import { FaStudiovinari } from 'react-icons/fa'
import { scrollTop } from '../utils/helper'

const Sidebar = () => {
  const { role } = useSelector((state) => state.user)
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const handleLogout = () => {
      dispatch({
          type: 'OPEN_MODAL',
          payload: {
              content: 'Logout',
              confirmLabel: 'Logout',
              type: "Small"
          }
      })
  }

  const links = [
    {
      to: role === roles.STUDENT ? urlPage.STUDENT_CREATE_JOB : urlPage.HOME,
      label: role === roles.STUDENT ? 'Request Tutor' : 'Request',
      icon: <PiBagFill className="h-6 w-6" />,
    },
    {
      to: role === roles.STUDENT ? urlPage.STUDENT_PROFILE : urlPage.TUTOR_PROFILE,
      label: 'Profile',
      icon: <FiUser className="h-6 w-6" />,
    },
    {
      to: role === roles.STUDENT ? urlPage.STUDENT_NOTIFICATION : urlPage.TUTOR_NOTIFICATION,
      label: 'Notifications',
      icon: <IoMdNotifications className="h-6 w-6" />,
    },
    ...(role === roles.TUTOR
      ? [
          {
            to: urlPage.TUTOR_APPLICATIONS,
            label: 'Applications',
            icon: <IoFolderOpen className="h-6 w-6" />,
          },
        ]
      : []),
    {
      to: '#',
      label: 'Logout',
      icon: <IoLogOutSharp className="h-7 w-7" />,
    }
  ]

  return (
    <div className="flex fixed flex-col items-center w-16 lg:w-[210px] h-full overflow-hidden nav-background text-white">
      <div className="flex items-center w-full px-3 mt-2 h-[60px]">
         <Link to='/'>
          <FaStudiovinari className="h-[60px] w-[60px] hidden lg:block"/>
        </Link>
      <div className="text-2xl mr-2 lg:mr-8 hidden lg:block">Tutorin</div>
      </div>
      <div className="w-full px-2 mt-0">
        <div className="flex flex-col items-center w-full">
          {links.map((link, index) => {
            const isActive = pathname.startsWith(link.to)
            return (
              <Link
                onClick={() => {
                  if (link.label === 'Logout') {
                    handleLogout()
                  } else {
                    scrollTop()
                  }
                }}
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
