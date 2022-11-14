const initialState = {
  shows: [],
  filteredShows: [],
  searchedShows: [],
  genre: "All",
};

const showsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHOWS":
      return {
        ...state,
        shows: action.payload,
      };
    case "SET_FILTERED_SHOWS":
      return {
        ...state,
        filteredShows: action.payload,
      };
    case "SET_SEARCHED_SHOWS":
      return {
        ...state,
        searchedShows: action.payload,
      };
    case "GENRE":
      return {
        ...state,
        genre: action.payload,
      };
    default:
      return state;
  }
};

export default showsReducer;
