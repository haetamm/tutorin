import React from 'react'
import { useSelector } from 'react-redux'
import { urlPage } from '../utils/constans'
import { Navigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar'

const Student = () => {
    
    const { role } = useSelector((state) => state.user)

    if (role !== "student") {
        return <Navigate to={`${urlPage.HOME}`} />
    }

    return (
        <>
                   <Sidebar />
        </>
    )
}

export default Student