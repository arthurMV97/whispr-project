import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import SinglePost from './SinglePoste'



const AdminDashboard = () => {
    const adminLogged = useSelector(state => state.adminStore.isLogged)
    const [postesState, setPostes] = useState([])


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
                    return <SinglePost dataFromParent = {e} key={i}/>
                })
            }
        </div>
    );
};

export default AdminDashboard;