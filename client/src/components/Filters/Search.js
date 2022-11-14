import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Actions
import { setSearchedShows } from "../../store/actions/showsActions";

const Search = ({ setCurrentPage }) => {
  const dispatch = useDispatch();

  const shows = useSelector((state) => state.showsReducer.shows);

  const [searchedData, setSearchedData] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchedData.length === 0) {
        dispatch(setSearchedShows(shows));
      } else {
        const getSearchedData = async (e) => {
          const query = "https://api.tvmaze.com/search/shows?q=" + searchedData;
          try {
            const response = await axios.get(query);

            let searched = [];
            response.data.forEach((data) => {
              searched.push(data.show);
            });
            dispatch(setSearchedShows(searched));
          } catch (error) {
            console.error(error);
          }
        };
        getSearchedData();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchedData, shows, dispatch]);

  return (
    <input
      id="search-show"
      autoFocus
      placeholder="Search.."
      autoComplete="off"
      type="search"
      onChange={(e) => setSearchedData(e.target.value)}
    ></input>
  );
};

export default Search;
