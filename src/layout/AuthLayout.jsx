import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { urlPage } from '../utils/constans'
import Navbar from '../component/Navbar'

const AuthLayout = () => {
  const { token } = useSelector((state) => state.user)
  const { pathname } = useLocation()
  
  const isStudentMessagePage = pathname.startsWith(urlPage.STUDENT_NOTIFICATION)
  const isTutorMessagePage = pathname.startsWith(urlPage.TUTOR_NOTIFICATION)
  
  if (!token) {
    return <Navigate to={`${urlPage.LOGIN}`} />
  }

  return (
    <>
      {!isStudentMessagePage && !isTutorMessagePage && <Navbar />}
      <Outlet />
      <Toaster className="text-lg" position='top-left'/>
    </>
  )
}

export default AuthLayout