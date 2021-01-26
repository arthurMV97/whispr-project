import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
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
        const dataToEmit = this.state.posteToSend
        socket.emit('posteData', dataToEmit)
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/post/${this.props.userId}`, )
        .then(res => {
            this.setState({postes: res.data})
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
                <form>
                        <textarea placeholder="Racontez-nous quelque chose..." name="posteToSend" onChange={this.handleChange}></textarea>
                        <button className="full-btn">Publier</button>
                    </form>
                <div className="feed">
                    {
                        this.state.postes.map((element, index) => {
                           return (
                           <div className="poste" key={index}>Element numéro {index}</div>
                           )
                        })
                    }
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) { 
    return {
      userId: state.userStore.id
    };
  }

export default connect(mapStateToProps)(Dashboard);