import React from 'react';
import { FiUser } from 'react-icons/fi';
import { PiBagFill } from 'react-icons/pi';
import { MdEmail } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { urlPage } from '../utils/constans';
import '../styles/component/sidebar.scss';
import { IoFolderOpen } from 'react-icons/io5';

const Sidebar = () => {
  const { role } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  const links = [
    {
      to: role === 'student' ? urlPage.STUDENT_CREATE_JOB : urlPage.HOME,
      label: role === 'student' ? 'Create Job' : 'Job',
      icon: <PiBagFill className="h-6 w-6" />,
    },
    {
      to: role === 'student' ? urlPage.STUDENT_PROFILE : urlPage.TUTOR_PROFILE,
      label: 'Profile',
      icon: <FiUser className="h-6 w-6" />,
    },
    {
      to: role === 'student' ? urlPage.STUDENT_MESSAGE : urlPage.TUTOR_MESSAGE,
      label: 'Message',
      icon: <MdEmail className="h-6 w-6" />,
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
  ];

  return (
    <div className="flex fixed flex-col items-center w-16 lg:w-[210px] h-full overflow-hidden nav-background text-white">
      <a className="flex items-center w-full px-3 mt-3">
        <span className="ml-2 text-3xl font-bold hidden lg:block">Tutorin</span>
      </a>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-2 py-4 border-t border-gray-300">
          {links.map((link, index) => {
            const isActive = pathname.startsWith(link.to);
            return (
              <Link
                key={index}
                to={link.to}
                className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300 ${
                  isActive ? 'bg-slate-400' : ''
                }`}
              >
                {link.icon}
                <span className="ml-2 text-sm font-medium hidden lg:block">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
