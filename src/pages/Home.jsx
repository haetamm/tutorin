import React from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { urlPage } from '../utils/constans'
import { useSelector } from 'react-redux'

const Home = () => {
  const { role } = useSelector((state) => state.user)
  console.log(role)

  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  if (role !== "tutor") {
    return <Navigate to={`${urlPage.STUDENT}`} />
  }

  return (
    <>
      <div className="flex overflow-auto h-screen pt-[196px] md:pt-[142px] flex-1">
        <div className="flex w-full flex-col overflow-auto lg:w-[31%] border-3 border-r-2 border-black">
          <div className="flex-auto overflow-auto">
            <ul className="flex-1 overflow-hidden">
              {[...Array(30)].map((_, index) => {
                const path = isMobile
                  ? `${urlPage.JOB_DETAIL_MOBILE}/${index + 1}`
                  : `${urlPage.JOB_DETAIL}/${index + 1}`;
                const isActive = location.pathname === path;

                return (
                  <Link to={path} key={index} className="cursor-pointer">
                    <div
                      className={`flex items-start border-b border-solid border-black bg-white p-3 text-normal ${
                        isActive ? 'border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="mr-2 font-normal">
                        <p className="font-bold text-xl">Guru Matematika</p>
                        <p>Bandung, Indonesia</p>
                        <p>Posted about 1 month ago · Apply before 12 Aug</p>
                        <p>Recruiter was hiring about 13 hours ago</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-none justify-center border border-gray-300 bg-white">
            {/* Additional content or navigation */}
          </div>
        </div>
        <div className="hidden w-[69%] overflow-auto lg:block">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
