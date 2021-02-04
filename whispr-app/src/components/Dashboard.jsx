import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
import SinglePost from './SinglePoste'
import ProfileResume from './ProfileResume'
let socket


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            posteToSend: '',
            postes: []
        }
    }
    handleChange = event => {
        const targetName = event.target.name
    this.setState({[targetName]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        const dataToEmit = {
            content: this.state.posteToSend,
            user_id: this.props.userData.id,
            nom: this.props.userData.nom,
            prenom: this.props.userData.prenom,
            image: this.props.userData.image
        }
        console.log(dataToEmit)
        socket.emit('posteData', dataToEmit)
        
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/feed/${this.props.userData.id}` )
        .then(res => {
            let postes = res.data.sort((a, b) => { //trier par id et donc creation
                return b.id - a.id
            })
            this.setState({postes: postes})
        })
        socket = io('localhost:8080')
        
        socket.on("connect", () => {

            socket.on('message-console', (data) => {
                console.log(data)
            })
            console.log(socket.id);
            
            const idUser = {  
                socket: socket.id,
                user: this.props.userData.id
            }
            socket.emit('socket-id', idUser ) //Envoyer l'id user et l'id socket correspondant
          });

          socket.on('new-post', (data) => {
              let newState = [data].concat(this.state.postes)
                this.setState({postes: newState})
                console.log(this.state.postes)
          })
          
      
    }

    
    render() {
        return (
            <div className="accueil">
                
                    <ProfileResume displayUserData = {this.props.displayUserData} />
            
                <div className="feed">
                <form onSubmit={this.handleSubmit}>
                        <textarea placeholder="Racontez-nous quelque chose..." name="posteToSend" onChange={this.handleChange}></textarea>
                        <button className="full-btn">Publier</button>
                    </form>
                
                    {
                        this.state.postes.map((element, index) => {
                           return <SinglePost dataFromParent = {element} key={index}/>
                           
                        })
                    }
                    
                
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) { 
    return {
      userData: state.userStore
    };
  }


export default connect(mapStateToProps)(Dashboard);