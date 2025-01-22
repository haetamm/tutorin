import React from "react";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { useJobStore } from "../../store/job";

const Pagination = () => {
  const {
    currentPage,
    totalElements,
    hasNext,
    hasPrevious,
    totalPages,
    size,
    fetchJob,
  } = useJobStore();

  const startIndex = (currentPage - 1) * size + 1;
  const endIndex = Math.min(startIndex + size - 1, totalElements);

  const handleNextPage = () => {
    if (hasNext) {
      fetchJob(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevious) {
      fetchJob(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    fetchJob(1);
  };

  const handleLastPage = () => {
    fetchJob(totalPages);
  };

  const paginationActions = [
    {
      icon: <MdFirstPage className="h-7 w-7" />,
      onClick: handleFirstPage,
      enabled: hasPrevious,
    },
    {
      icon: <MdNavigateBefore className="h-7 w-7" />,
      onClick: handlePreviousPage,
      enabled: hasPrevious,
    },
    {
      icon: <MdNavigateNext className="h-7 w-7" />,
      onClick: handleNextPage,
      enabled: hasNext,
    },
    {
      icon: <MdLastPage className="h-7 w-7" />,
      onClick: handleLastPage,
      enabled: hasNext,
    },
  ];

  return (
    <div className="flex items-center justify-between gap-2 p-2 font-bold text-sm">
      {paginationActions.slice(0, 2).map((action, index) => (
        <a
          key={index}
          className={`rounded-full text-xl px-2 py-0.5 ${
            action.enabled
              ? "text-black cursor-pointer hover:bg-gray-200"
              : "text-gray-300 cursor-default"
          }`}
          onClick={action.onClick}
          disabled={!action.enabled}
        >
          {action.icon}
        </a>
      ))}

      <span className="px-4 flex-1 text-center">
        {startIndex} - {endIndex} of {totalElements}
      </span>

      {paginationActions.slice(2).map((action, index) => (
        <a
          key={index}
          className={`rounded-full text-xl px-2 py-0.5 ${
            action.enabled
              ? "text-black cursor-pointer hover:bg-gray-200"
              : "text-gray-300 cursor-default"
          }`}
          onClick={action.onClick}
          disabled={!action.enabled}
        >
          {action.icon}
        </a>
      ))}
    </div>
  );
};

export default Pagination;
