import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { FaArrowLeft } from 'react-icons/fa'
import axiosInstance from '../utils/api'
import { toast } from 'sonner'

const MessageDetailComp = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [tutors, setTutors] = useState([])
  const [loadingStates, setLoadingStates] = useState({})
  const isMobile = useMediaQuery({ maxWidth: 1023 })
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const fetchJob = async () => {
    try {
      const { data } = await axiosInstance.get(`/jobs/${id}`)
      setJob(data)
      if (data.tutorIds) {
        fetchTutors(data.tutorIds)
      }
    } catch (error) {
      console.error('Error fetching job:', error)
    }
  }

  const fetchTutors = async (tutorIds) => {
    try {
      const tutorPromises = tutorIds.map((tutorId) =>
        axiosInstance.get(`/users/${tutorId}`)
      )
      const tutorResponses = await Promise.all(tutorPromises)
      setTutors(tutorResponses.map((response) => response.data))
    } catch (error) {
      console.error('Error fetching tutors:', error)
    }
  }

  useEffect(() => {
    fetchJob()
  }, [id])

  const updateStatus = async (newStatus, tutorId) => {
    setLoadingStates(prev => ({ ...prev, [tutorId]: true }))
    try {
      const updatedStatus = job.status.map((status) =>
        status.tutorId === tutorId ? { ...status, status: newStatus } : status
      )

      const updateData = {
        ...job,
        status: updatedStatus
      }

      const response = await axiosInstance.put(`/jobs/${id}`, updateData)

      if (response.status === 200) {
        toast.success(`Process ${newStatus} successfully.`)
        fetchJob() 
      } else {
        toast.error('Failed to update status.')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('An error occurred. Please try again later.')
    } finally {
      setLoadingStates(prev => ({ ...prev, [tutorId]: false }))
    }
  }

  if (!job) {
        return (
            <>
                <div className="lg:block h-60 font-normal">
                    <div className="hidden lg:block h-[9rem] p-10">
                        <div className="flex items-center gap-3">
                            <FaArrowLeft className="h-7 w-7" />
                            <p className="text-2xl">Select a request</p>
                        </div>
                        <div className="font px-[2.5rem] mt-2">Display detail here</div>
                    </div>
                </div>
            </>
        )
    }

  return (
    <div className={`h-screen lg:block w-full`}>
      <div className="flex flex-col w-full max-h-full">
        <div className="flex p-2 h-16 bg-white justify-between">
          <div className="flex items-center">
            {isMobile && <FaArrowLeft onClick={handleBack} className="h-8 w-8 mr-2" />}
            <div>
              <div className="font-bold overflow-ellipsis">{job.title}</div>
              <div className="flex gap-1 text-caption">
                <button className="hover:underline">
                  {tutors.length} application{tutors.length !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="inline-block lg:flex lg:flex-grow overflow-hidden">
          <div className={`k-flex flex-col lg:w-full lg:flex`}>
            <div className={`overflow-y-auto w-full ${isMobile ? 'h-[calc(100vh-13rem)]' : ''}`}>
              <div className="h-full overflow-y-auto flex flex-col-reverse px-1">
                <div className="text-center py-2 text-caption"></div>
                <div className="px-4 py-5 w-full format-rich-text ml-auto">
                  {tutors.length === 0 ? (
                    <div className="flex w-full mb-4">
                      <div className="w-full mb-5">
                        <div className="w-[20%] h-[300px] justify-center items-center text-center">
                        </div>
                      </div>
                    </div>
                  ) : (
                    tutors.map((tutor) => {
                      return (
                        <div key={tutor.id} className="flex w-full mb-4">
                          <div className="w-full mb-5">
                            <div className="ml-auto bg-white border-blue-200 border-2 rounded p-1">
                              <div className="flex p-2 gap-2 items-center">
                                <div className="w-[20%] justify-center items-center text-center">
                                  <img
                                    className="rounded-full w-36"
                                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                    alt="Profile"
                                  />
                                </div>
                                <div className="k-w-4/5 text-start">
                                  <p>{tutor.name}</p>
                                  <p>Ulasan: {tutor.rating.length}</p>
                                  <p>
                                    Rating: {tutor.rating && tutor.rating.length > 0
                                      ? (tutor.rating.reduce((sum, { rate }) => sum + rate, 0) / tutor.rating.length).toFixed(2)
                                      : 'No ratings'}
                                  </p>
                                </div>
                              </div>
                              <div className="p-2">
                                <button className="btn-outline p-1 w-full capitalize bg-black text-white">
                                  View application
                                </button>
                              </div>
                              <div className="p-2 pt-1 flex gap-3">
                                <button
                                  onClick={() => updateStatus('rejected', tutor.id)}
                                  className="btn-outline p-1 w-full capitalize bg-red-500 text-white"
                                  disabled={loadingStates[tutor.id]}
                                >
                                  {loadingStates[tutor.id] ? 'Loading...' : 'Reject'}
                                </button>
                                <button
                                  onClick={() => updateStatus('accepted', tutor.id)}
                                  className="btn-outline p-1 w-full capitalize bg-blue-500 text-white"
                                  disabled={loadingStates[tutor.id]}
                                >
                                  {loadingStates[tutor.id] ? 'Loading...' : 'Accept'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
            <form className="p-2">
              <div className="p-2 w-full h-[5rem] border-t">
                <textarea
                  id="editor"
                  className="w-full h-full px-4 py-2 border-2 outline-none"
                />
              </div>
              <div className="p-2 flex text-white gap-1">
                <select
                  className={` bg-blue-500 text-black p-1 mb-1 mt-0 w-full sm:w-32 outline-none`}
                >
                  <option value="">Select Tutor</option>
                  {tutors.map((tutor) => (
                    <option key={tutor.id} value={tutor.name}>
                      {tutor.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 p-1 mb-1 mt-0 w-full sm:w-32 sm:ml-auto"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageDetailComp
