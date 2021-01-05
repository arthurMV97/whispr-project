import React from 'react';
import logo from '../files/WHISPR.png'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";



const Header = () => {
    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.userStore.isLogged)
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
                {isLogged && <div>
                    <nav>
                    <ul>
		                <li><Link to="/">Accueil</Link></li>
		                <li><Link to="/decouvrir">Découvrir</Link></li>
		                <li><Link to="/profil">Profil</Link></li>
                    </ul>
                </nav>
                <button type="button" onClick={()=> signOutFct()}>Déconnexion</button>
                    </div>}
                
            </header>
           
        </div>
    );
};

export default Header;