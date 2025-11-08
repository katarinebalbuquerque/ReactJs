import {combineReducers} from "redux";
import UserReducer from "./user/reducer";
import CartReducer from "./cart/reducer";

const rootReducer = combineReducers({UserReducer, CartReducer});

export default rootReducer;