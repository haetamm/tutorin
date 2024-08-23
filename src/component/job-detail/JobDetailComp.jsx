import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axiosInstance from '../../utils/api'
import { handleFormErrors } from '../../utils/error-handling'
import JobDetailNotFound from './JobDetailNotFound'
import Loader from '../Loader'
import HeaderJobDetailComp from './HeaderJobDetailComp'
import BodyJobDetailComp from './BodyJobDetailComp'

const JobDetailComp = () => {
    const { id } = useParams()
    const [job, setJob] = useState()
    const [loading, setLoading] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 1023 })
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const fetchJob = async () => {
        setLoading(true)
        try {
            const { data: response } = await axiosInstance.get(`/jobs/${id}`)
            const { data: job } = response
            setJob(job)
        } catch (error) {
            handleFormErrors(error, null)
            console.error('Error fetching job:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJob()
    }, [id])

    const onSubmit = async (jobId) => {
        setLoading(true)
        try {
            const {data: response} = await axiosInstance.post(`/applications`, { jobId })
            toast.success(response.status)
            fetchJob()
        } catch (error) {
            console.error('Error submitting application:', error)
            handleFormErrors(error, null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loader /> 
    }

    if (!job) {
        return <JobDetailNotFound isMobile={isMobile} handleBack={handleBack} />
    }

    return (
        <>
            <div className="border-tertiary-ghost-color md:border md:border-t-0 md:rounded-b-lg font-normal">
                <div className="lg:block h-60">
                    <div className="hidden lg:block h-[9rem] nav-background"></div>
                    <div className="bg-white px-3 pt-3 lg:p-6 md:rounded-b-lg">
                        <HeaderJobDetailComp 
                            job={job}
                            handleBack={handleBack}
                            isMobile={isMobile}
                        />
                        <BodyJobDetailComp 
                            job={job}
                            loading={loading}
                            onSubmit={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default JobDetailComp
