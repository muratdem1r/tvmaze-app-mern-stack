import React from "react";

export const Pagination = ({
  showsPerPage,
  totalShows,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalShows / showsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (totalShows <= showsPerPage) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              href="!#"
              onClick={(e) => paginate(e, number)}
              className={
                (currentPage === number ? "active " : "") + "page-link"
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
