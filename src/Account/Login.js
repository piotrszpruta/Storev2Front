import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { motion } from "framer-motion";

// Redux data
import {logIn} from "../Redux/actions/index"

// Animation
import { opacity } from "../Animation/Variables"

export default function Login(){

    useEffect(() => {
        if(window.history.state){
            if(window.history.state.state !== undefined && window.history.state.state.registered === true){
                document.querySelector(".LoginHeader").innerHTML = "Zarejestrowano poprawnie. Aby używać konta, należy się zalogować"
            }
        }
    });

    const dispatch = useDispatch()

        const login = async (e) => {
            e.preventDefault();

            // Reset errors
            const emailError = document.querySelector('.email.error')
            const passwordError = document.querySelector('.password.error')
            emailError.textContent = '';
            passwordError.textContent = '';

            // Get data
            const email = e.target.email.value;
            const password = e.target.password.value;

            try {
                const res = await fetch(`http://localhost:5003/login`, {
                    method: "POST",
                    body: JSON.stringify({email, password}),
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                });
                const data = await res.json();
                if (data.password || data.email) {
                    emailError.textContent = data.email;
                    passwordError.textContent = data.password;
                } else if (data.Type === 1) {
                    dispatch(logIn(true, data.Role))
                }
            }
            catch (e) {
                console.log(e)
            }
        }

    return (
        <motion.div className="accountForm formLogin"
             variants={opacity}
             initial="init"
             animate="visible"
             exit="exit"

        >
            <form onSubmit={login}>
                <h2 className="LoginHeader">Logowanie</h2>

                <div className="input">
                    <label htmlFor="email">Email</label><br/>
                    <input type="email" name="email" required />
                    <div className="email error"> </div>
                </div>

                <div className="input">
                    <label htmlFor="email">Hasło</label><br/>
                    <input type="password" name="password" required />
                    <div className="password error"> </div>
                </div>

                <button>Zaloguj</button>
            </form>
            <h1>Nie posiadasz konta ?<Link to={`/rejestracja`} style={{display: "block"}}>Zarejestruj</Link></h1>
        </motion.div>
    )

}
