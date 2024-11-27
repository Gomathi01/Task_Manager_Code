import React from "react";

const Pagination = ({ currentPage, totalTasks, tasksPerPage, handlePageChange }) => {
  const pageCount = Math.ceil(totalTasks / tasksPerPage);

  return (
    <>
      {totalTasks > tasksPerPage && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
             Page {currentPage} of {pageCount}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
