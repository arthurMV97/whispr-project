import React, { Component } from 'react';
import Commentaires from './Commentaires';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { likePost } from '../store/actions/favoris'
import { unlikePost } from '../store/actions/favoris'
import dayjs from 'dayjs'
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
            newComment: {},
            totalComment: null,
            totalLikes: null,


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
        this.setState({data: this.props.dataFromParent, totalComment: this.props.dataFromParent.TotalComment, totalLikes: this.props.dataFromParent.TotalFavoris })

        if (this.props.favorisIds.includes(this.state.data.id)) {
            this.setState({isLiked: true})
        }
       
        socket.emit('rooming', data )

        socket.on('liked-post', (data) => {
            if (this.state.data.id === data.postId) {
                const totalPlusOne = this.state.totalLikes + 1
                this.setState({totalLikes: totalPlusOne})
                this.props.likePost(data.postId)


            }

        })
        socket.on('unliked-post', (data) => {
            if (this.state.data.id === data.postId) {
                const totalPlusOne = this.state.totalLikes - 1
            this.setState({totalLikes: totalPlusOne})
            this.props.unlikePost(data.postId)
            }

            

        }) 
        socket.on('add-new-comment', data => {
            this.setState({newComment: data})
            if (this.state.data.id === data.post_id) {
                const totalPlusOne = this.state.totalComment + 1
            this.setState({totalComment: totalPlusOne})
            }
        })

        

    }
    // return () => {
    //     socket.emit('leave-room', data)
    // }
        
    }

    componentWillUnmount() {
        const data = {
            id: this.props.dataFromParent.id,
            user: this.props.dataFromParent.prenom
        }
    
        socket.off('add-new-comment')
        socket.off('unliked-post')
        socket.off('liked-post')
        socket.emit('leave-room', data)

        this._isMounted = false

    }

    

    deletePost = () => {
        console.log(this.state.data);
        let index = this.state.data.postIndex
        
            this.props.deleteThePost(index)
        axios.delete(`http://localhost:8080/post/${this.state.data.id}`, {
            headers: {
                'Authorization': this.props.userToken
            }
        })
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
        this.setState({isLiked: true})
        socket.emit('like-post', data)
    }

    unlikePost = () => {
        const data = {
            postId: this.state.data.id,
            postUser: this.state.data.prenom,
            userId: this.props.userId
        }
        this.setState({isLiked: false})
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
                    <p className="text-content">{this.state.data.content}</p>
                    <p className="date">posté le {dayjs(this.state.data.date).format("DD/MM/YY")}</p>
                    </div>
                </div>
                    <div className="interactions">
                                   
                                    <div className="img-bloc">
                                        {this.state.isLiked ? <button className="btn-fav-done" onClick={this.unlikePost}></button> : <button className="btn-fav" onClick={this.likePost}></button>}
                                        <p>{this.state.totalLikes}</p>
                                    </div>
                                   
                                    <div className="img-bloc">
                                        <button className="btn-com" onClick={this.openCommentPopUp}></button>
                                        <p>{this.state.totalComment}</p>
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
      userToken: state.userStore.token,
      isAdmin: state.adminStore.isLogged,
      favorisIds: state.favorisStore.favorisIds
    };
  }

  const mapDispatchToProps = { 
    likePost, unlikePost                
  }

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(SinglePoste);