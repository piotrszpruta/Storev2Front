import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";

// Reducers
import rootReducer from "./Redux/reducers/index"

// Create store
const store = createStore(
    rootReducer,
    // To niżej pozwala na tryb edycji danych reduxa z przeglądarki ( zbadaj element ).
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);
