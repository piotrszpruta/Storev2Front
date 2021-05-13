import React from 'react'
import {useSelector, useDispatch} from "react-redux";

// Redux data
import {logOut} from "../Redux/actions/index"

// My modules
import LogOut from "./Logout"
import ViewOrders from "./ViewOrders"

export default function LoggedUser(){

    const dispatch = useDispatch()

    const role = useSelector(state => state.isLogged.role)

    const removeToken = async () => {
        LogOut()
            .then(data => {
                if(data.Type === 1){
                    dispatch(logOut())
                }
            })
    }

    return (
        <div className="center">
            <button onClick={removeToken}>Log out</button>
            Logged user
            <ViewOrders/>
        </div>
    )
}
