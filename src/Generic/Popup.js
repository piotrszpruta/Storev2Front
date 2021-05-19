import React from "react";
import {useSelector} from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

// Animation data
import {slideBottom} from "../Animation/Variables";

export default function Popup() {

    const popupStatus = useSelector(state => state.popup)

    return (
        <AnimatePresence exitBeforeEnter>
            {popupStatus ? <motion.div className="popup"
               variants={slideBottom}
               initial="init"
               animate="visible"
               exit="exit"
            >
                <h4 className="popupInner">
                    Dodano do koszyka
                </h4>
            </motion.div> : " "}
        </AnimatePresence>
    )
}


