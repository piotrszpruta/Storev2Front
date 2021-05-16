import React from 'react'
import { Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

// Animation
import { opacity } from "../Animation/Variables"

export default function Register(){

    const history = useHistory();

    const register = async (e) => {
        e.preventDefault()

        // Reset errors
        document.querySelector(".nameerror").innerHTML = ' ';
        document.querySelector(".passworderror").innerHTML = ' ';
        document.querySelector(".emailerror").innerHTML = ' '

        // Send request
        try {
            const res = await fetch(`http://localhost:5003/register`, {
                method: "POST",
                body: JSON.stringify({ username: e.target.name.value, email: e.target.email.value, password: e.target.password.value, password2: e.target.password2.value}),
                headers: { 'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data)
            if(data.username){
                document.querySelector(".nameerror").innerHTML = data.username;
            }
            if(data.email){
                document.querySelector(".emailerror").innerHTML = data.email;
            }
            if(data.password){
                document.querySelector(".passworderror").innerHTML = data.password;
            } else if(data.Type === 1){
                history.push({
                    pathname: '/logowanie',
                    state: { registered: true }
                })
            }
        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <motion.div className="accountForm formRegister"
             variants={opacity}
             initial="init"
             animate="visible"
             exit="exit"
        >
            <form onSubmit={register}>
                <h2>Rejestracja</h2>

                <div className="input">
                    <label htmlFor="name">Imię</label><br/>
                    <input type="text" name="name" required />
                    <div className="nameerror"> </div>
                </div>

                <div className="input">
                    <label htmlFor="email">Email</label><br/>
                    <input type="email" name="email" required />
                    <div className="emailerror"> </div>
                </div>

                <div className="input">
                    <label htmlFor="password">Hasło</label><br/>
                    <input type="password" name="password" required />
                    <div className="passworderror"> </div>
                </div>

                <div className="input">
                    <label htmlFor="password2">Potwórz hasło</label><br/>
                    <input type="password" name="password2" required />
                </div>

                <button>Zarejestruj</button>
            </form>
            <h1>Posiadasz już konto?<Link to={`/logowanie`} style={{display: "block"}}>Zaloguj</Link></h1>
        </motion.div>
    )
}
