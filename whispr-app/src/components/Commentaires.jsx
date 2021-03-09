import axios from 'axios';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
let socket = io('localhost:8080')

const Commentaires = (props) => {

    const userId = useSelector(state => state.userStore.id)
    const userToken = useSelector(state => state.userStore.token)
    const userImage = useSelector(state => state.userStore.image)
    const userPrenom = useSelector(state => state.userStore.prenom)
    const userNom = useSelector(state => state.userStore.nom)

    const messagesEndRef = useRef(null)

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []); //Permet de forcer l'update
    const [inputValue, setInputValue] = useState('')
    const [isMounted, setIsMounted] = useState(false)
    const [commentsArray, setCommentsArray] = useState([])

    useEffect(() => {
        if (!isMounted) {
            axios.get(`http://localhost:8080/comments/${props.data.id}`, {
                headers: {
                    'Authorization': userToken
                }
            })
            .then(res => {
                setCommentsArray(res.data)
                setIsMounted(true)
            })
        }
        

        let bool = Object.keys(props.newComment).length > 0;
        if (bool) {
            let rdm = Math.random()
            let newComment = props.newComment
            newComment.id = `${commentsArray.length}-${rdm}`
            let newArray = commentsArray
            newArray.push(props.newComment)
            console.log(newArray);
            setCommentsArray(newArray)
            forceUpdate()
        }
        scrollToBottom()

    },[props.data.id, props.newComment]) 

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth"})
      }

    const handleChange = event => {
        setInputValue(event.target.value)
    }
    const addComment = event => {
        event.preventDefault();
        const dataToEmit = {
            content: inputValue,
            post_id: props.data.id,
            prenom: userPrenom,
            nom: userNom,
            user_id: userId,
            image: userImage,
            room: `room-${props.data.prenom}-${props.data.id}`
        }
        console.log(dataToEmit);
        socket.emit('new-comment', dataToEmit)
        setInputValue('')
    }

    
    return (
        <div className="comment-box">
            <div className="header">
                <h3>Espace commentaires</h3>
                <button className="empty-btn" onClick={props.closeCommentPopUp}>x</button>
            </div>
            <p className="post-content">{props.data.content} <br/> <font color="#E8CD5E">- {props.data.prenom} {props.data.nom} -</font></p>

            <div className="feed-box">
             {commentsArray.map(comment => {
                 return (
                    <div key={`comment-${comment.user_id}-${comment.id}`} className={comment.user_id === userId ? "response my-response" : comment.user_id === props.data.user_id ? "response creator-response" : "response"}>
                    <Link to={`/profil/${comment.user_id}`}><img src={comment.image} alt={"profile-user" + comment.user_id}/></Link>
                    <p>{comment.content}</p>
                    </div>
                 )
             })}
             <div className="anchor" ref={messagesEndRef}></div>
            </div>
            
            <div className="add-comment">
                <form onSubmit={addComment} className="comment-form">
                <input type="text" onChange={handleChange} value={inputValue}></input>
                <button className="full-btn">ADD</button>
                </form>
            </div>

        </div>
    );
};

export default Commentaires;