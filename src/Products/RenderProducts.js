import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Animation data
import {opacity} from "../Animation/Variables";

// Redux data
import {addBasket, logOut, enablePopup, disablePopup} from "../Redux/actions/index"

// Functions
import {getData} from "./GetProducts"

export default function RenderProducts(data) {

    const [category, setCategory] = useState()
    const [products, setProducts] = useState()

    const role = useSelector(state => state.isLogged.role)
    const isAdmin = role === "admin"

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            getData(data)
                .then(data => {
                    setProducts(data)
                })
        }, 1000)
    }, [category])

    const renderData = () => {
        if(products === undefined){
            return <motion.div className="fullCenter"
                variants={opacity}
                initial="init"
                animate="visible"
                exit="exit"
            >
                <h2>Wczytywanie</h2>
            </motion.div>
        } else {
            return products.map(item => {
                if(item.dostepnosc > 0){
                    return (
                        <motion.div id={item.id} key={item.id} className="productDiv"
                             variants={opacity}
                             initial="init"
                             animate="visible"
                             exit="exit"
                        >
                            <img src={item.img} alt=""/>
                            <h2>{item.nazwa}</h2>
                            <h4>Rozmiar: {item.rozmiar}</h4>
                            <h4>Cena: {item.cena} zł</h4>
                            {isAdmin ? "" : <button onClick={(e) => {
                                dispatch(
                                    addBasket(
                                        e.target.parentElement.id,
                                        e.target.parentElement.children[1].innerHTML,
                                        e.target.parentElement.children[0].src,
                                        e.target.parentElement.children[2].innerHTML,
                                        e.target.parentElement.children[3].innerHTML,
                                    )
                                )
                                dispatch(enablePopup())

                                setTimeout(() => {
                                    dispatch(disablePopup())
                                }, 3000)
                            }}>Dodaj do koszyka</button>}

                            {isAdmin ? (
                                <Link to={{
                                    pathname: '/edytujprodukty',
                                    state: { productID: item.id }
                                }} style={{ textDecoration: 'none' }}>
                                    <button>Edytuj produkt</button>
                                </Link>
                            ) : ""}
                            {isAdmin ? (
                                <button onClick={ async (e) => {
                                    document.getElementById(e.target.parentElement.id).remove()
                                    try {
                                        const res = await fetch(`http://localhost:5003/remove`, {
                                            method: "POST",
                                            headers: {'Content-Type': 'application/json'},
                                            credentials: "include",
                                            body: JSON.stringify({id: item.id})
                                        })
                                        return await res.json();
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
                                }}>Usuń produkt</button>
                            ) : ""}
                        </motion.div>
                    )
                } else {
                    return (
                        <motion.div key={item.id} id={item.id} className="productDiv" style={{filter: "grayscale(0.8)"}}
                            variants={opacity}
                            initial="init"
                            animate="visible"
                            exit="exit"
                        >
                            <img src={item.img} alt=""/>
                            <h2>{item.nazwa}</h2>
                            <h4>Rozmiar: {item.rozmiar}</h4>
                            <h4>Cena: {item.cena} zł</h4>
                            {isAdmin ? "" : <button style={{ fontSize: "larger", height: "60px" }} disabled>Produkt chwilowo niedostępny</button>}
                            {isAdmin ? (
                                <Link to={{
                                    pathname: '/edytujprodukty',
                                    state: { productID: item.id }
                                }} style={{ textDecoration: 'none' }}>
                                    <button>Edytuj produkt</button>
                                </Link>
                            ) : ""}
                            {isAdmin ? (
                                <button onClick={ async (e) => {
                                    document.getElementById(`'${item.id}'`).remove()
                                    try {
                                        const res = await fetch(`http://localhost:5003/remove`, {
                                            method: "POST",
                                            headers: {'Content-Type': 'application/json'},
                                            credentials: "include",
                                            body: JSON.stringify({id: item.id})
                                        })
                                        return await res.json();
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
                                }}>Usuń produkt</button>
                            ) : ""}
                        </motion.div>
                    )
                }

            })
        }
    }

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div className="productsDiv"
                        variants={opacity}
                        initial="init"
                        animate="visible"
                        exit="exit"

            >
                {renderData()}
            </motion.div>
        </AnimatePresence>
    )

}
