import React from 'react'
import Navbar from '../component/guest/NavbarGuest'
import SideBar from '../component/guest/SideBarGuest'
import { Outlet } from 'react-router-dom'
import '../styles/component/guest/navbar-guest.scss'
import '../styles/component/guest/sidebar-guest.scss'
import Footer from '../component/guest/Footer'

const DefaultLayout = () => {
    return (
      <>
        <div className="min-h-screen flex flex-col background-landingpage">
          <Navbar />
          <SideBar />
          <Outlet />
          <Footer />

        </div>
      </>
  )
}

export default DefaultLayout