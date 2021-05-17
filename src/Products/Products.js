import React from "react";
import { motion } from "framer-motion";

// Animation
import { opacity } from "../Animation/Variables"

// My modules
import RenderProducts from "./RenderProducts"

export default function Products(data){
    return (
        <motion.div className="productsDiv"
                    variants={opacity}
                    initial="init"
                    animate="visible"
                    exit="exit"

        >
            <RenderProducts category={data.category}/>
        </motion.div>
    )
}
