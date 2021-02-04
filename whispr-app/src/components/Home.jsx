import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import Dashboard from './Dashboard'
import { useSelector } from 'react-redux';
// import { userData } from '../store/actions/user'

const Home = (props) => {
    const isLogged = useSelector(state => state.userStore.isLogged )
    useEffect(() => {

    }, [])
    return (
        <div>
            {isLogged ? <Dashboard displayUserData = {props.displayUserData} />:
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