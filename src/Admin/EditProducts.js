import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";

// Redux
import {logOut} from "../Redux/actions/index"

// Animation
import { opacity } from "../Animation/Variables"

function EditProducts(props){
    const role = useSelector(state => state.isLogged.role)
    const [products, setProducts] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        getData(props.history.location.state.productID)
            .then(data => {
                setProducts(data[0])
            })
    }, [])

    useEffect(() => {
        if(products !== undefined){
            let form = document.querySelector("form")
            form.nazwa.value = products.nazwa
            form.rozmiar.value = products.rozmiar
            form.producent.value = products.producent
            form.dostepnosc.value = products.dostepnosc
            form.cena.value = products.cena
            form.typ.value = products.typ
            form.opis.value = products.opis
            if(products.img.includes("/Img/")){
                products.img = products.img.slice(5)
            }
            form.img.value = products.img

            listen()
        }
    }, [products])

    const getData = async (data) => {
        let body = {
            "data": data,
            "dataType": "id"
        }

        try {
            const res = await fetch(`http://localhost:5003/get`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(body)
            })
            return await res.json()
        } catch (e) {
            console.log(e)
            if(e === "TypeError: Failed to fetch"){
                return "Error"
            }
        }
    }

    const listen = () => {
        document.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault()

            let body = {
                id: products.id,
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
            const res = await fetch(`http://localhost:5003/update`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(body)
            })
            const data = await res.json();
            if(data.message){
                if(data.message === "Token invalid"){
                    dispatch(logOut())
                } else {
                    return data
                }
            }
        } catch (e) {
            console.log(e)
            if(e === "TypeError: Failed to fetch"){
                return "Error"
            }
        }
    }

    const ClearData = () => {
        document.querySelector('#response').innerHTML = '';
    }

    if(role === "admin"){
        return (
            <motion.div className="center editProducts"
                variants={opacity}
                initial="init"
                animate="visible"
                exit="exit"
            >
                <h1 id="response"> </h1>
                <h2>Edycja produktu</h2>
                <form onClick={ClearData}>

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
        return <motion.div
            variants={opacity}
            initial="init"
            animate="visible"
            exit="exit"
        >
            It seem like you are not logged in
        </motion.div>
    }
}

export default withRouter(EditProducts);
