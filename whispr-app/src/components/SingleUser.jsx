import React from 'react';
import {Link} from 'react-router-dom'


const SingleUser = ({autoClose, data}) => {

    return (
        
        <div className="container">                      
                <Link to={`/profil/${data.id}`} onClick={autoClose}><img src={data.image} alt={"profile-user" + data.user_id}/></Link>
                <Link to={`/profil/${data.id}`} onClick={autoClose}><p>{data.prenom + ' ' + data.nom}</p></Link>
        </div>
                    
    );
};

export default SingleUser;