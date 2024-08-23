import React from 'react'
import { useSelector } from 'react-redux'
import { roles, urlPage } from '../utils/constans'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../component/Sidebar'

const Tutor = () => {
    
    const { role } = useSelector((state) => state.user)

    if (role !== roles.TUTOR) {
        return <Navigate to={`${urlPage.HOME}`} />
    }

    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default Tutor