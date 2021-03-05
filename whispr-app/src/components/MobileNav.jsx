import React from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';



const MobileNav = () => {
    const isUserLogged = useSelector(state => state.userStore.isLogged)
    const userId = useSelector(state => state.userStore.id)
    const userImage = useSelector(state => state.userStore.image)



    return (
        <div className="mobile-nav">
            
                
                {isUserLogged && <nav>  
		                <Link to="/"><div className="home-icon"/></Link>
		                <Link to="/decouvrir"><div className="search-icon"/></Link>
		                <Link to={`/profil/${userId}`}><img src={userImage} alt={`profile-${userId}`} className="profile-image"/></Link>
                </nav>}
                
           
           
        </div>
    );
};

export default MobileNav;