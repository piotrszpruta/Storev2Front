import React from "react";
import {Link} from 'react-router-dom';

export default function SeventhPage(){
    return (
        <div className="partialBanner seventhBanner">

                <span>
                    <h1>Zainteresowany?</h1>
                    <h3 style={{display: "inline-block"}}>Skontaktuj się z nami</h3>
                </span>

                <Link to="/kontakt" style={{ textDecoration: 'none' }}>
                    <h1>Kontakt</h1>
                </Link>

        </div>
    )
}
