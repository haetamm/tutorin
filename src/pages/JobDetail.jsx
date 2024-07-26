import React from 'react'
import { useParams } from 'react-router-dom'
import JobDetailComp from '../component/JobDetailComp'

const JobDetail = () => {
    const { id } = useParams()
    return (
        <>
            <JobDetailComp id={id} />
        </>
    )
}

export default JobDetail