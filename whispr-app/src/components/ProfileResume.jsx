import React, { useEffect } from 'react';

const ProfileResume = (props) => {
    useEffect(() => {
        console.log(props.displayUserData);
    }, [])
    return (
        <div>
            <img src={props.displayUserData.image} alt={"profile-user" + props.displayUserData.id}/>
            <p>{props.displayUserData.prenom + ' ' + props.displayUserData.nom}</p>
            <p>{props.displayUserData.description}</p>
            <p>Lieu: {props.displayUserData.lieu}</p>
            <p>Abonnements: {props.displayUserData.abonnements}</p>
            <p>Abonnés: {props.displayUserData.abonnes}</p>

        </div>
    );
};

export default ProfileResume;