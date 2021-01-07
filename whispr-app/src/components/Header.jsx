import React from 'react';
import logo from '../files/WHISPR.png'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";



const Header = () => {
    const dispatch = useDispatch()
    const isAdminLogged = useSelector(state => state.adminStore.isLogged )
    const isUserLogged = useSelector(state => state.userStore.isLogged)
    const history = useHistory()

    const signOutFct = () => {
    console.log('déconnexion')
    dispatch({ type: 'USER_SIGNOUT' })
    dispatch({ type: 'ADMIN_SIGNOUT' })
    history.push('/')
}


    return (
        <div>
            <header>
                <div id="logo">
	                <img alt="logo" src={logo}/>
	            </div>
                {(isUserLogged || isAdminLogged) && <nav>
                    
                   {isUserLogged && <ul>
		                <li><Link to="/">Accueil</Link></li>
		                <li><Link to="/decouvrir">Découvrir</Link></li>
		                <li><Link to="/profil">Profil</Link></li>
                    </ul>}
                <button className="empty-btn" type="button" onClick={()=> signOutFct()}>Déconnexion</button>
                </nav>}
                
            </header>
           
        </div>
    );
};

export default Header;