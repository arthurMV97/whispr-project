import React from 'react';
import logo from '../files/WHISPR.png'
// import Home from "./Home.jsx"
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <header>
                <div id="logo">
	                <img alt="logo" src={logo}/>
	            </div>
                <nav>
                    <ul>
		                <li><Link to="/">Accueil</Link></li>
		                <li><Link to="/decouvrir">Découvrir</Link></li>
		                <li><Link to="/profil">Profil</Link></li>
                    </ul>
                </nav>
                <button>Déconnexion</button>
            </header>
            {/* <Home /> */}
        </div>
    );
};

export default Header;