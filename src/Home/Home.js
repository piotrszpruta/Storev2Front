import React from "react";

// Css
import "../Css/Home.css"

// Js
import Banner from "./Parts/Banner"
import SecondPage from "./Parts/SecondPage"
import ThirdPage from "./Parts/ThirdPage"
import FourthPage from "./Parts/FourthPage"
import FifthPage from "./Parts/FifthPage"
import SixthPage from "./Parts/SixthPage"
import SeventhPage from "./Parts/SeventhPage"

class MainMenu extends React.Component{
    render(){
        return (
            <div>
                <Banner/>
                <SecondPage/>
                <ThirdPage/>
                <FourthPage/>
                <FifthPage/>
                <SixthPage/>
                <SeventhPage/>
            </div>
        )
    }
}

export default MainMenu
