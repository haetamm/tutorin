import React, {  } from 'react'
import JobDetailComp from '../component/job-detail/JobDetailComp'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { roles, urlPage } from '../utils/constans'
import { Toaster } from 'sonner'

const JobDetail = () => {
    const { token, role } = useSelector((state) => state.user)
    
    if (!token) {
        return <Navigate to={`${urlPage.LOGIN}`} />;
    }

    if (role !== roles.TUTOR) {
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
