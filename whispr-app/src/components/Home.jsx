import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Dashboard from './Dashboard'
import { useSelector } from 'react-redux';

const Home = (props) => {
    const isLogged = useSelector(state => state.userStore.isLogged )


    const [userData, setUserData] = useState(props.displayUserData)

    if (props.displayUserData !== userData) { 
        setUserData(props.displayUserData)
        console.log('Home', props.displayUserData);
    }
    
    return (
        <div className="body-content">
            {isLogged ? <Dashboard displayUserData = {userData} />:
            <div>
                <h1>Bienvenue sur Whispr !</h1>
                <div className="connexions">
                    <Link to="/inscription"><button className="full-btn">Inscription</button></Link>
                    <Link to="/connexion"><button className="empty-btn">Connexion</button></Link>
                </div>
            </div>
            }
        </div>
    );
};





export default Home;