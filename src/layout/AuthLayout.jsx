import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { urlPage } from '../utils/constans'
import Navbar from '../component/Navbar'

const AuthLayout = () => {
  const { token } = useSelector((state) => state.user);
  const { pathname } = useLocation()
  console.log(pathname)
  
  if (!token) {
    return <Navigate to={`${urlPage.LOGIN}`} />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster className="text-lg" position='top-left'/>
    </>
  )
}

export default AuthLayout