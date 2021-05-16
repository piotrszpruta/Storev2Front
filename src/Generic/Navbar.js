import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { motion } from "framer-motion";

// Redux
import {removeBasket} from "../Redux/actions/index"

const svgVariants = {
    init: {
        opacity: 0
    },
    finished: {
        opacity: 1,
        transition: {
            duration: 1,
            delay: 0.5
        }
    }
}

export default function Navbar() {

    const dispatch = useDispatch()

    const role = useSelector(state => state.isLogged.role)
    const basketStatus = useSelector(state => state.basket)

    const showBasket = () => {
        document.querySelector(".basketDrop").classList.toggle("basketDrop-active")
    }

    const toggleNav = () => {
        document.querySelector(".navbar").classList.toggle("navbar-active")
        document.querySelector(".navbar").classList.toggle("navbar-inactive")

        document.querySelector(".burger").classList.toggle("burger-active")
        document.querySelector(".burger").classList.toggle("burger-inactive")
    }

        return (
            <>
                <motion.div className="navbar navbar-inactive"
                    variants={svgVariants}
                    initial="init"
                    animate="finished"
                >
                    <motion.span className="logo"
                      initial={{
                          x: -200
                      }} animate={{
                        x: 0
                    }} transition={{
                        delay: 2,
                        type: "spring",
                        // Stiffness = tylko spring
                        stiffness: 50
                    }}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <h5 id="navLogo">Capri</h5>
                        </Link>
                    </motion.span>
                    <span className="links" onClick={toggleNav}>
                        <Link to="/warzywa" style={{ textDecoration: 'none' }}>
                            <div className="navlink"><h5>Warzywa</h5></div>
                        </Link>
                        <Link to="/owoce" style={{ textDecoration: 'none' }}>
                            <div className="navlink"><h5>Owoce</h5></div>
                        </Link>
                        <Link to="/slodycze" style={{ textDecoration: 'none' }}>
                            <div className="navlink"><h5>Słodycze</h5></div>
                        </Link>
                        <Link to="/chemia" style={{ textDecoration: 'none' }}>
                            <div className="navlink"><h5>Chemia</h5></div>
                        </Link>
                    </span>
                    <span className="navAccount" onClick={toggleNav}>
                        <Link to="/kontakt" style={{ textDecoration: 'none' }}>
                            <i className="icon-phone navIcon"> </i>
                        </Link>
                        <i className="icon-basket navIcon" onClick={showBasket}> </i>
                        <Link to="/ulubione" style={{ textDecoration: 'none' }}>
                            <i className="icon-heart navIcon"> </i>
                        </Link>
                        <Link to="/konto" style={{ textDecoration: 'none' }}>
                            <i className="icon-adult navIcon loginIcon"> </i>
                        </Link>
                    </span>
                </motion.div>
                <div className="burger" onClick={toggleNav}>
                    <div className="line1"> </div>
                    <div className="line2"> </div>
                    <div className="line3"> </div>
                </div>
                {isAdmin(role)}
                <div className="basketDrop">
                    {basketStatus.map(item => {
                        return <span key={item.id} id={item.id} className="basketItem"><img src={item.img} alt="img"/><h4>{item.name}</h4><h3 onClick={(e) => dispatch(removeBasket(e.target.parentElement.id))}>X</h3></span>
                    })}
                    <hr/>
                    <Link to="/koszyk" style={{ textDecoration: 'none' }}>
                        <div><h5>Sprawdź pełny koszyk</h5></div>
                    </Link>
                </div>
            </>
        )
}

const isAdmin = (userRole) => {
    if(userRole === "admin"){
        return (
            <div className="adminNavbar">
                <span className="adminLinks">
                        <Link to="/dodajprodukty" style={{ textDecoration: 'none' }}>
                            <div><h5>Dodawanie produktów</h5></div>
                        </Link>

                        <Link to="/kontakt" style={{ textDecoration: 'none' }}>
                            <div><h5>Kontakt</h5></div>
                        </Link>

                        <Link to="/design" style={{ textDecoration: 'none' }}>
                            <div><h5>Układ strony</h5></div>
                        </Link>
                    </span>
            </div>
        )
    }
}
