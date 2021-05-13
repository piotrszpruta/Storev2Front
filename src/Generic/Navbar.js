import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";

// Css
import "../Css/SideBar.css"

// Redux
import {removeBasket} from "../Redux/actions/index"

export default function Navbar() {

    const dispatch = useDispatch()

    const role = useSelector(state => state.isLogged.role)
    const loggedStatus = useSelector(state => state.isLogged.isLogged)
    const basketStatus = useSelector(state => state.basket)

    const showBasket = () => {
        document.querySelector(".basketDrop").classList.toggle("basketDrop-active")
    }

        return (
            <>
                <div className="navbar">
                <span className="logo">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h5 id="navLogo">Capri</h5>
                    </Link>
                </span>
                    <span className="links">
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
                    <span className="navAccount">
                    <Link to="/kontakt" style={{ textDecoration: 'none' }}>
                        <i className="icon-phone navIcon"> </i>
                    </Link>
                    <i className="icon-basket navIcon" onClick={showBasket}> </i>
                    <Link to="/ulubione" style={{ textDecoration: 'none' }}>
                        <i className="icon-heart navIcon"> </i>
                    </Link>
                        {isUserLogged(loggedStatus)}
                </span>
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
            <div className="adminNavbar basketDrop">
                <span className="adminLinks">
                        <Link to="/dodajprodukty" style={{ textDecoration: 'none' }}>
                            <div><h5>Dodawanie produktów</h5></div>
                        </Link>

                        <Link to="/kontakt" style={{ textDecoration: 'none' }}>
                            <div><h5>Kontakt</h5></div>
                        </Link>

                    {/*<Link to="/design" style={{ textDecoration: 'none' }}>*/}
                    {/*    <div><h5>Układ strony</h5></div>*/}
                    {/*</Link>*/}
                    </span>
            </div>
        )
    }
}

const isUserLogged = (status) => {
    if(status === true){
        return (
            <Link to="/konto" style={{ textDecoration: 'none' }}>
                <i className="icon-adult navIcon loginIcon"> </i>
            </Link>
        )
    } else {
        return (
            <Link to="/konto" style={{ textDecoration: 'none' }}>
                <div className="navIcon"><h5>Moje konto</h5></div>
            </Link>
        )
    }
}
