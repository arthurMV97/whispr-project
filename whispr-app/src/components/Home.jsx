import React from 'react';
import {Link} from 'react-router-dom'
import Dashboard from './Dashboard'
import Admin from './Admin'
import { useSelector } from 'react-redux';
// import { userData } from '../store/actions/user'

const Home = () => {
    const isLogged = useSelector(state => state.userStore.isLogged )
    const isAdmin = useSelector(state => state.userStore.isAdmin )
    return (
        <div>
            {isLogged && !isAdmin ? <Dashboard />: isLogged && isAdmin ? <Admin /> :
            <div>
            <Link to="/inscription"><button>Inscription</button></Link>
                <Link to="/connexion"><button>Connexion</button></Link>
            </div>
            }
        </div>
    );
};





export default Home;