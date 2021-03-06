import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const FollowBtn = (props) => {

    const userToken = useSelector(state => state.userStore.token)
    const userId = useSelector(state => state.userStore.id)
    const { id } = useParams()
    const dispatch = useDispatch()

    const followingUser = () => {
        const numId = id
        axios.post(`http://localhost:8080/suivre/${numId}`, {user_id: userId}, { //peut etre au mm niveau que user_id ?
            headers: {
                'Authorization': userToken
            }
        }).then(res => {
            console.log(res.data)
            dispatch({type: 'FOLLOW', id: numId})
            

        })
    }
    return (
        <div>
            <button className="full-btn" onClick={followingUser}>Suivre</button>
        </div>
    );
};

export default FollowBtn;