import React, { Component } from 'react';
import Commentaires from './Commentaires';

import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
let socket = io('localhost:8080')




class SinglePoste extends Component {
    _isMounted = false
    constructor() {
        super();
        this.state = {
            data: {},
            isLiked: false,
            commentPopUp: false,
            newComment: {}

        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.dataFromParent) {
            return {
                data: nextProps.dataFromParent
            }
        }
        return null
    }

    componentDidMount() { //emp^che les données d'arriver au render donc props au render et state aux fcts
    this._isMounted = true
    const data = {
        id: this.props.dataFromParent.id,
        user: this.props.dataFromParent.prenom
    }

    if (this._isMounted) {
        this.setState({data: this.props.dataFromParent})
        // axios.get()
        
        socket.emit('rooming', data )

        socket.on('liked-post', (data) => {
            console.log('data back', data);
            if (this.state.data.id === data.postId) {
                this.setState({isLiked: true})
            }
        })
        socket.on('unliked-post', (data) => {
            console.log('data back', data);
            if (this.state.data.id === data.postId) {
                this.setState({isLiked: false})
            }
        }) 
        socket.on('add-new-comment', data => {
            // console.log(data, );
            this.setState({newComment: data})
        })

        

    }
    return () => {
        socket.emit('leave-room', data)
    }
        
    }

    componentWillUnmount() {
        this._isMounted = false

    }

    

    deletePost = () => {
        console.log(this.state.data);
        let index = this.state.data.postIndex
        
            this.props.deleteThePost(index)
        axios.delete(`http://localhost:8080/post/${this.state.data.id}`)
        .then(res => {
            console.log(res.data);
            
           
        })

    }

    likePost = () => {
        const data = {
            postId: this.state.data.id,
            postUser: this.state.data.prenom,
            userId: this.props.userId
        }
        
        socket.emit('like-post', data)
    }

    unlikePost = () => {
        const data = {
            postId: this.state.data.id,
            postUser: this.state.data.prenom,
            userId: this.props.userId
        }
        socket.emit('unlike-post', data)
    }

    openCommentPopUp = () => {
        this.setState({commentPopUp: true})
    }

    closeCommentPopUp = () => {
        this.setState({commentPopUp: false})
    }

    render() {
        return (
            <div>

                {this.state.commentPopUp &&   <Commentaires data = {this.state.data} newComment = {this.state.newComment} closeCommentPopUp = {this.closeCommentPopUp}/> }
                <div className="poste" >

                
                <div>
                    <div className="user">                       
                            <Link to={`/profil/${this.state.data.user_id}`}><img src={this.state.data.image} alt={"profile-user" + this.state.data.user_id}/></Link>
                            <Link to={`/profil/${this.state.data.user_id}`}><p>{this.state.data.prenom + ' ' + this.state.data.nom}</p></Link>
                    </div>
                    
                    <div className="content">
                    <p>{this.state.data.content}</p>
                    <p>{this.state.data.date}</p>
                    </div>
                </div>
                    <div className="interactions">
                                   
                                    <div className="img-bloc">
                                        {this.state.isLiked ? <button className="btn-fav-done" onClick={this.unlikePost}></button> : <button className="btn-fav" onClick={this.likePost}></button>}
                                        <p>{this.state.data.TotalFavoris}</p>
                                    </div>
                                   
                                    <div className="img-bloc">
                                        <button className="btn-com" onClick={this.openCommentPopUp}></button>
                                        <p>{this.state.data.TotalComment}</p>
                                    </div>

                                   <div className="img-bloc">
                                   { this.props.userId === this.state.data.user_id || this.props.isAdmin ? <button onClick={this.deletePost} className="btn-delete"></button> : null}
                                   </div>
                    </div>        
                </div>

            </div>
        );
    }
}


function mapStateToProps(state) { //Accéder aux données de notre store dans les props
    return {
      userId: state.userStore.id,
      isAdmin: state.adminStore.isLogged
      // products: state.products.products
    };
  }

  export default connect(
    mapStateToProps
  )(SinglePoste);