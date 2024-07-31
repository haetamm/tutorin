import React, {  } from 'react'
import JobDetailComp from '../component/JobDetailComp'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { urlPage } from '../utils/constans'
import { Toaster } from 'sonner'

const JobDetail = () => {
    const { token, role } = useSelector((state) => state.user)
    
    if (!token) {
        return <Navigate to={`${urlPage.LOGIN}`} />;
    }

    if (role !== "tutor") {
        return <Navigate to={`${urlPage.STUDENT}`} />
    }

    return (
        <>
            <Toaster className="text-lg" position='top-left'/>
            <JobDetailComp />
        </>
    )
}

export default JobDetail
