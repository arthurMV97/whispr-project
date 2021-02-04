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
        <div className="profil-page">
            <div className="profil">
                <div className="user">
                    <img src={props.displayUserData.image} alt={"profile-user" + props.displayUserData.id}/>
                    <p>{props.displayUserData.prenom + ' ' + props.displayUserData.nom}</p>
                    <button className="full-btn">Modifier</button>

                </div>
            
            <p>{props.displayUserData.description}</p>
            <p>Lieu: {props.displayUserData.lieu}</p>
            <div className="abonnement-infos"></div>
            <p>Abonnements: {props.displayUserData.abonnements}</p>
            <p>Abonnés: {props.displayUserData.abonnes}</p>
            </div>
            <ul className="nav-list">
                    <li><button onClick={() => changeComponent(true)} className={boolState ? "clicked" : null }>Mes Postes</button></li>
                    <li><button onClick={() => changeComponent(false)} className={!boolState ? "clicked" : null }>Mes Favoris</button></li>
                </ul>
            <div className="profil-feed">
                
                {boolState ? <MesPostes postes = {postesState} /> : <MesFavoris favoris = {favorisState}/>}
            </div>
        </div>
    );
};

export default Profil;