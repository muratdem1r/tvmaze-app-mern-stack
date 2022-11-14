const setShows = (shows) => {
  return {
    type: "SET_SHOWS",
    payload: shows,
  };
};
const setFilteredShows = (shows) => {
  return {
    type: "SET_FILTERED_SHOWS",
    payload: shows,
  };
};
const setSearchedShows = (shows) => {
  return {
    type: "SET_SEARCHED_SHOWS",
    payload: shows,
  };
};
const changeGenre = (genre) => {
  return {
    type: "GENRE",
    payload: genre,
  };
};

export { setShows, setFilteredShows, setSearchedShows, changeGenre };
