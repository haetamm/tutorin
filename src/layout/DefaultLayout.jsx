import React from "react";
import NavbarGuest from "../component/guest/NavbarGuest";
import SideBarGuest from "../component/guest/SideBarGuest";
import { Outlet } from "react-router-dom";
import "../styles/component/guest/navbar-guest.scss";
import "../styles/component/guest/sidebar-guest.scss";
import Footer from "../component/guest/Footer";
import { Toaster } from "sonner";
import Modal from "../component/Modal";

const DefaultLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col background-landingpage">
        <NavbarGuest />
        <SideBarGuest />
        <Outlet />
        <Footer />
        <Toaster className="text-lg" position="top-left" />
        <Modal />
      </div>
    </>
  );
};

export default DefaultLayout;
