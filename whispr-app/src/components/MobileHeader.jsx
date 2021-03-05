import React from 'react';
import logo from '../files/WHISPR.png'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";



const MobileHeader = () => {
    const dispatch = useDispatch()
    const isAdminLogged = useSelector(state => state.adminStore.isLogged )
    const isUserLogged = useSelector(state => state.userStore.isLogged)
    const userId = useSelector(state => state.userStore.id)

    const history = useHistory()

    const signOutFct = () => {
    console.log('déconnexion')
    dispatch({ type: 'USER_SIGNOUT' })
    dispatch({ type: 'ADMIN_SIGNOUT' })
    history.push('/')
}


    return (
        <div className="mobile-header">
            <header>
                <div id="logo">
                <Link to="/"><img alt="logo" src={logo}/></Link>
	            </div>
                {(isUserLogged || isAdminLogged) && <button className="sign-out" type="button" onClick={()=> signOutFct()}></button>}
                    
            
                
                
                
            </header>
           
        </div>
    );
};

export default MobileHeader;