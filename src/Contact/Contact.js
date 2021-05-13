import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";

// Redux data
import {logOut} from "../Redux/actions/index"


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
            if(data.message){
                if(data.message === "Token invalid"){
                    dispatch(logOut())
                }
            } else {
                if(data.type === "success"){
                    document.querySelector(".form").innerHTML = '<h3 className="response">Wiadomość została wysłana</h3>'
                }
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
                <div key={item.id} className="contactMessage">
                    <h3>Temat: </h3>
                    <h4>{item.topic}</h4>
                    <h3>Zapytanie: </h3>
                    <h4>{item.data}</h4>
                    <h6>Dzień miesiąc rok: {(item["timestamp"].split('T'))[0]}</h6>
                    <h6>Godzina: {(item["timestamp"].split('T'))[1].slice(0, -5)}</h6>
                </div>
            )
        })
    }

    const renderData = () => {
        if(contact === undefined){
            return "Loading"
        } else if(contact.Type !== undefined){
            return (
            <div className="contactNoLogged">
                <h3>Wygląda na to, iż nie jesteś zalogowany. W celu skontaktowania się z nami, zaloguj się</h3>
            </div>)
        } else {
            if(role === "admin"){
                return mapMessages()
            } else {
                return (
                    <>
                        <div className="form">
                            <h2>Skontaktuj się z nami</h2>
                            <form onSubmit={sendMessage}>
                                <label htmlFor="topic">Temat wiadomości</label>
                                <input type="text" name="topic" required/>

                                <label htmlFor="message">Treść wiadomości</label>
                                <input type="text" name="message" required/>

                                <button>Wyśli</button>
                            </form>
                        </div>
                        <div className="contactMessages">
                            {mapMessages()}
                        </div>
                    </>
                )
            }
        }
    }

    return (
        <div className="contactPage">
            {renderData()}
        </div>
    )
}
