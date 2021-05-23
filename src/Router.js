// Imports
import React from "react";
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import { AnimatePresence } from "framer-motion";

// Routes
// Home
import MainMenu from './Home/Home'
// Account
import Account from "./Account/Account"
import Register from "./Account/Register";
import Login from "./Account/Login";
import Logout from "./Account/Logout";
// Products
import Products from "./Products/Products"
import Item from "./Products/Item"
// Basket
import Basket from "./Products/Basket"
// 404
import FourOhFour from "./Generic/FourOhFour"
// Contact
import Contact from "./Contact/Contact"
// Favs
import Favs from "./Account/Favs"
// Admin
import AddProducts from "./Admin/AddProducts"
import EditProducts from "./Admin/EditProducts"
import AnswerContact from "./Admin/AnswerContact"

function Routers() {

const location = useLocation()

// Redux data
const loggedStatus = useSelector(state => state.isLogged.isLogged)

    return (
        <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
                <Route exact path="/" render={() => (
                    <MainMenu />
                )}/>
                {/* Konto */}
                <Route exact path="/konto" render={() => (
                    <Account />
                )}/>
                <Route exact path="/rejestracja" render={() => (
                    loggedStatus ? (
                        <Redirect to="/"/>
                    ) : (
                        <Register />
                    )
                )}/>
                <Route exact path="/logowanie" render={() => (
                    loggedStatus ? (
                        <Redirect to="/"/>
                    ) : (
                        <Login />
                    )
                )}/>
                <Route exact path="/wyloguj" render={() => (
                    loggedStatus ? (
                        <Logout />
                    ) : (
                        <Redirect to="/login"/>
                    )
                )}/>
                {/* Produkty */}
                <Route exact path="/warzywa" render={() => (
                    <Products category={ window.location.pathname.split("/").pop() }/>
                )}/>
                <Route exact path="/warzywa/:item?" render={() => (
                    <Item/>
                )}/>
                <Route exact path="/owoce" render={() => (
                    <Products category={ window.location.pathname.split("/").pop() }/>
                )}/>
                <Route exact path="/owoce/:item?" render={() => (
                    <Item/>
                )}/>
                <Route exact path="/slodycze" render={() => (
                    <Products category={ window.location.pathname.split("/").pop() }/>
                )}/>
                <Route exact path="/slodycze/:item?" render={() => (
                    <Item/>
                )}/>
                <Route exact path="/chemia" render={() => (
                    <Products category={ window.location.pathname.split("/").pop() }/>
                )}/>
                <Route exact path="/chemia/:item?" render={() => (
                    <Item/>
                )}/>
                <Route exact path="/koszyk" render={() => (
                    <Basket/>
                )}/>
                {/* Kontakt */}
                <Route exact path="/kontakt" render={() => (
                    <Contact/>
                )}/>
                <Route exact path="/ulubione" render={() => (
                    <Favs/>
                )}/>
                {/* Admin */}
                <Route exact path="/dodajprodukty" render={() => (
                    loggedStatus ? (
                        <AddProducts/>
                    ) : (
                        <Redirect to="/"/>
                        )
                )}/>
                <Route exact path="/edytujprodukty" render={() => (
                    loggedStatus ? (
                        <EditProducts/>
                    ) : (
                        <Redirect to="/"/>
                        )
                )}/>
                <Route exact path="/dodajodpowiedz" render={() => (
                    loggedStatus ? (
                        <AnswerContact/>
                    ) : (
                        <Redirect to="/"/>
                    )
                )}/>

                {/* 404 */}
                <Route path="*" render={() => (
                    <FourOhFour/>
                )}/>
            </Switch>
        </AnimatePresence>
    )
}

export default Routers;

