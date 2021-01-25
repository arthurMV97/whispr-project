import React, { Component } from 'react';
import { io } from 'socket.io-client';
let socket


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: ''
        }
    }
    handleChange = event => {
        const targetName = event.target.name
    this.setState({[targetName]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        const dataToEmit = this.state.data
        socket.emit('posteData', dataToEmit)
    }

    componentDidMount() {
        socket = io('localhost:8080')
        socket.on('message', (data) => {
            console.log(data)
            console.log('hi')
        })
    }
    render() {
        return (
            <div>
                <form>
                        <textarea placeholder="Racontez-nous quelque chose..." onChange={this.handleChange}></textarea>
                        <button className="full-btn">Publier</button>
                    </form>
            </div>
        );
    }
}

export default Dashboard;