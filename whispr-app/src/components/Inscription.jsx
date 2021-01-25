import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'



class Inscription extends Component {
    constructor() {
        super();
        this.state = {
            nom: '',
            prenom: '',
            date:'',
            email: '',
            password: '',
            confirm: ''
        }
    }
    handleChange = event => {
        const targetName = event.target.name
        this.setState({[targetName]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.confirm === this.state.password) {
            const user = this.state
            delete user.confirm

            axios.post('http://localhost:8080/sign-up', user)
                .then(res => {
                    console.log(res.data)
                })
        } else {
            console.log("Mot de passe incorrect")
        }

    }

    render() {
        return (
            <div>
             <h1>Inscription</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                <label >Nom: </label>
                <input type="text" name="nom" id="nom" onChange={this.handleChange} required />
                <label >Prénom: </label>
                <input type="text" name="prenom" id="prenom" onChange={this.handleChange} required />
                </div>
                <div>
                <label >Date de naissance: </label>
                <input type="date" name="date" id="date" onChange={this.handleChange} required />
                </div>
                <div>
                <label >Email: </label>
                <input type="email" name="email" id="email" onChange={this.handleChange} required />
                </div>
                <div>
                <label >Mot de passe: </label>
                <input type="password" name="password" id="password" onChange={this.handleChange} required />
                </div>
                <div>
                <label >Confirmez votre mot de passe: </label>
                <input type="password" name="confirm" id="confirm" onChange={this.handleChange} required />
                </div>
                <button type="submit">Inscription</button>
            </form>
            <div>
                <p>Vous êtes déjà inscris ? <Link  to="/connexion">Connectez-vous ici.</Link></p>
            </div>
            </div>
        );
    }
}

export default Inscription;