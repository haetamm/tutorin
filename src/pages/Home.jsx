import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { urlPage } from '../utils/constans'
import { useSelector } from 'react-redux'
import axiosInstance from '../utils/api'
import { formatDate, getHumanReadableDiff } from '../utils/helper'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  const { role } = useSelector((state) => state.user)
  const [jobs, setJobs] = useState([])
  const location = useLocation()
  const isMobile = useMediaQuery({ maxWidth: 1023 })

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data: jobs } = await axiosInstance.get('/jobs')
        setJobs(jobs)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }

    fetchJobs()
  }, [])

  if (role !== "tutor" && role !== "superadmin" ) {
    return <Navigate to={`${urlPage.STUDENT_PROFILE}`} />
  }

  return (
    <>
      <Helmet>
          <title>Jobs . Tutorin</title>
          <meta name="description" content="Jobs page" />
      </Helmet>
      <div className="flex overflow-auto h-screen pt-[196px] md:pt-[142px] flex-1">
        <div className="flex w-full flex-col overflow-auto lg:w-[31%] border-3 border-r-2 border-black">
          <div className="flex-auto overflow-auto">
            <ul className="flex-1 overflow-hidden">
              {jobs.length === 0 ? (
                <div className="text-center text-gray-500 text-lg p-4">
                  No requests available
                </div>
              ) : (
                jobs.map((job, index) => {
                  const path = isMobile
                    ? `${urlPage.JOB_DETAIL_MOBILE}/${job.id}`
                    : `${urlPage.JOB_DETAIL}/${job.id}`
                  const isActive = location.pathname === path
  
                  return (
                    <Link to={path} key={index} className="cursor-pointer">
                      <div
                        className={`flex items-start border-b border-solid border-black bg-white p-3 text-normal ${
                          isActive ? 'border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="mr-2 font-normal">
                          <p className="font-bold text-2xl">{job.title}</p>
                          <p className="text-md">{job.city}, {job.country}</p>
                          <p className="text-sm">{job.salary}</p>
                          <p className="text-sm">Posted about {getHumanReadableDiff(job.createdAt)}· Apply before { formatDate(job.deadline) }</p>
                        </div>
                      </div>
                    </Link>
                  )
                })
              )}
            </ul>
          </div>
          <div className="flex flex-none justify-center border border-gray-300 bg-white">
            {/* Additional content or navigation */}
          </div>
        </div>
        <div className="hidden w-[69%] overflow-auto lg:block">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Home
