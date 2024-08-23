import React, {  } from 'react'
import JobDetailComp from '../component/job-detail/JobDetailComp'
import { Helmet } from 'react-helmet-async'

const JobDetail = () => {

    return (
        <>
            <Helmet>
                <title>Tutorin . Jobs</title>
                <meta name="description" content="Tutorin jobs page" />
            </Helmet>
            <JobDetailComp />
        </>
    )
}

export default JobDetail;
