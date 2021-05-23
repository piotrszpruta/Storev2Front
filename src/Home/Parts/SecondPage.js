import React from "react";
import {Link} from 'react-router-dom';

export default function SecondPage(){
    return (
        <div className="partialBanner secondBanner">

            <Link to="/owoce" style={{ textDecoration: 'none' }}>
                <div className="image" style={{backgroundImage: 'url(/Img/owoce.jpg)'}}>
                    <h1>Owoce</h1>
                </div>
            </Link>

            <Link to="/warzywa" style={{ textDecoration: 'none' }}>
                <div className="image" style={{backgroundImage: 'url(/Img/warzywa.jpg)'}}>
                    <h1>Warzywa</h1>
                </div>
            </Link>

            <Link to="/slodycze" style={{ textDecoration: 'none' }}>
                <div className="image" style={{backgroundImage: 'url(Img/slodycze.jpg)'}}>
                    <h1>Słodycze</h1>
                </div>
            </Link>

            <Link to="/chemia" style={{ textDecoration: 'none' }}>
                <div className="image" style={{backgroundImage: 'url(/Img/chemia.jpg)'}}>
                    <h1>Chemia</h1>
                </div>
            </Link>

        </div>
    )
}
