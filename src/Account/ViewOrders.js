import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";

export default function ViewOrders(){
    const [orders, setOrders] = useState()
    const [products, setProducts] = useState()

    // Part for admin
    const role = (useSelector(state => state.isLogged.role) === "admin")

    useEffect(() => {
        getData()
            .then(order => setOrders(order))
    }, [])

    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:5003/getorders`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: "include"
            })
            return await res.json()
        } catch (e) {
            console.log(e)
            if(e === "TypeError: Failed to fetch"){
                return "Error"
            }
        }
    }

    const getProducts = async (body) => {
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
        if(orders === undefined){
            return "Loading"
        } else if(products === undefined) {
            console.log(orders)
            let body = {
                "data": "orders",
                "dataType": []
            }

            orders.forEach(order => {
                body["dataType"] = body["dataType"].concat(order.produktsid.split(','))
            })

            getProducts(body)
                .then(data => {
                    let productsList = []

                    orders.forEach(order => {

                        let items = order.produktsid.split(',')
                        let amounts = order.amount.split(",")

                        for(let y = 0; y < items.length;y++){
                            data.forEach(product => {
                                if(parseInt(items[y]) === product.id){
                                    productsList.push([order.timestamp, order["name"], order["userid"], amounts[y], product, order['done'], order["email"]])
                                }
                            })

                        }

                    })
                    productsList.sort((a, b) => a[0].localeCompare(b[0]));
                    setProducts(productsList)
                })
        } else {
            let time;
            return products.map(product => {
                if(time !== product[0]){
                    time = product[0]
                    return (
                        <React.Fragment key={`${product[4].id}/${product[2]}/${time}`}>
                            <h3 style={{width: "100%", textAlign: "center"}}>{time.slice(0, 10)}</h3>
                            <div className="productDiv">
                                <img src={product[4].img} alt=""/>
                                <h3>{product[4].nazwa}</h3>
                                <h4>Rozmiar: {product[4].rozmiar}</h4>
                                <h4>Cena: {product[4].cena} zł</h4>
                                <h4>Kupiono: {product[3]}</h4>
                                <h4>Status: {product[5]}</h4>
                                {role ? <h4>Kto zamówił: {product[1]}</h4> : ""}
                                {role ? <h4>Email: {product[6]}</h4> : ""}
                            </div>
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment key={`${product[4].id}/${product[2]}/${time}`}>
                            <div className="productDiv">
                                <img src={product[4].img} alt=""/>
                                <h3>{product[4].nazwa}</h3>
                                <h4>Rozmiar: {product[4].rozmiar}</h4>
                                <h4>Cena: {product[4].cena} zł</h4>
                                <h4>Kupiono: {product[3]}</h4>
                                <h4>Status: {product[5]}</h4>
                                {role ? <h4>Kto zamówił: {product[1]}</h4> : ""}
                                {role ? <h4>Email: {product[6]}</h4> : ""}
                            </div>
                        </React.Fragment>
                    )
                }
            })
        }
    }

    return (
        <div className="productsDiv">
            {renderData()}
        </div>
    )
}
