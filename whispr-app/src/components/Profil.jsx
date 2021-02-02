import React, {useState, useEffect} from 'react';
import axios from 'axios';

import MesPostes from "./MesPostes";
import MesFavoris from "./MesFavoris";

const Profil = (props) => {
    const [boolState, setBool] = useState(true)
    const [postesState, setPostes] = useState([])
    const [favorisState, setFavoris] = useState([])

    useEffect(() => {
        if (props.displayUserData.id) {
            axios.get(`http://localhost:8080/post/${props.displayUserData.id}`)
            .then(res => {
                setPostes(res.data.reverse())
            })

            axios.get(`http://localhost:8080/favoris/${props.displayUserData.id}`)
        .then(response => {
            setFavoris(response.data.reverse())
        })
        }
        
    }, [props.displayUserData.id])

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
                {boolState ? <MesPostes postes = {postesState} /> : <MesFavoris favoris = {favorisState}/>}
            </div>
        </div>
    );
};

export default Profil;