import React, { useState } from "react";
import { useSelector } from "react-redux";

// Components
import Pagination from "../components/ui/Pagination";
import Filter from "../components/Filters/Filter";
import Shows from "../components/Shows/Shows";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showsPerPage] = useState(20);

  const filteredShows = useSelector(
    (state) => state.showsReducer.filteredShows
  );

  // Get current shows
  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = filteredShows.slice(indexOfFirstShow, indexOfLastShow);

  // Change page
  const paginate = (e, number) => {
    e.preventDefault();
    setCurrentPage(number);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container">
      <Filter setCurrentPage={setCurrentPage} />
      <Shows currentShows={currentShows} />
      <Pagination
        showsPerPage={showsPerPage}
        totalShows={filteredShows.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default HomePage;
