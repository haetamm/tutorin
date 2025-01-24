import React from "react";
import { FaStudiovinari } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../../styles/component/guest/navbar-guest.scss";
import { isActive, scrollTop } from "../../utils/helper";
import { useSidebarGuest } from "../../store/sidebarGuest";
import { navbarLinks, navbarStaticLinks } from "../../utils/links";
import useScroll from "../../hooks/useScroll";

const NavbarGuest = () => {
  const { pathname } = useLocation();
  const isScrolled = useScroll(50);
  const { isOpen, openSidebar, closeSidebar } = useSidebarGuest();

  return (
    <>
      <div
        className={`w-full flex justify-center h-[75px] fixed transition-all duration-300 z-[1000] ${
          isScrolled ? "text-[#333333] bg-[#79c9fa] shadow-lg" : ""
        }`}
      >
        <nav
          className={` w-full kontener flex justify-end gap-4 lg:gap-0 lg:justify-between items-center`}
        >
          <div className="logo" onClick={scrollTop}>
            <Link to="/">
              <FaStudiovinari className="h-[60px] w-[60px] hidden lg:block" />
            </Link>
            <Link to="/" className="text-2xl mr-2 lg:mr-8 hidden lg:block">
              Tutorin
            </Link>
            <div className="hidden lg:flex gap-6 font-semibold">
              {navbarStaticLinks.map((link, index) => (
                <div key={index} className={link.extraClass}>
                  {link.label}
                </div>
              ))}
            </div>
          </div>
          <ul className="flex items-center">
            {navbarLinks.map((link, index) => (
              <li
                key={index}
                className={`${link.extraClass} ${
                  isActive(pathname, link.path)
                    ? "nav-background border-none text-white"
                    : " border-black"
                }`}
              >
                <Link
                  to={link.path}
                  onClick={() => {
                    scrollTop();
                    closeSidebar();
                  }}
                  className={`${
                    isActive(pathname, link.path)
                      ? "nav-background border-none text-white"
                      : " border-black"
                  } py-2 cursor-pointer`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            onClick={() => {
              if (isOpen) {
                closeSidebar();
              } else {
                openSidebar();
              }
            }}
            className={`${isOpen ? "hamburger-active" : ""} hamburger`}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarGuest;
