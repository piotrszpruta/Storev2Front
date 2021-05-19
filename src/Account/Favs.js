import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { motion } from "framer-motion";

// Redux data
import {removeFav} from "../Redux/actions/index"

// Animation
import { opacity } from "../Animation/Variables"
import {Link} from "react-router-dom";

export default function Favs(){
    const dispatch = useDispatch()

    const favsStatus = useSelector(state => state.favs)
    const isEmpty = Object.keys(favsStatus).length > 0

    const items = () => {
        return favsStatus.map(item => {
            return (
                <div className="productDiv" key={item.id} id={item.id}>
                    <img src={item.img} alt="img"/>
                    <h2>{item.name}</h2>
                    <h2>{item.size}</h2>
                    <h2 className={item.price}>Cena: {item.price} zł</h2>
                    <button onClick={(e) => dispatch(removeFav(e.target.parentElement.id))}>Usuń z ulubionych</button>
                </div>
            )
        })
    }

    return(
        <motion.div className="basketMenuOutter"
                    variants={opacity}
                    initial="init"
                    animate="visible"
                    exit="exit"
        >
            {isEmpty ? items() :
            <motion.div className="contactNoLogged"
              variants={opacity}
              initial="init"
              animate="visible"
              exit="exit"
            >
                <span>
                    <h3>Wygląda na to, iż nie posiadasz żadnych polubionych produktów. By sprawdzić stan polubionych, dodaj produkty</h3>
                </span>
            </motion.div>}
        </motion.div>
    )

}
