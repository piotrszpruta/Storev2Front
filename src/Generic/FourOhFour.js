import React from 'react'
import {Link} from "react-router-dom";

export default function FourOhFour(){
    return (
        <div className="center fourOhFour">
            <h3>Wygląda na to, iż próbowałeś wejść na stronę, która już nie istnieje lub wszedłeś tutaj przypadkowo.</h3>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h2>Wróć do strony głównej</h2>
            </Link>
        </div>
    )
}
