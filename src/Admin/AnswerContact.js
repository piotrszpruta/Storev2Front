import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";

// Redux
import {logOut} from "../Redux/actions/index"

// Animation
import { opacity } from "../Animation/Variables"

function AnswerContact(props){
    const role = useSelector(state => state.isLogged.role)

    const dispatch = useDispatch()

    useEffect(() => {
        listen()
    })

    const listen = async () => {
        document.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault()

            let body = {
                id: props.location.state.id,
                value: e.target.odpowiedz.value
            }

            send(body)
                .then(data => {
                    document.querySelector("#response").innerHTML = data.type
                    document.querySelector("form").innerHTML = ""
                })
        })
    }

    const send = async (body) => {
        try {
            const res = await fetch(`http://localhost:5003/answer`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(body)
            })
            const data = await res.json();
            console.log(data)
            if(data.message){
                if(data.message === "Token invalid"){
                    dispatch(logOut())
                }
            } else {
                return data
            }
        } catch (e) {
            console.log(e)
            if(e === "TypeError: Failed to fetch"){
                return "Error"
            }
        }
    }


    if(role === "admin"){
        return (
            <motion.div className="center addProducts"
                        variants={opacity}
                        initial="init"
                        animate="visible"
                        exit="exit"
            >
                <h1 id="response"> </h1>
                <h2>Dodawanie produktu</h2>
                <form>

                    <label htmlFor="odpowiedz">Odpowiedź</label>
                    <input type="text" name="odpowiedz" required/>

                    <button>Wyśli</button>

                </form>
            </motion.div>
        )
    } else {
        props.history.push("/");
        return "It seem like you are not logged in"
    }
}

export default withRouter(AnswerContact);
