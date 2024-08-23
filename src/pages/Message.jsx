import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from '../utils/api'
import { Helmet } from 'react-helmet-async'
import { handleFormErrors } from '../utils/error-handling'
import ListMessageComp from '../component/message/ListMessageComp'

const Messages = () => {
  const { name } = useSelector((state) => state.user)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 1023 })

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        const { data: response } = await axiosInstance.get('/notifications')
        const { data: jobs} = response
        setJobs(jobs)
      } catch (error) {
        handleFormErrors(error, null)
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  return (
    <>
      <Helmet>
        <title>Notifications | {name}</title>
          <meta name="description" content="Notifications page" />
      </Helmet>
      <div className="h-screen">
        <div className="ml-16 lg:ml-[210px]">
          <div className="flex">
            <div className="w-full lg:w-[30%] overflow-auto">
              <div className="flex-1 overflow-auto border-black border-r-2">
                <div className="flex flex-col h-screen w-full">
                  <h1 className="p-4 bg-white text-xl">Notifications</h1>
                  <div className="bg-white p-4 mb-2 shadow-md">
                    <input
                      type="text"
                      placeholder="Search request"
                      className="text-input-box text-input-box-filled border-2 w-full h-10 px-3"
                    />
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <ListMessageComp 
                      jobs={jobs}
                      loading={loading}
                      isMobile={isMobile}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-full lg:w-3/4 font-normal">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Messages
