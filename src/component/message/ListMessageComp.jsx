import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { roles, urlPage } from '../../utils/constans'
import { getHumanReadableDiff } from '../../utils/helper'
import { useSelector } from 'react-redux'

const ListMessageComp = ({jobs, loading, isMobile}) => {
    const {pathname} = useLocation()
    const { role } = useSelector((state) => state.user)

    const getMessagePath = (index) => {
        if (role === roles.STUDENT) {
          return isMobile
            ? `${urlPage.STUDENT_NOTIFICATION_MOBILE}/${index}`
            : `${urlPage.STUDENT_NOTIFICATION}/${index}`
        } else if (role === roles.TUTOR) {
          return isMobile
            ? `${urlPage.TUTOR_NOTIFICATION_MOBILE}/${index}`
            : `${urlPage.TUTOR_NOTIFICATION}/${index}`
        }
        return '#'
    }

    return (
        <>
            {jobs.length === 0 ? (
                <div className="text-center text-gray-500 text-lg p-4">
                    {loading ? 'Loading...' : 'No requests available'}
                </div>
            ) : (
                jobs.map((job) => {
                    const path = getMessagePath(job.jobId)
                    const isActive = pathname === path

                    return (
                        <Link
                            to={path}
                            key={job.jobId}
                            className={`flex items-start  bg-white px-3 py-2 text-normal ${isActive ? 'border-l-4 border-blue-500' : ''}`}
                            aria-selected={isActive}
                        >
                            <div className="flex border-b w-full py-2 px-4 gap-0 shadow-custome h-[87px]">
                                <div className="whitespace-nowrap flex-grow overflow-hidden text-left">
                                    <div className="truncate font-bold text-lg">{job.title.toUpperCase()}</div>
                                    <div className="overflow-ellipsis overflow-hidden text-sm">
                                        {job.tutors.length ? `${job.tutors.map(u => u.name)} applied for ${job.title}` : 'No one has applied yet'}
                                    </div>
                                    <p className="float-right text-sm">
                                        {job.tutors.length ? getHumanReadableDiff(job.tutors[job.tutors.length - 1].updatedAt) : ''}
                                    </p>
                                </div>
                                <p className="float-right text-sm">
                                    {job.tutors.length }
                                </p>
                            </div>
                        </Link>
                    )
                })
            )}
        </>
    )
}

ListMessageComp.propTypes = {
    jobs: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
}

export default ListMessageComp