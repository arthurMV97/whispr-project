import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const ProfileResume = (props) => {
    // const nbAbonnements = props.displayUserData['abonnements'].length
    // const nbAbonnes = props.displayUserData['abonnes'].length

    const [userData, setUserData] = useState(props.displayUserData)
    const followingData = useSelector(state => state.abonnementStore)


    if (props.displayUserData !== userData) {  //peut etre inutil ? A voir si fonctionne sans
        setUserData(props.displayUserData)
        console.log('Home', props.displayUserData);
    }


    return (
        <div className="profil-infos">
            <div className="user">
                <img src={userData.image} alt={"profile-user" + userData.id}/>
                <p>{userData.prenom + ' ' + userData.nom}</p>
            </div>
            <div className="user-infos">
                <p>{userData.description}</p>
                <p>Lieu: {userData.lieu}</p>
            </div>
            <div className="abonnement-infos">
                <p>Abonnements: {followingData.nbAbonnements}</p>
                <p>Abonnés: {followingData.nbAbonnes}</p>
            </div>
            

        </div>
    );
};

export default ProfileResume;