import React, { useEffect, useState } from 'react';

const ProfileResume = (props) => {
    // const nbAbonnements = props.displayUserData['abonnements'].length
    // const nbAbonnes = props.displayUserData['abonnes'].length

    const [userData, setUserData] = useState(props.displayUserData)

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
                <p>Abonnements: {userData.nbAbonnements}</p>
                <p>Abonnés: {userData.nbAbonnes}</p>
            </div>
            

        </div>
    );
};

export default ProfileResume;