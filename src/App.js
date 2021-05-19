import React, { useEffect } from "react";
import Routers from "./Router";
import {BrowserRouter as Router} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";

// Redux data
import {logIn} from "./Redux/actions/index"

// Css
import "./Css/style.css"
import "./Css/fontello/css/fontello.css"

// My modules
import Navbar from "./Generic/Navbar"
import Popup from "./Generic/Popup";

export default function App(){

    const dispatch = useDispatch()

    const loggedStatus = useSelector(state => state.isLogged.isLogged)

    useEffect(() => {
        if(loggedStatus === false){
            FetchToken()
        }
    });

    const FetchToken = () => {
        fetch(`http://localhost:5003/token`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if(data.Type === 1){
                    dispatch(logIn(true, data.Role))
                }
            })
    }

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Popup />
                <div className="content">
                    <Routers />
                </div>
            </div>
        </Router>
    );
}
