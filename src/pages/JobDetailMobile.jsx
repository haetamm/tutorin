import React from 'react'
import { useParams } from 'react-router-dom'
import JobDetailComp from '../component/JobDetailComp'

const JobDetailMobile = () => {
    const { id } = useParams()
    return (
        <>
            <JobDetailComp id={id} />
        </>
    )
}

export default JobDetailMobile