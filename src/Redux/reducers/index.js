import loggedReducer from "./isLogged";
import baketReducer from "./basket"
import popupActivator from "./popup";

import {combineReducers} from "redux";

const rootReducer = combineReducers({
    isLogged: loggedReducer,
    basket: baketReducer,
    popup: popupActivator
})

export default rootReducer
