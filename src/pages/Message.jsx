import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { urlPage } from '../utils/constans';

const Messages = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const location = useLocation();

  return (
    <>
      <div className="h-screen">
        <div className="ml-16 lg:ml-[210px]">
          <div className="flex">
            <div className="w-full lg:w-[30%] overflow-auto">
              <div className="flex-1 overflow-auto border-black border-r-2">
                <div className="flex flex-col h-screen w-full">
                  <h1 className="p-4 bg-white text-xl">Messages</h1>
                  <div className="bg-white p-4">
                    <input
                      type="text"
                      placeholder="search message"
                      className="text-input-box text-input-box-filled border-2 w-full h-10 px-3"
                    />
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    {[...Array(30)].map((_, index) => {
                      const path = isMobile
                        ? `${urlPage.STUDENT_MESSAGE_MOBILE}/${index + 1}`
                        : `${urlPage.STUDENT_MESSAGE}/${index + 1}`;
                      const isActive = location.pathname === path;

                      return (
                        <Link to={path} key={index} className="cursor-pointer">
                          <div
                            className={`flex items-start border-b border-solid border-black bg-white p-3 text-normal ${
                              isActive ? 'border-l-4 border-blue-500' : ''
                            }`}
                          >
                            <button
                                className="w-full bg-white border-l-4 border-primary-color"
                              >
                                <div className="flex border-b w-full py-2 px-4 gap-2">
                                  <div className="whitespace-nowrap flex-grow overflow-hidden text-left">
                                    <div className="truncate font-bold">Jendela Group</div>
                                    <div className="overflow-ellipsis overflow-hidden">
                                      You applied for Frontend Web Developer.
                                    </div>
                                    <p className="float-right text-caption">3 months ago</p>
                                  </div>
                                </div>
                              </button>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                      
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-full lg:w-3/4 font-normal">
              {/* <div className="lg:block w-full h-screen">  */}
                <Outlet />

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Messages