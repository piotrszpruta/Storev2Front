import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";

export default function ViewOrders(){
    const [orders, setOrders] = useState()
    const [products, setProducts] = useState()

    // Part for admin
    const role = useSelector(state => state.isLogged.role)

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
            let body = {
                "data": "orders",
                "dataType": []
            }

            orders.forEach(order => {
                body["dataType"] = body["dataType"].concat(order.produktsid.split(','))
            })

            getProducts(body)
                .then(data => {
                    let id;
                    orders.forEach(order => {
                        let ids = order.produktsid.split(',')
                        let amounts = order.amount.split(',')

                        data.forEach(product => {
                            for(let x=0;x < amounts.length;x++){
                                if(product.id === parseInt(ids[x])){
                                    if(id !== order["userid"]) {
                                        id = order["userid"]
                                    }
                                    product["amount"] = amounts[x]
                                    product["userid"] = order["userid"]
                                    product["time"] = (order["timestamp"].split('T'))[0]
                                    product["timestamp"] = order["timestamp"]
                                }
                            }
                        })
                    })
                    data.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
                    setProducts(data)
                })
        } else {
            let timeStamp;
            return products.map(item => {
                if(item.time !== timeStamp){
                    timeStamp = item.time
                    return (
                        <React.Fragment key={item.timestamp}>
                            <h3 style={{width: "100%", textAlign: "center"}}>{item.time}</h3>
                            <div key={`${item.id}/${item.userid}/${item.timestamp}`} className="productDiv">
                                <img src={item.img} alt=""/>
                                <h3>{item.nazwa}</h3>
                                <h4>Rozmiar: {item.rozmiar}</h4>
                                <h4>Cena: {item.cena} zł</h4>
                                <h4>Kupiono: {item.amount}</h4>
                            </div>
                        </React.Fragment>
                                )
                } else {
                    return (
                        <div key={`${item.id}/${item.userid}/${item.timestamp}`} className="productDiv">
                            <img src={item.img} alt=""/>
                            <h3>{item.nazwa}</h3>
                            <h4>Rozmiar: {item.rozmiar}</h4>
                            <h4>Cena: {item.cena} zł</h4>
                            <h4>Kupiono: {item.amount}</h4>
                        </div>
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
