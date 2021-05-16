import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";

// Redux
import {logOut} from "../Redux/actions/index"

// Animation
import { opacity } from "../Animation/Variables"

function AddProducts(props){
    const role = useSelector(state => state.isLogged.role)

    const dispatch = useDispatch()

    useEffect(() => {
        listen()
    })

    const listen = async () => {
        document.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault()

            let body = {
                nazwa: e.target.nazwa.value,
                rozmiar: e.target.rozmiar.value,
                producent: e.target.producent.value,
                dostepnosc: e.target.dostepnosc.value,
                cena: e.target.cena.value,
                typ: e.target.typ.value,
                opis: e.target.opis.value,
                img: "/Img/" + e.target.img.value
            }

            send(body)
                .then(data => {
                    document.querySelector("#response").innerHTML = data.type
                })
        })
    }

    const send = async (body) => {
        try {
            const res = await fetch(`http://localhost:5003/add`, {
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

                    <label htmlFor="nazwa">Nazwa produktu</label>
                    <input type="text" name="nazwa" required/>

                    <label htmlFor="rozmiar">Rozmiar produktu</label>
                    <input type="text" name="rozmiar" required/>

                    <label htmlFor="producent">Producent</label>
                    <input type="text" name="producent" required/>

                    <label htmlFor="dostepnosc">Ilość dostępnych sztuk</label>
                    <input type="number" name="dostepnosc" required/>

                    <label htmlFor="cena">Cena produktu</label>
                    <input type="number" name="cena" required/>

                    <label htmlFor="typ">Typ produktu</label>
                    <input type="text" name="typ" required/>

                    <label htmlFor="opis">Opis produktu</label>
                    <input type="text" name="opis" required/>

                    <label htmlFor="img">Zdjęcie produktu ( nazwa z rozszerzeniem )</label>
                    <input type="text" name="img" required/>

                    <button>Wyśli</button>

                </form>
            </motion.div>
        )
    } else {
        props.history.push("/");
        return "It seem like you are not logged in"
    }
}

export default withRouter(AddProducts);
