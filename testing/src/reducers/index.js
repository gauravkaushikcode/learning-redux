import { combineReducers } from "redux";
import commentsReducer from "reducers/commentsReducer";

export default combineReducers({
  comments: commentsReducer,
});
