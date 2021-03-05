import axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import ProfileResume from './ProfileResume';
import SinglePost from './SinglePoste'


const Decouvrir = (props) => {

    const userId = useSelector(state => state.userStore.id)
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []); //Permet de forcer l'update
    const [feedState, setFeed] = useState([])
    const [usersState, setUser] = useState([])
    const [rechercheState, setRecherche] = useState("")



    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            if (feedState.length === 0) {
                axios.get(`http://localhost:8080/engagement`)
                .then(res => {
                    setFeed(res.data)
                })
            }
            if (usersState.length === 0) {
                axios.get('http://localhost:8080/random')
                .then(res => {
                    setUser(res.data)
                })
            }
            isMounted = false
        }
       console.log(feedState);
        
    })
    const handleSubmit = event => {
        event.preventDefault()
        axios.get(`http://localhost:8080/recherche/${rechercheState}`)
        .then(res => {
            console.log(res.data);
            setFeed(res.data)
            forceUpdate()

        })
    }
    const handleChange = event => {
        setRecherche(event.target.value)
    }
    const deletePost = (i) => {
        console.log(i)
        let newState = feedState
        newState.splice(i, 1)
        console.log(newState);
        setFeed(newState)
        console.log(feedState)
    }
    return (
        <div>
            {usersState.map(e => e.id !== userId && <ProfileResume displayUserData = {e} key={`user-${e.id}-${e.nom}`}/> )}
            
            <div className="feed">
            <form onSubmit={handleSubmit}>
                        <textarea placeholder="Rechercher un post..." name="recherche" onChange={handleChange} ></textarea>
                        <button className="full-btn">Rechercher</button>
            </form>
            {feedState.map((element, index) => {
                if (props.user) {
                    element.nom = props.user.nom
                    element.prenom = props.user.prenom

                }
                element.postIndex = index
               if ( element.user_id !== userId) { return <SinglePost key={`${element.nom}-${index}-${Math.random()}`} deleteThePost= {deletePost} dataFromParent= {element} />}
                return null
                                })}
            </div>
        </div>
    );
};

export default Decouvrir;