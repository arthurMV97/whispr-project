import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import SinglePost from './SinglePoste'



const AdminDashboard = () => {
    const adminLogged = useSelector(state => state.adminStore.isLogged)
    const [postesState, setPostes] = useState([])

    const deletePost = (i) => {
        console.log(postesState)
        let newState = postesState
        newState.splice(i, 1)
        setPostes(newState)
        console.log(postesState)

    }

    useEffect(() => {
        if (adminLogged) {
            axios.get(`http://localhost:8080/post`)
            .then(res => {
                setPostes(res.data)

            })
        }

    }, [adminLogged])

    return (
        <div>
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