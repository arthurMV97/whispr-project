import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userData } from '../store/actions/user'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { withRouter} from 'react-router-dom';


const jwt = require('jsonwebtoken')


class Connexion extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = event => {
        const targetName = event.target.name
    this.setState({[targetName]: event.target.value})
    }
    handleSubmit = event => {
        event.preventDefault();
        const userData = this.state
        

        axios.post('http://localhost:8080/sign-in', userData)
            .then(res => {
                const token = res.data.token
                console.log(res.data);
                try {
                    const decoded = jwt.decode(token)
                    decoded.token = token
                    console.log(decoded)
                    this.props.userData(decoded)
                    this.props.history.push('/')
                }
                catch (err){
                    console.log(err)
                }
            }).catch(err => {
                console.log(err.response.data);
                
            })

        
    }

    render() {
        return (
            <div>
                <h1>Se connecter</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                <label >Email: </label>
                <input type="email" name="email" id="email" onChange={this.handleChange} required />
                </div>
                <div>
                <label >Mot de passe: </label>
                <input type="password" name="password" id="password" onChange={this.handleChange} required />
                </div>
                <button type="submit">Connexion</button>
            </form>
            <div>
                <p>Vous n'avez pas de compte ? <Link  to="/inscription">Inscrivez-vous ici.</Link></p>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) { //Accéder aux données de notre store dans les props
    return {
      isLogged: state.userStore.isLogged
      // products: state.products.products
    };
  }

const mapDispatchToProps = { 
  userData                
}


export default connect(
    mapStateToProps, mapDispatchToProps
  )(withRouter(Connexion));