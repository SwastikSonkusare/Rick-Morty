import React from "react";

import "./Pagination.css";

const Pagination = ({ charactersPerPage, totalCharacters, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginate">
      <div className="paginate__container">
        {pageNumbers.map((number) => (
          <div key={number}>
            <span onClick={() => paginate(number)}>{number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
