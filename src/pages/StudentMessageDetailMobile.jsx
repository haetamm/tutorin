import React from 'react'
import MessageDetailComp from '../component/MessageDetailComp'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { urlPage } from '../utils/constans'
import { Toaster } from 'sonner'

const StudentMessageDetailMobile = () => {
    const { token, role } = useSelector((state) => state.user)
    
    if (!token) {
        return <Navigate to={`${urlPage.LOGIN}`} />;
    }

    if (role !== "student") {
        return <Navigate to={urlPage.HOME} />
    }

    return (
        <>
            <Toaster className="text-lg" position='top-left'/>
            <MessageDetailComp />
        </>
    )
}

export default StudentMessageDetailMobile