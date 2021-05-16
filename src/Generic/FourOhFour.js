import React from 'react'
import {Link} from "react-router-dom";
import { motion } from "framer-motion";

// Animation
import { opacity } from "../Animation/Variables"

export default function FourOhFour(){
    return (
        <motion.div className="center fourOhFour"
            variants={opacity}
            initial="init"
            animate="visible"
            exit="exit"
        >
            <h3>Wygląda na to, iż próbowałeś wejść na stronę, która już nie istnieje lub wszedłeś tutaj przypadkowo.</h3>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h2>Wróć do strony głównej</h2>
            </Link>
        </motion.div>
    )
}
