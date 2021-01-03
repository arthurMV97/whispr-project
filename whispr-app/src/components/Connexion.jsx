import React, { Component } from 'react';

class Connexion extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div>
                <h1>Se connecter</h1>
            <form action="">
                <label for="email">Entrez votre email: </label>
                <input type="email" name="email" id="email" required />
                <label for="password">Entrez votre mot de passe: </label>
                <input type="password" name="password" id="password" required />
                <button type="submit">Connexion</button>
            </form>
            </div>
        );
    }
}

export default Connexion;