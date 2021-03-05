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
            password: '',
            msg: '',
            valid: null
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
              if  (this.state.valid === null) { this.setState({msg: "L'email ou le mot de passe sont incorrect", valid: false})}

                
            })

        
    }

    render() {
        return (
            <div className="body-content">
                <h1>Se connecter</h1>
                <div className="connexion-forms">
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" id="email" placeholder="Email"  onChange={this.handleChange} required />
                <input type="password" name="password" id="password" placeholder="Mot de passe"  onChange={this.handleChange} required />
                {this.state.valid ? null : <p className='not-valid-input'>{this.state.msg}</p>}

                <button type="submit" className="full-btn">Connexion</button>

            </form>
            <div>
                <p>Vous n'avez pas de compte ? <Link  to="/inscription">Inscrivez-vous ici.</Link></p>
            </div>
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