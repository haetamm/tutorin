import React from 'react'
import PropTypes from 'prop-types'
import { FaShareAlt } from 'react-icons/fa'
import { GiShare } from 'react-icons/gi'

const BodyJobDetailComp = ({job, onSubmit, loading}) => {
  return (
    <>
        <ul className="md:flex mt-2">
            <li>
                <div className="text-black hover:text-black visited:text-black text-md">
                    <span>{job.city}, {job.country}</span>
                </div>
                <br />
            </li>
            <li className="md:list-disc md:ml-7">
                <p className="text-black text-sm hover:text-black visited:text-black">{job.salary}</p>
            </li>
        </ul>
        <div className="mt-4 mb-8 md:flex md:justify-between">
            <button
                onClick={() => !job.applied && onSubmit(job.id)}
                className={`k-w-full md:k-w-auto md:k-inline-block k-btn-primary k-btn-lg k-mb-4 md:k-mb-0 p-4 rounded mb-2 lg:mb-0 ${job.applied ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400'}`}
                disabled={job.applied || loading}
            >
                {loading ? 'Loading...' : job.applied ? 'Applied' : 'Apply'}
            </button>

            <div className="flex gap-4 justify-between">
                <button className="btn-tertiary btn-lg flex items-center justify-center flex-1 md:flex-none p-4 bg-blue-400 rounded">
                    <GiShare className="h-6 w-6 mr-1" /> Save
                </button>
                <button className="btn-tertiary btn-lg flex items-center justify-center flex-1 md:flex-none p-4 bg-blue-400 rounded">
                    <FaShareAlt className="h-6 w-6 mr-1" /> Share
                </button>
            </div>
        </div>
        <div className="py-8 border-t border-tertiary-color md:flex md:justify-center">
            <div className="md:w-full md:pr-4 p-space">
                <h2 className="text-title font-semibold mb-2">Job Description :</h2>
                <div className="mb-4 show-bullets">
                    {job.description}
                </div>
                <div className="md:flex mt-8">
                    <div className="md:mr-4">
                        <div className="mb-4">
                            <div className="text-overline text-subdued">Address :</div>
                            <div className="inline-flex items-center justify-center">
                                {job.address}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

BodyJobDetailComp.propTypes = {
    job: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default BodyJobDetailComp