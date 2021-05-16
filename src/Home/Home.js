import React from "react";
import { motion } from "framer-motion";

// Js
import Banner from "./Parts/Banner"
import SecondPage from "./Parts/SecondPage"
import ThirdPage from "./Parts/ThirdPage"
import FourthPage from "./Parts/FourthPage"
import FifthPage from "./Parts/FifthPage"
import SixthPage from "./Parts/SixthPage"
import SeventhPage from "./Parts/SeventhPage"

const containerVariants = {
    init: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { delay: 0.5, duration: 1 }
    },
    exit: {
        x: "-100vw",
        transition: { ease: "easeInOut" }
    }
}

class MainMenu extends React.Component{
    render(){
        return (
            <motion.div
                variants={containerVariants}
                initial="init"
                animate="visible"
                exit="exit"
            >
                <Banner/>
                <SecondPage/>
                <ThirdPage/>
                <FourthPage/>
                <FifthPage/>
                <SixthPage/>
                <SeventhPage/>
            </motion.div>
        )
    }
}

export default MainMenu
