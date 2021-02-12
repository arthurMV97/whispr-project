import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MesPostes from "./MesPostes";
import MesFavoris from "./MesFavoris";
import PopUpAbonnements from "./PopUpAbonnements";

import { useSelector } from 'react-redux';


const Profil = (props) => {
    const [boolState, setBool] = useState(true)
    const [postesState, setPostes] = useState([])
    const [favorisState, setFavoris] = useState([])
    const [displayUserData, setUserData] = useState({})
    const [popUpBool, setPopUpBool] = useState({display: false, abonnements: true})

    const { id } = useParams()
    const userId = useSelector(state => state.userStore.id)



    useEffect(() => {
        if (id) {
            setBool(true)
            axios.get(`http://localhost:8080/profile/${id}`)
            .then(res => {
                console.log("user data", res.data)
                setUserData(res.data)
      })

            axios.get(`http://localhost:8080/post/${id}`)
            .then(res => {
                setPostes(res.data.reverse())
            })

            axios.get(`http://localhost:8080/favoris/${id}`)
        .then(response => {
            setFavoris(response.data.reverse())
        })
        }
        
    }, [id])

    function changeComponent(bool) {
        setBool(bool)
        
    }

    const displayPopUp = (bool1, bool2) => {
        setPopUpBool({display: bool1, abonnements: bool2})
        console.log(popUpBool);
    }
    return (
        <div className="profil-page">
            <div className="profil">
                <div className="user">
                    <img src={displayUserData.image} alt={"profile-user" + displayUserData.id}/>
                    <p>{displayUserData.prenom + ' ' + displayUserData.nom}</p>
                    {parseInt(id) === userId ? <button className="full-btn">Modifier</button> : null}

                </div>
            
            <p>{displayUserData.description}</p>
            <p>Lieu: {displayUserData.lieu}</p>
            <div className="abonnement-infos"></div>
            <button onClick={() => displayPopUp(true, true)}>Abonnements: {displayUserData.abonnements}</button>
            <button onClick={() => displayPopUp(true, false)}>Abonnés: {displayUserData.abonnes}</button>
            </div>
            {popUpBool.display && <PopUpAbonnements bool={popUpBool.abonnements} closePopUp={displayPopUp} /> }

            <ul className="nav-list">
                    <li><button onClick={() => changeComponent(true)} className={boolState ? "clicked" : null}>Mes Postes</button></li>
                    <li><button onClick={() => changeComponent(false)} className={boolState ? "clicked" : null}>Mes Favoris</button></li>
                </ul>
            <div className="profil-feed">
                {boolState ? <MesPostes postes = {postesState} /> : <MesFavoris favoris = {favorisState}/>}
            </div>

            
        </div>
    );
};

export default Profil;