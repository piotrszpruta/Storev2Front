import React, { useEffect } from "react";
import Routers from "./Router";
import {BrowserRouter as Router} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";

// Redux data
import {logIn} from "./Redux/actions/index"

// Css
import "./Css/General.css"
import "./Css/fontello/css/fontello.css"
import "./Css/Addons.css"
import "./Css/Account.css"

// My modules
import Navbar from "./Generic/Navbar"

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
                <div className="content">
                    <Routers />
                </div>
            </div>
        </Router>
    );
}
