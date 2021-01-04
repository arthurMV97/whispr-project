import React from 'react';
import logo from '../files/WHISPR.png'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";



const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const signOutFct = () => {
    console.log('déconnexion')
    dispatch({ type: 'USER_SIGNOUT' })
    history.push('/')
}


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
                <button type="button" onClick={()=> signOutFct()}>Déconnexion</button>
            </header>
           
        </div>
    );
};

export default Header;