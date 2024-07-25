import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { urlPage } from '../utils/constans';
// import Navbar from '../component/Navbar';
import SearchBar from '../component/SearchBar';

const AuthLayout = () => {
    const { token } = useSelector((state) => state.user);
    console.log(token)
  
  if (!token) {
    return <Navigate to={`${urlPage.LOGIN}`} />;
  }

  return (
    <>
      <div className="h-sreen">
          {/* <Navbar /> */}
          <SearchBar />
        <Outlet />
        <Toaster className="text-lg" position='top-left'/>

      </div>
    </>
  )
}

export default AuthLayout