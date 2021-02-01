import React, {useState} from 'react';
import MesPostes from "./MesPostes";
import MesFavoris from "./MesFavoris";

const Profil = (props) => {
    const [boolState, setBool] = useState(true)
    function changeComponent(bool) {
        setBool(bool)
    }
    return (
        <div>
            <div className="profile">
            <img src={props.displayUserData.image} alt={"profile-user" + props.displayUserData.id}/>
            <p>{props.displayUserData.prenom + ' ' + props.displayUserData.nom}</p>
            <button className="full-btn">Modifier</button>
            <p>{props.displayUserData.description}</p>
            <p>Lieu: {props.displayUserData.lieu}</p>
            <p>Abonnements: {props.displayUserData.abonnements}</p>
            <p>Abonnés: {props.displayUserData.abonnes}</p>
            </div>
            <div className="profile-feed">
                <ul>
                    <li><button onClick={() => changeComponent(true)}>Mes Postes</button></li>
                    <li><button onClick={() => changeComponent(false)}>Mes Favoris</button></li>
                </ul>
                {boolState ? <MesPostes /> : <MesFavoris />}
            </div>
        </div>
    );
};

export default Profil;