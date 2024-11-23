import React from 'react'

import './style.css'

const Pagination = ({currentPage, totalPages, onPageChange}) => (
  <div className="pagination">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      type="button"
    >
      Prev
    </button>
    <span>
      {currentPage} / {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      type="button"
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)

export default Pagination
