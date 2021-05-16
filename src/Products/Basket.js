import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

// Redux data
import {logOut, removeBasket, clearBasket} from "../Redux/actions/index"

export default function Basket(){
    let data = {}
    const dispatch = useDispatch()

    const [done, setDone] = useState(false)

    const basketStatus = useSelector(state => state.basket)
    const loggedStatus = useSelector(state => state.isLogged.isLogged)
    const isBasketEmpty = Object.keys(basketStatus).length > 0

    const renderBasket = () => {
        return basketStatus.map(item => {
            return (
                <div className="productDiv" key={item.id} id={item.id}>
                    <img src={item.img} alt="img"/>
                    <h2>{item.name}</h2>
                    <h2>{item.size}</h2>
                    <h2 className={item.price}>Cena: {item.price} zł</h2>
                    <input name="ilosc" type="number" placeholder="Ilość" onChange={updateBasket}/>
                    <h4 onClick={(e) => dispatch(removeBasket(e.target.parentElement.id))}>Usuń z koszyka</h4>
                </div>
            )
        })
    }

    const updateBasket = (e) => {
        data[e.target.parentElement.id] = e.target.parentElement.children[3].className * e.target.value
        let summary = 0;
        Object.keys(data).forEach(item => {
            summary += data[item]
        })
        document.querySelector(".basketMoney").innerHTML = summary
    }

    const basketSummary = () => {
        if(loggedStatus === true){
            let ids = []
            let amounts =[]
            let basketItems = document.querySelector('.basketMenuInner')
            for(let x=0;x<basketItems.childElementCount;x++){
                if(basketItems.children[x].children.ilosc.value !== ""){
                    ids.push(basketItems.children[x].id)
                    amounts.push(basketItems.children[x].children.ilosc.value)
                }
            }

            let body = {
                ids: ids,
                amounts: amounts,
                summary: document.querySelector(".basketMoney").innerHTML
            }

            if(body["ids"].length === 0 || body["amounts"].length === 0){
                setTimeout(() => {
                    document.querySelector(".errors").innerHTML = "Wygląda na to, iż nie zostały wybrane żadne produkty."
                }, 100)
            } else {
                send(body)
                    .then(data => {
                        if(data.type === "success"){
                            setDone(true)
                            dispatch(clearBasket())
                        }
                    })
            }
        } else {
            setTimeout(() => {
                document.querySelector(".errors").innerHTML = "Wygląda na to że nie jesteś zalogowany. W celu zakupienia produktów, zaloguj się"
            }, 100)
        }
    }

    const send = async (body) => {
        try {
            const res = await fetch(`http://localhost:5003/addorder`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(body)
            })
            const data = await res.json();
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

    const didOrder = () => {
        if(done === false){
            return <h2>Wygląda na to, iż nie wybrałeś żadnych produktów</h2>
        } else {
            return <h2>Produkty zostały zamówione</h2>
        }
    }

    const ClearData = () => {
        document.querySelector('.errors').innerHTML = "";
    }

    const basketNotEmpty = () => {
        return (
            <>
                <div className="basketSubmit" onClick={ClearData}>
                    <h1 className="errors" style={{color: "red"}}> </h1>
                    <h1 className="success" style={{color: "green"}}> </h1>
                    <h2>Podsumowanie koszyka</h2>
                    <hr/>
                    <span>
                <h3 style={{display: "inlineBlock"}}>Razem wychodzi: </h3>
                <h3 style={{display: "inlineBlock"}} className="basketMoney">0</h3>
                <button onClick={basketSummary} className="orderButton">Zamów</button>
            </span>
                </div>
                <div className="basketMenuInner" onClick={ClearData}>
                    {renderBasket()}
                </div>
            </>
        )
    }

    return(
    <div className="basketMenuOutter">
        {isBasketEmpty ? basketNotEmpty() : didOrder()}
    </div>
    )

}
