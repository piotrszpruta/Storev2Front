import React from "react";
import { motion } from "framer-motion";

// Animation
import { opacity } from "../Animation/Variables"

export default function Item(){

        return (
            <motion.div
                variants={opacity}
                initial="init"
                animate="visible"
                exit="exit"
            >
                Item
            </motion.div>
        )

}
