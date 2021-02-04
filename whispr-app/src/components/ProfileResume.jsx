import React, { useEffect } from 'react';

const ProfileResume = (props) => {
    useEffect(() => {
        console.log(props.displayUserData);
    }, [])
    return (
        <div className="profil-infos">
            <div className="user">
                <img src={props.displayUserData.image} alt={"profile-user" + props.displayUserData.id}/>
                <p>{props.displayUserData.prenom + ' ' + props.displayUserData.nom}</p>
            </div>
            <div className="user-infos">
                <p>{props.displayUserData.description}</p>
                <p>Lieu: {props.displayUserData.lieu}</p>
            </div>
            <div className="abonnement-infos">
                <p>Abonnements: {props.displayUserData.abonnements}</p>
                <p>Abonnés: {props.displayUserData.abonnes}</p>
            </div>
            

        </div>
    );
};

export default ProfileResume;