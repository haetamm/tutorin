import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { roles, urlPage } from '../utils/constans'
import { Toaster } from 'sonner'
import MessageDetailComp from '../component/message/MessageDetailComp'

const StudentMessageDetailMobile = () => {
    const { token, role } = useSelector((state) => state.user)
    
    if (!token) {
        return <Navigate to={`${urlPage.LOGIN}`} />;
    }

    if (role !== roles.STUDENT) {
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