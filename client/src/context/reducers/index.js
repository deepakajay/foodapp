//so in a project we will be having multiple reducers, so we can use a package
//combine reducers from redux and combine all the reducers to one sigle big reducer

import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import allUserReducer from "./allUsersReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  allUsers: allUserReducer,
  cart: cartReducer,
  isCart: displayCartReducer,
});

export default myReducers;
