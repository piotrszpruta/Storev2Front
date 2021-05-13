import React from 'react'
import {useSelector} from "react-redux";

// Components
import LoggedUser from "./LoggedUser"
import Login from "./Login"

export default function Account(){

    const loggedStatus = useSelector(state => state.isLogged.isLogged)

    if(loggedStatus){
        return <LoggedUser/>
    } else {
        return (
           <Login/>
        )
    }
}
