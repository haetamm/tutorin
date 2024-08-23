import React from 'react'
import PropTypes from 'prop-types'
import { urlPage } from '../../utils/constans'
import { formatDate, getHumanReadableDiff } from '../../utils/helper'
import { Link, useLocation } from 'react-router-dom'

const ListJobComp = ({jobs, loading, isMobile}) => {
    const location = useLocation()
    return (
        <>
            <div className="flex-auto overflow-auto">
                <ul className="flex-1 overflow-hidden">
                    {jobs.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg p-4">
                        {loading ? 'Loading...' : 'No requests available'}
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
                                        className={`flex items-start border-b border-solid border-black bg-white p-3 text-normal 
                                        ${isActive ? 'border-l-4 border-blue-500' : ''}`}
                                    >
                                    <div className="mr-2 font-normal">
                                        <p className="font-bold text-2xl">{job.title}</p>
                                        <p className="text-md">{job.city}, {job.country}</p>
                                        <p className="text-sm">{job.salary}</p>
                                        <p className="text-sm">Posted about {getHumanReadableDiff(job.createdAt)} · Apply before {formatDate(job.deadline)}</p>
                                    </div>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </ul>
                </div>
        </>
    )
}

ListJobComp.propTypes = {
    jobs: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
}

export default ListJobComp