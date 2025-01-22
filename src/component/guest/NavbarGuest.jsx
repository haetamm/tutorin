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
      <nav
        className={`fixed w-full transition-all duration-300 ${
          isScrolled ? "text-[#333333] bg-[#79c9fa] shadow-lg" : ""
        } flex justify-end gap-4 lg:gap-0 lg:justify-between items-center`}
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
            <li key={index} className={`${link.extraClass}`}>
              <Link
                to={link.path}
                onClick={() => {
                  scrollTop();
                  closeSidebar();
                }}
                className={`${
                  isActive(pathname, link.path)
                    ? "nav-background border-white text-white"
                    : ""
                } py-2 hover:text-blue-300 cursor-pointer`}
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
    </>
  );
};

export default NavbarGuest;
