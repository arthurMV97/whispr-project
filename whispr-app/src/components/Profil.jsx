import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MesPostes from "./MesPostes";
import MesFavoris from "./MesFavoris";
import PopUpAbonnements from "./PopUpAbonnements";
import ModifyProfile from "./ModifyProfile";
import UnfollowBtn from "./UnfollowBtn";
import FollowBtn from "./FollowBtn";

import { useSelector } from 'react-redux';


const Profil =  (props) => {
    const [boolState, setBool] = useState(true)
    const [postesState, setPostes] = useState([])
    const [favorisState, setFavoris] = useState([])
    const [displayUserData, setUserData] = useState({})
    const [popUpBool, setPopUpBool] = useState({display: false, abonnements: true})
    const [modifPopUpBool, setModifPopUpBool] = useState(false)



    const { id } = useParams()
    const history = useHistory();
    const userId = useSelector(state => state.userStore.id)
    const isAdmin = useSelector(state => state.adminStore.isLogged)
    const followingData = useSelector(state => state.abonnementStore)
    let userSuivi =  followingData.abonnements && (followingData.abonnements.find(  e =>  e === id) || false) //Problème rencontré: au render props => undefined donc on fait une condition
    
    useEffect(() => {
        if (id) {
            setBool(true)
            axios.get(`http://localhost:8080/profile/${id}`)
            .then(res => {
                let newData = res.data
                const splitted = {
                    abonnements: res.data.abonnements.split(','),
                    abonnes: res.data.abonnes.split(',')
                    }
                splitted.nbAbonnements =  splitted.abonnements.length
                splitted.nbAbonnes =  splitted.abonnes.length
                newData = {...newData, ...splitted}

                setUserData(newData)
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

    const changeComponent = (bool) =>{
        setBool(bool)
        
    }

    const updateUserData = (data) => {
        let myData = displayUserData
        console.log('1',myData);
        Object.assign(myData, data) // update multiple properties of object 
        console.log('2',myData);

        setUserData(myData)
        console.log('Profile', myData);
        props.updateUserData(myData)

        
    } 

    const deleteUser = (id) => {
        axios.delete(`http://localhost:8080/user/${id}`)
        .then(res => {
            console.log(res.data)
        })
        alert('Cet utilisateur ainsi que toutes ses interactions ont été supprimées')
        history.push("/")
    }

    const displayModif = (bool) => {
        setModifPopUpBool(bool)
    }

    const displayPopUp = (bool1, bool2) => {
        setPopUpBool({display: bool1, abonnements: bool2})
    }

    return (
        <div className="profil-page body-content">
            <div className="profil">
                <div className="user">
                    <img src={displayUserData.image} alt={"profile-user" + displayUserData.id}/>
                    <p>{displayUserData.prenom + ' ' + displayUserData.nom}</p>
                    {parseInt(id) === userId ? <button className="full-btn"onClick={() => displayModif(true)}>Modifier</button> : isAdmin ? <button className="full-btn" onClick={() => deleteUser(id)}>Supprimer</button> : 
                    !userSuivi ?<FollowBtn/> : <UnfollowBtn/> }

                </div>
            
            <p>{displayUserData.description}</p>
            <p>Lieu: {displayUserData.lieu}</p>
            <div className="abonnement-infos">
            <button onClick={() => displayPopUp(true, true)}>Abonnements: {id === userId ? followingData.nbAbonnements : displayUserData.nbAbonnements}</button>
            <button onClick={() => displayPopUp(true, false)}>Abonnés: {id === userId ? followingData.nbAbonnes : displayUserData.nbAbonnes}</button>
            </div>
            </div>
            {popUpBool.display && <PopUpAbonnements bool={popUpBool.abonnements} closePopUp={displayPopUp} /> }
            {modifPopUpBool && <ModifyProfile  modifyData={updateUserData} userData = {displayUserData} closeModif={displayModif} /> }

            <ul className="nav-list">
                    <li><button onClick={() => changeComponent(true)} className={boolState ? "clicked" : null}>Postes</button></li>
                    <li><button onClick={() => changeComponent(false)} className={!boolState ? "clicked" : null}>Favoris</button></li>
                </ul>
            <div className="profil-feed">
                {boolState ? <MesPostes postes = {postesState} user = {displayUserData} /> : <MesFavoris favoris = {favorisState}/>}
            </div>

            
        </div>
    );
};

export default Profil;