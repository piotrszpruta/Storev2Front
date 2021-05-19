import loggedReducer from "./isLogged";
import baketReducer from "./basket"
import popupActivator from "./popup";
import favsReducer from "./favorite";

import {combineReducers} from "redux";

const rootReducer = combineReducers({
    isLogged: loggedReducer,
    basket: baketReducer,
    popup: popupActivator,
    favs: favsReducer
})

export default rootReducer
