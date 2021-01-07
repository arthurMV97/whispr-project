import React, { Component } from 'react';
import axios from 'axios';
import { adminData } from '../store/actions/admin'
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const jwt = require('jsonwebtoken')

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            identifiant: '',
            password: ''
        }
    }
    handleChange = event => {
        const targetName = event.target.name
    this.setState({[targetName]: event.target.value})
    }
    handleSubmit = event => {
        event.preventDefault();
        const adminData = this.state
        console.log(adminData)

        axios.post('http://localhost:8080/admin-sign-in', adminData)
            .then(res => {
                const token = res.data.token
                
                try {
                    const decoded = jwt.decode(token)
                    decoded.token = token
                    console.log(decoded)
                    this.props.adminData(decoded)
                    this.props.history.push('/admin-dashboard')
                }
                catch (err){
                    console.log(err)
                }
            })
    }

    render() {
        return (
            <div>
                <h1>Connexion Admin</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                <label >identifiant Admin: </label>
                <input type="text" name="identifiant" id="identifiant" onChange={this.handleChange} required />
                </div>
                <div>
                <label >Mot de passe: </label>
                <input type="password" name="password" id="password" onChange={this.handleChange} required />
                </div>
                <button type="submit">Connexion</button>
            </form>
            
            </div>
        );
    }
}

function mapStateToProps(state) { //Accéder aux données de notre store dans les props
    return {
      isLogged: state.adminStore.isLogged
      // products: state.products.products
    };
  }

const mapDispatchToProps = { 
  adminData                
}


export default connect(
    mapStateToProps, mapDispatchToProps
  )(withRouter(Admin));