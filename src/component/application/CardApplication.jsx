import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { urlPage } from '../../utils/constans'
import { useMediaQuery } from 'react-responsive'
import { IoIosMail } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { formatDate } from '../../utils/helper'

const CardApplication = ({job}) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 })
  return (
    <>
      <div className="bg-white border border-tertiary-ghost-color rounded-md">
          <div className="bg-gray-200 flex">
              <div className="px-4 py-2 flex gap-1 flex-grow text-lg">
                  <Link to={!isMobile ? `${urlPage.JOB_DETAIL}/${job.jobId}` : `${urlPage.JOB_DETAIL_MOBILE}/${job.jobId}` }  className="text-left font-medium hover:underline hover:text-primary- cursor-pointer">{job.title}</Link>
              </div>
              <div className="flex">
                  <div className="p-2 flex border-r-2 border-gray-300">
                  <div className="flex">
                      <button className="text-primary-color my-auto h-6 flex gap-1 rounded px-2">
                          <IoIosMail className="h-[24px] w-[24px]" />
                          <span className="hidden sm:block my-auto font-medium uppercase">Message</span>
                      </button>
                  </div>
                  </div>
              </div>
              <div className="px-2 my-auto h-6">
                  <button className="mat-menu-trigger h-6 rounded">
                      <BsThreeDotsVertical className="w-6 h-6" />
                  </button>
              </div>
          </div>
          <div className="p-6 flex flex-col sm:flex-row gap-4 justify-between text-center sm:text-left">
              <div className="flex flex-col sm:flex-row gap-4">
                  <div>
                      <a className="text-primary-color text-lg hover:text-black hover:underline">
                          {job.subject}
                      </a>
                      <div className="text-sm">
                          {job.status.toLowerCase() || 'No status available'}
                      </div>
                  </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-col-reverse">
                  <div className="text-gray-600">
                      Deadline: {formatDate(job.deadline)}
                  </div>
              </div>
          </div>
          <hr />
          <div className="flex gap-1 border-none text-gray-500 rounded-b-lg">
              <select name="" id="" className="w-full p-3 outline-none rounded-b-lg  cursor-pointer border-none">
                  <option value="" className="p-3">Status</option>
                  <option value="" className="p-3">I got hired</option>
                  <option value="" className="p-3">I withdrew my application</option>
              </select>
          </div>
      </div>
    </>
  )
}

CardApplication.propTypes = {
  job: PropTypes.object.isRequired
}

export default CardApplication