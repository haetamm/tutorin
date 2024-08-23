import React from 'react'
import PropTypes from 'prop-types'
import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

const Pagination = ({ currentPage, totalElements, hasNext, hasPrevious, size, totalPages, setCurrentPage }) => {

  const startIndex = (currentPage - 1) * size + 1
  const endIndex = Math.min(startIndex + size - 1, totalElements)

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const handleFirstPage = () => {
    setCurrentPage(1)
  }

  const handleLastPage = () => {
    setCurrentPage(totalPages)
  }

  const paginationActions = [
    { icon: <MdFirstPage className="h-7 w-7" />, onClick: handleFirstPage, enabled: hasPrevious },
    { icon: <MdNavigateBefore className="h-7 w-7" />, onClick: handlePreviousPage, enabled: hasPrevious },
    { icon: <MdNavigateNext className="h-7 w-7" />, onClick: handleNextPage, enabled: hasNext },
    { icon: <MdLastPage className="h-7 w-7" />, onClick: handleLastPage, enabled: hasNext },
  ]

  return (
    <div className="flex items-center justify-between gap-2 p-2 font-bold text-sm">
      {paginationActions.slice(0, 2).map((action, index) => (
        <a
          key={index}
          className={`rounded-full text-xl px-2 py-0.5 ${action.enabled ? 'text-black cursor-pointer hover:bg-gray-200' : 'text-gray-300 cursor-default'}`}
          onClick={action.onClick}
          disabled={!action.enabled}
        >
          {action.icon}
        </a>
      ))}

      <span className="px-4 flex-1 text-center">{startIndex} - {endIndex} of {totalElements}</span>

      {paginationActions.slice(2).map((action, index) => (
        <a
          key={index}
          className={`rounded-full text-xl px-2 py-0.5 ${action.enabled ? 'text-black cursor-pointer hover:bg-gray-200' : 'text-gray-300 cursor-default'}`}
          onClick={action.onClick}
          disabled={!action.enabled}
        >
          {action.icon}
        </a>
      ))}
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalElements: PropTypes.number.isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
}

export default Pagination
