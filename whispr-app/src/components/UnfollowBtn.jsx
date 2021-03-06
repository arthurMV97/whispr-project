import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



const UnfollowBtn = () => {
    const userId = useSelector(state => state.userStore.id)
    const userToken = useSelector(state => state.userStore.token)
    const { id } = useParams()
    const dispatch = useDispatch()

    const unfollowingUser = () => {
        const numId = id
        axios.delete(`http://localhost:8080/suivre/${numId}/${userId}`, {
            headers: {
                'Authorization': userToken
            }
        }).then(res => {
            console.log(res.data);
            dispatch({type: 'UNFOLLOW', id: numId})

        })
    }
    return (
        <div>
            <button className="empty-btn" onClick={unfollowingUser}>Suivi</button>
        </div>
    );
};

export default UnfollowBtn;