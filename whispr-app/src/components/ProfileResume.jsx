import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserView } from "react-device-detect";
import {Link} from 'react-router-dom'



const ProfileResume = (props) => {
    // const nbAbonnements = props.displayUserData['abonnements'].length
    // const nbAbonnes = props.displayUserData['abonnes'].length

    const [userData, setUserData] = useState(props.displayUserData)
    const followingData = useSelector(state => state.abonnementStore)
    const userId = useSelector(state => state.userStore.id)


    if (props.displayUserData !== userData) {  //peut etre inutil ? A voir si fonctionne sans
        setUserData(props.displayUserData)
        console.log('Home', props.displayUserData);
    }


    return (
        <BrowserView>
        <div className="profil-infos">
            <div className="user">
                <Link to={`/profil/${userData.id}`}><img src={userData.image} alt={"profile-user" + userData.id}/></Link>
                <Link to={`/profil/${userData.id}`}><p>{userData.prenom + ' ' + userData.nom}</p></Link>
            </div>
            <div className="user-infos">
                <p>{userData.description}</p>
                <p>Lieu: {userData.lieu}</p>
            </div>
            {userData.id === userId && 
            <div className="abonnement-infos">
            <p>Abonnements: {followingData.nbAbonnements}</p>
            <p>Abonnés: {followingData.nbAbonnes}</p>
            </div>
            }
            
            

        </div>
        </BrowserView>
    );
};

export default ProfileResume;