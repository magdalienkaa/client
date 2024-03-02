import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  userStore: UserReducer,
});

export default rootReducer;
