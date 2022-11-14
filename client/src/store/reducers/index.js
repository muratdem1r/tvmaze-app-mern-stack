import { combineReducers } from "redux";

import showsReducer from "./showsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  showsReducer,
  userReducer,
});

export default rootReducer;
