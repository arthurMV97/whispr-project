import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
import SinglePost from './SinglePoste'
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
            user_id: this.props.userId,
            date: new Date(),
        }
        console.log(dataToEmit)
        socket.emit('posteData', dataToEmit)
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/post/${this.props.userId}`, )
        .then(res => {
            this.setState({postes: res.data.reverse()})
            console.log(this.state.postes)
        })
        socket = io('localhost:8080')
        socket.on('message', (data) => {
            console.log(data)
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                        <textarea placeholder="Racontez-nous quelque chose..." name="posteToSend" onChange={this.handleChange}></textarea>
                        <button className="full-btn">Publier</button>
                    </form>
                <div className="feed">
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
      userId: state.userStore.id,
    };
  }


export default connect(mapStateToProps)(Dashboard);