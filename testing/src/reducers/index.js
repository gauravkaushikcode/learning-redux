import { combineReducers } from "redux";
import commentsReducer from "reducers/commentsReducer";
import authReducer from "reducers/auth";

export default combineReducers({
  comments: commentsReducer,
  auth: authReducer,
});
