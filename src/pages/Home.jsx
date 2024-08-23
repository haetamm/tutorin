import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { urlPage } from '../utils/constans'
import { useSelector } from 'react-redux'
import axiosInstance from '../utils/api'
import { Helmet } from 'react-helmet-async'
import { roles } from '../utils/constans'
import Pagination from '../component/home/Pagination'
import { handleFormErrors } from '../utils/error-handling'
import ListJobComp from '../component/home/ListJobComp'

const Home = () => {
  const { role } = useSelector((state) => state.user)
  const [jobs, setJobs] = useState([])
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem('currentPage')) || 1
  })
  const [totalPages, setTotalPages] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [totalElements, setTotalElements] = useState(0)
  const [size, setSize] = useState(0)
  const isMobile = useMediaQuery({ maxWidth: 1023 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchJobs = async (page = 1) => {
      setLoading(true)
      try {
        const { data: response } = await axiosInstance.get(`/jobs?page=${page}`)
        const { data: jobs, paginationResponse } = response
        setJobs(jobs)
        setTotalPages(paginationResponse.totalPages)
        setHasNext(paginationResponse.hasNext)
        setHasPrevious(paginationResponse.hasPrevious)
        setTotalElements(paginationResponse.totalElements)
        setSize(paginationResponse.size)
        localStorage.setItem('currentPage', paginationResponse.page)
      } catch (error) {
        handleFormErrors(error, null)
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs(currentPage)
  }, [currentPage])


  if (role !== roles.TUTOR && role !== roles.ADMIN) {
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
          <ListJobComp 
            jobs={jobs}
            loading={loading}
            isMobile={isMobile}
          />
          <div className="flex flex-none justify-center border border-gray-300 bg-white">
            <Pagination
              currentPage={currentPage}
              totalElements={totalElements}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
              size={size}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
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
