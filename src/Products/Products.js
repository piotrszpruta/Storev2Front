import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { motion } from "framer-motion";

// Redux data
import {addBasket, logOut} from "../Redux/actions/index"

// Animation
import { opacity } from "../Animation/Variables"

export default function Products(data){
    const [category, setCategory] = useState("home")
    const [products, setProducts] = useState()

    const dispatch = useDispatch()

    const role = useSelector(state => state.isLogged.role)
    const isAdmin = role === "admin"


    useEffect(() => {
        setCategory(data.category)
    }, [data.category])

    useEffect(() => {
        getData(data)
            .then(data => {
                setProducts(data)
            })
    }, [category])

    const getData = async (data) => {

        let body = {
            "category": data.category,
            "data": "all"
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

    const renderData = () => {
        if(products === undefined){
            return <motion.div
                variants={opacity}
                initial="init"
                animate="visible"
                exit="exit"
            >
                Wczytywanie
            </motion.div>
        } else {
            return products.map(item => {
                if(item.dostepnosc > 0){
                    return (
                        <div id={item.id} key={item.id} className="productDiv">
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
                                    console.log(e.target.parentElement.remove())
                                    try {
                                        const res = await fetch(`http://localhost:5003/remove`, {
                                            method: "POST",
                                            headers: {'Content-Type': 'application/json'},
                                            credentials: "include",
                                            body: JSON.stringify({id: item.id})
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
                                }}>Usuń produkt</button>
                            ) : ""}
                         </div>
                            )
                } else {
                    return (
                        <div key={item.id} className="productDiv">
                            <img src={item.img} alt=""/>
                            <h2>{item.nazwa}</h2>
                            <h4>Rozmiar: {item.rozmiar}</h4>
                            <h4>Cena: {item.cena} zł</h4>
                            {isAdmin ? "" : <button disabled>Produkt chwilowo niedostępny</button>}
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
                                    console.log(e.target)
                                    try {
                                        const res = await fetch(`http://localhost:5003/remove`, {
                                            method: "POST",
                                            headers: {'Content-Type': 'application/json'},
                                            credentials: "include",
                                            body: JSON.stringify({id: item.id})
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
                                }}>Usuń produkt</button>
                            ) : ""}
                        </div>
                    )
                }

            })
        }
    }

    return (
        <div className="productsDiv"
             variants={opacity}
             initial="init"
             animate="visible"
             exit="exit"

        >
            {renderData()}
        </div>
    )
}
