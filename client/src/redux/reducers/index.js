import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import exampleReducer from "./exampleReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  example: exampleReducer
});
