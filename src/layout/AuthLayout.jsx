import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { urlPage } from "../utils/constans";
import Navbar from "../component/Navbar";
import Modal from "../component/Modal";
import useUserStore from "../store/user";
import { useProfileStore } from "../store/profile";

const AuthLayout = () => {
  const { token } = useUserStore();
  const { pathname } = useLocation();
  const { fetchProfile } = useProfileStore();

  const isTutorMessagePage = pathname.startsWith(urlPage.HOME);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [fetchProfile, token]);

  if (!token) {
    return <Navigate to={`${urlPage.LOGIN}`} />;
  }

  return (
    <>
      {isTutorMessagePage && <Navbar />}
      <Outlet />
      <Toaster className="text-lg" position="top-left" />
      <Modal />
    </>
  );
};

export default AuthLayout;
