import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";

// Redux data
import {logOut} from "../Redux/actions/index"

import "../Css/Contact.css"

export default function Contact(){
    const [contact, setContact] = useState()

    const dispatch = useDispatch()

    const role = useSelector(state => state.isLogged.role)

    useEffect(() => {
        getData()
            .then(messages => setContact(messages))
    }, [])

    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:5003/getcontact`, {
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

    const sendMessage = async (e) => {
        e.preventDefault()

        let body = {"topic": "", "message": ""}
        body["topic"] = e.target.topic.value
        body["message"] = e.target.message.value

        try {
            const res = await fetch(`http://localhost:5003/addmessage`, {
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

    const mapMessages = () => {
        return contact.map(item => {
            return (
                <div key={item.id}>
                    <h3>Temat: {item.topic}</h3>
                    <h3>Zapytanie: {item.data}</h3>
                    <h3>Dzień miesiąc rok: {(item["timestamp"].split('T'))[0]}</h3>
                    <h3>Godzina: {(item["timestamp"].split('T'))[1].slice(0, -5)}</h3>
                </div>
            )
        })
    }

    const renderData = () => {
        if(contact === undefined){
            return "Loading"
        } else {
            if(role === "admin"){
                return mapMessages()
            } else {
                return (
                    <div>
                        <div className="form">
                            <h2>Skontaktuj się z nami</h2>
                            <form onSubmit={sendMessage}>
                                <label htmlFor="topic">Temat wiadomości</label>
                                <input type="text" name="topic"/>

                                <label htmlFor="message">Treść wiadomości</label>
                                <input type="text" name="message"/>

                                <button>Wyśli</button>
                            </form>
                        </div>
                        {mapMessages()}
                    </div>
                )
            }
        }
    }

    return (
        <div className="productsDiv">
            {renderData()}
        </div>
    )
}