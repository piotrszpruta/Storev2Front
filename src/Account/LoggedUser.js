import React from 'react'
import {useDispatch} from "react-redux";
import { motion } from "framer-motion";

// Redux data
import {logOut} from "../Redux/actions/index"

// Animation
import { opacity } from "../Animation/Variables"

// My modules
import LogOut from "./Logout"
import ViewOrders from "./ViewOrders"

export default function LoggedUser(){

    const dispatch = useDispatch()

    const removeToken = async () => {
        LogOut()
            .then(data => {
                if(data.Type === 1){
                    dispatch(logOut())
                }
            })
    }

    return (
        <motion.div className="center"
             variants={opacity}
             initial="init"
             animate="visible"
             exit="exit"
        >
            <button onClick={removeToken}>Log out</button>
            Logged user
            <ViewOrders/>
        </motion.div>
    )
}
