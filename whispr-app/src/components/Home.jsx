import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div>
            <Link to="/inscription"><button>Inscription</button></Link>
                <Link to="/connexion"><button>Connexion</button></Link>
            </div>

        </div>
    );
};

export default Home;