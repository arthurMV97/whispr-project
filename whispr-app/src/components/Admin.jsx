import React, { Component } from 'react';
import axios from 'axios';
import { adminData } from '../store/actions/admin'
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const jwt = require('jsonwebtoken')

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            identifiant: '',
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
            }).catch(err => {
                console.log(err.response.data);
                if  (this.state.valid === null) { this.setState({msg: "L'identifiant ou le mot de passe sont incorrect", valid: false})}

            })
    }

    render() {
        return (
            <div>
                
                <h1>Connexion Admin</h1>

                <div className="connexion-forms">
                <form onSubmit={this.handleSubmit}>
                <input type="text" name="identifiant" id="identifiant" placeholder="Identifiant Admin" onChange={this.handleChange} required />
                <input type="password" name="password" id="password"  placeholder="Mot de passe" onChange={this.handleChange} required />
                {this.state.valid ? null : <p className='not-valid-input'>{this.state.msg}</p>}

                <button type="submit" className="full-btn">Connexion</button>
            </form>
            <div>
            <p>Vous n'êtes pas un administrateur ? <Link  to="/connexion">Connectez vous ici.</Link></p>

            </div>
            </div>
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