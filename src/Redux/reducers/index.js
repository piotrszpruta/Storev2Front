import loggedReducer from "./isLogged";
import baketReducer from "./basket"

import {combineReducers} from "redux";

const rootReducer = combineReducers({
    isLogged: loggedReducer,
    basket: baketReducer
})

export default rootReducer
