import React, { useState } from "react";

export const Pagination = ({ limit, total, setPage }) => {
  const totalPages = Math.ceil(total / limit);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);
  const [currPage, setCurrPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    setCurrPage(pageNumber);
    setPage(pageNumber);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center',margin:'20px' }}>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currPage - 1)}
            disabled={currPage <= 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li className="page-item" key={pageNumber}>
            <button
              value={pageNumber}
              className={pageNumber===currPage?"page-link active":"page-link"}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currPage+1)}
            disabled={currPage >= totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};
