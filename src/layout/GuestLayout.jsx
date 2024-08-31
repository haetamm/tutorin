import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { urlPage } from '../utils/constans.js'

const GuestLayout = () => {
    const user = useSelector((state) => state.user)
  
    if (user.token) {
        return <Navigate to={`${urlPage.STUDENT}`} />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default GuestLayout