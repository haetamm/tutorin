import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/component/sidebar.scss";
import { FaStudiovinari } from "react-icons/fa";
import { scrollTop } from "../utils/helper";
import useUserStore from "../store/user";
import { useModalStore } from "../store/modal";
import { getSidebarLinks } from "../utils/links";

const Sidebar = () => {
  const { role } = useUserStore();
  const { pathname } = useLocation();
  const { openModal } = useModalStore();

  const handleLogout = () => {
    openModal("Logout", "Logout", "Small");
  };

  const links = getSidebarLinks(role);

  return (
    <div className="flex fixed flex-col items-center top-0 w-16 lg:w-[210px] h-full overflow-hidden nav-background text-white">
      <div className="flex items-center w-full px-3 mt-2 h-2 lg:h-[60px]">
        <Link to="/">
          <FaStudiovinari className="h-[60px] w-[60px] hidden lg:block" />
        </Link>
        <div className="text-2xl mr-2 lg:mr-8 hidden lg:block">Tutorin</div>
      </div>
      <div className="w-full px-2 mt-0">
        <div className="flex flex-col items-center w-full">
          {links.map((link, index) => {
            const isActive = pathname.startsWith(link.to);
            return (
              <Link
                onClick={() => {
                  if (link.label === "Logout") {
                    handleLogout();
                  } else {
                    scrollTop();
                  }
                }}
                key={index}
                to={link.to}
                className={`flex items-center w-full h-[3rem] px-3 mt-2 rounded hover:bg-gray-300 ${
                  isActive ? "bg-slate-400" : ""
                }`}
              >
                {link.icon}
                <span className="ml-2 text-md font-medium hidden lg:block">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
