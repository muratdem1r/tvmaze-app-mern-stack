import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Button from "./FilterButton";
import Search from "./Search";

// Actions
import {
  setFilteredShows,
  changeGenre,
} from "../../store/actions/showsActions";

const Filter = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const searchedShows = useSelector(
    (state) => state.showsReducer.searchedShows
  );

  const activeGenre = useSelector((state) => state.showsReducer.genre);

  useEffect(() => {
    setCurrentPage(1);
    if (activeGenre === "All") {
      dispatch(changeGenre("All"));
      dispatch(setFilteredShows(searchedShows));
      return;
    }
    const filtered = searchedShows.filter((show) =>
      show.genres.includes(activeGenre)
    );
    dispatch(setFilteredShows(filtered));
  }, [activeGenre, searchedShows, dispatch, setCurrentPage]);

  return (
    <div className="filter-list">
      <Button genre="All" />
      <Button genre="Action" />
      <Button genre="Drama" />
      <Button genre="Comedy" />
      <Search setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Filter;
