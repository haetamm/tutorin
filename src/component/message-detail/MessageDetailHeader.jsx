import React from 'react'
import PropTypes from 'prop-types'
import { FaArrowLeft } from 'react-icons/fa'

const MessageDetailHeader = ({job, handleBack, isMobile}) => {
    return (
        <>
            <div className="flex p-2 h-16 bg-white justify-between">
                <div className="flex items-center">
                    {isMobile && <FaArrowLeft onClick={handleBack} className="h-8 w-8 mr-2" />}
                    <div>
                        <div className="font-bold overflow-ellipsis">{job.title}</div>
                        <div className="flex gap-1 text-caption">
                            <button className="hover:underline">
                                {job.tutors.length} application{job.tutors.length !== 1 ? 's' : ''}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

MessageDetailHeader.propTypes = {
    job: PropTypes.object.isRequired,
    handleBack: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired
}

export default MessageDetailHeader