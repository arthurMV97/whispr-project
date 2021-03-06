import axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import SinglePost from './SinglePoste'



const AdminDashboard = () => {
    const adminLogged = useSelector(state => state.adminStore.isLogged)
    const adminToken = useSelector(state => state.adminStore.token)

    const [postesState, setPostes] = useState([])
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []); //Permet de forcer l'update

    const deletePost = (i) => {
        console.log(postesState)
        let newState = postesState
        newState.splice(i, 1)
        setPostes(newState)
        forceUpdate()
        console.log(postesState)

    }

    useEffect(() => {
        if (adminLogged) {
            axios.get(`http://localhost:8080/post-admin`, {
                headers: {
                    'Authorization': adminToken
                }
            })
            .then(res => {
                setPostes(res.data)

            })
        }

    }, [adminLogged])

    return (
        <div className="body-content">
            <h1>Admin Dashboard</h1>
            {
                postesState.map((e, i) => {
                    e.index = i
                    return <SinglePost deleteThePost={deletePost} dataFromParent = {e} key={`${e.nom}-${i}-${Math.random()}`}/>
                })
            }
        </div>
    );
};

export default AdminDashboard;