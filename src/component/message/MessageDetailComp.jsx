import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'sonner'
import JobDetailNotFound from '../job-detail/JobDetailNotFound'
import { handleFormErrors } from '../../utils/error-handling'
import Loader from '../Loader'
import MessageDetailCard from '../message-detail/MessageDetailCard'
import MessageDetailHeader from '../message-detail/MessageDetailHeader'
import MessageDetailForm from '../message-detail/MessageDetailForm'
import axiosInstance from '../../utils/api'

const MessageDetailComp = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState({})
  const isMobile = useMediaQuery({ maxWidth: 1023 })
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const fetchJob = async () => {
    setLoading(true)
    try {
      const { data: response } = await axiosInstance.get(`/notifications/${id}`)
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
    if (id !== "1") {
      fetchJob()
    }
  }, [id])

  const updateStatus = async (newStatus, tutorId) => {
    setLoading(prev => ({ ...prev, [tutorId]: true }))
    try {
      const updateData = {
        jobId: id,
        tutorId,
        status: newStatus
      }

      await axiosInstance.put(`/applications`, updateData)
      toast.success(`Process ${newStatus} successfully.`)
      fetchJob() 
    } catch (error) {
      handleFormErrors(error, null)
      console.error('Error updating status:', error)
    } finally {
      setLoading(prev => ({ ...prev, [tutorId]: false }))
      setLoading(false)
    }
  }

  if (isMobile && loading) {
    return <Loader /> 
  }

  if (!job) {
    return <JobDetailNotFound isMobile={isMobile} handleBack={handleBack} />
  }

  return (
    <div className={`h-screen lg:block w-full`}>
      <div className="flex flex-col w-full max-h-full">
        <MessageDetailHeader 
          job={job}
          handleBack={handleBack}
          isMobile={isMobile}
        />
        <hr />
        <div className="inline-block lg:flex lg:flex-grow overflow-hidden">
          <div className={`k-flex flex-col lg:w-full lg:flex`}>
            <div className={`overflow-y-auto w-full ${isMobile ? 'h-[calc(100vh-13rem)]' : ''}`}>
              <div className="h-full overflow-y-auto flex flex-col-reverse px-1">
                <div className="text-center py-2 text-caption"></div>
                <div className="px-4 py-5 w-full format-rich-text ml-auto">
                  {job.tutors.length === 0 ? (
                    <div className="flex w-full mb-4">
                      <div className="w-full mb-5">
                        {loading && (<Loader />)}
                      </div>
                    </div>
                  ) : (
                    job.tutors.map((tutor, index) => {
                      return (
                        <MessageDetailCard
                          key={index} 
                          tutor={tutor}
                          jobId={job.jobId}
                          updateStatus={updateStatus}
                          loading={loading}
                        />
                      )
                    })
                  )}
                </div>
              </div>
            </div>
            <MessageDetailForm job={job}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageDetailComp
