const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
