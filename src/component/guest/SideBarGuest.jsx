import React from "react";
import { FaStudiovinari } from "react-icons/fa";
import "../../styles/component/guest/sidebar-guest.scss";
import { Link, useLocation } from "react-router-dom";
import { isActive, scrollTop } from "../../utils/helper";
import { useSidebarGuest } from "../../store/sidebarGuest";
import { sidebarLinks } from "../../utils/links";

const SideBarGuest = () => {
  const { pathname } = useLocation();
  const { isOpen, closeSidebar } = useSidebarGuest();

  return (
    <>
      {isOpen && (
        <div className="menubar block lg:hidden h-full">
          <Link
            to="/"
            onClick={() => {
              scrollTop();
              closeSidebar();
            }}
            className="flex p-[10px] pt-1 pb-0 items-center"
          >
            <FaStudiovinari className="h-[60px] w-[60px]" />
            <div className="text-2xl mr-2 lg:mr-8">Tutorin</div>
          </Link>
          <div className="border-2 border-blue-200 my-2"></div>
          <ul className="overflow-auto h-screen text-lg">
            {sidebarLinks.map((item, index) => (
              <li key={index} className="w-full py-1 hover:bg-white">
                <Link
                  to={item.path}
                  onClick={() => {
                    scrollTop();
                    closeSidebar();
                  }}
                  className={`${
                    isActive(pathname, item.path) ? "sidebar-active" : ""
                  } py-2 px-4 rounded-full`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SideBarGuest;
