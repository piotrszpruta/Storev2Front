import React from "react";
import { motion } from "framer-motion";

// Animation
import { opacity, slideRight } from "../Animation/Variables"

// My modules
import RenderProducts from "./RenderProducts"

export default function Products(data){
    return (
        <>
            <motion.h2 className="categoryLogo"
                       variants={slideRight}
                       initial="init"
                       animate="visible"
                       exit="exit"
            >
                {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
            </motion.h2>
            <motion.div className="productsDiv"
                        variants={opacity}
                        initial="init"
                        animate="visible"
                        exit="exit"
            >
                <RenderProducts category={data.category}/>
            </motion.div>
        </>
    )
}
