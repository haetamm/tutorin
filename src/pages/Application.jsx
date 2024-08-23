import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/api'
import { useSelector } from 'react-redux'
import Loader from '../component/Loader'
import { Helmet } from 'react-helmet-async'
import { handleFormErrors } from '../utils/error-handling'
import CardApplication from '../component/application/CardApplication'

const Application = () => {
    const [loading, setLoading] = useState(false)
    const [jobs, setJobs] = useState([])
    const {name} = useSelector((state) => state.user)
    

    const fetchJobs = async () => {
        setLoading(true)
        try {
            const { data: response } = await axiosInstance.get('/applications')
            const { data: jobs} = response
            setJobs(jobs)
        } catch (error) {
            handleFormErrors(error, null)
            console.error('Error fetching jobs:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    return (
        <>
            <Helmet>
                <title>Applications | {name}</title>
                <meta name="description" content="Applications page" />
            </Helmet>
            <div className="h-[50px]"></div>
            <div className="ml-16 lg:ml-[210px] p-1 lg:p-3">
                <div className="container h-full mx-auto px-0 lg:px-4 flex flex-col">
                    <h1 className="text-title p-3 text-3xl">Applications</h1>
                    <div className="flex flex-grow overflow-hidden">
                        <div className="flex flex-col gap-4 p-2 w-full font-normal">
                            {jobs.length === 0 ? (
                                loading ? (
                                    <Loader />
                                ) : (
                                    <div className="text-center text-xl p-4 font-bold">
                                        Application not found
                                    </div>
                                )
                            ) : (
                                jobs.map((job, index) => (
                                    <CardApplication key={index} job={job} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Application