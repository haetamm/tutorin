import React from 'react'
import PropTypes from 'prop-types'
import { FaArrowLeft } from 'react-icons/fa'
import { getHumanReadableDiff, formatDate } from '../../utils/helper'

const HeaderJobDetailComp = ({job, handleBack, isMobile}) => {
  return (
    <>
        <div className="inline-block lg:flex md:justify-between w-full">
            <div className="mb-0 flex items-center justify-between">
                <span className="flex items-end">
                    <div className="text-current visited:text-inherit hover:text-current">
                        <h1 className="text-title inline-flex items-center md:text-primary-head md:flex lg:mt-16 text-4xl font-bold">
                            {job.title}
                        </h1>
                    </div>
                </span>
                {isMobile && (
                    <div className="flex items-center mb-0 lg:hidden">
                        <FaArrowLeft onClick={handleBack} className="h-8 w-8 mr-2" />
                    </div>
                )}
            </div>
            <div className="text-subdued text-caption lg:text-right mt-4 lg:mt-0">
                <p>Posted about {getHumanReadableDiff(job.createdAt)} and deadline of application is on {formatDate(job.deadline)}</p>
            </div>
        </div>
    </>
  )
}

HeaderJobDetailComp.propTypes = {
    job: PropTypes.object.isRequired,
    handleBack: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
}

export default HeaderJobDetailComp