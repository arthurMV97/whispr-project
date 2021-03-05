import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'



class Inscription extends Component {
    constructor() {
        super();
        this.state = {
            nom: {
                content: '',
                msg: '',
                valid: null
            },
            prenom: {
                content: '',
                msg: '',
                valid: null
            },
            date:{
                content: '',
                msg: '',
                valid: null
            },
            email: {
                content: '',
                msg: '',
                valid: null
            },
            password: {
                content: '',
                msg: '',
                valid: null
            },
            confirmation: {
                content: '',
                msg: '',
                valid: null
            },
            msg: {
                content: '',
                msg: '',
                valid: null
            },
        }
    }

   
    handleChange = event => {
        const targetName = event.target.name
        const obj = this.handleValidation(event)
        if (obj.bool) {
            this.setState(prevState => ({
                [targetName]: {                   
                    ...prevState[targetName],    
                    content: event.target.value,
                    valid: obj.bool,
                    msg: obj.msg      
                }
            }))
        } else {
            this.setState(prevState => ({
                [targetName]: {                   
                    ...prevState[targetName],    
                    msg: obj.msg,
                    valid: obj.bool     
                }
            }))
        }
        console.log(this.state.date);
    }

    handleValidation = ev => {
        const response = {
            msg: '',
            bool: false
        }
        const val = ev.target.value
        const name = ev.target.name
        // const rgxSpace = /(\s)/g
        const rgxNames = /^[a-z ,.'-]+$/i
        const rgxEmails = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        const rgxPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        //Champ vide
        if (val === '') {
            response.msg = `Champs obligatoire pour ${name}` 
            return response
        }

        //Nom Prénom
        else if ((name === 'nom' || name === 'prenom') && !rgxNames.test(val)) {
            response.msg = `Veuillez entrer un ${name} valide`
            return response
        }

        //Emails
        else if ((name === 'email') && !rgxEmails.test(val)) {
            response.msg = `Veuillez entrer un ${name} valide`
            return response
        }

        //Mots de passe 
        else if ((name === 'password' || name === 'confirmation') && !rgxPass.test(val)) {
            response.msg = `Votre mot de passe doit contenir 8 caractères minimum, 1 lettre et 1 chiffre`
            return response
        }

        else {
            response.bool = true
            response.msg = 'Champ valide'
            return response
        }
    }

    formValidation() {
        for (const element in this.state) {
           if(this.state[element].valid === false) {
               return false
           } 
    }
       return true
    }
    handleSubmit =  event => {
        event.preventDefault();
        const isFormValid = this.formValidation()
        
       if (isFormValid) {
        if (this.state.confirmation === this.state.password) {
            const user = {
                nom: this.state.nom.content,
                prenom: this.state.prenom.content,
                date: this.state.date.content,
                email: this.state.email.content,
                password: this.state.password.content,
                        }

            axios.post('http://localhost:8080/sign-up', user)
                .then(res => {
                    console.log(res.data)
                })
        } else {
            this.setState(prevState => ({
                confirmation: {                   
                    ...prevState.confirmation,    
                    msg: 'Votre mot de passe ne correspond pas',
                        
                }
            }))
        }
       } else {
           window.alert("Les champs du formulaire ne sont pas valables")
       }
        

    }

    render() {
        return (
            <div className="body-content" >
             <h1>Inscription</h1>
             <div className="connexion-forms">
            <form onSubmit={this.handleSubmit} >
                <input type="text" name="nom" id="nom" placeholder="Nom" onChange={this.handleChange} required />
                <p className={this.state.nom.valid ? 'valid-input' : 'not-valid-input'}>{this.state.nom.msg}</p>
                <input type="text" name="prenom" id="prenom" placeholder="Prénom" onChange={this.handleChange} required />
                <p className={this.state.prenom.valid ? 'valid-input' : 'not-valid-input'}>{this.state.prenom.msg}</p>
                <input type="date" name="date" id="date" className="date" onChange={this.handleChange} required />
                <p className={this.state.date.valid ? 'valid-input' : 'not-valid-input'}>{this.state.date.msg}</p>
                <input type="email" name="email" id="email" placeholder="Email*" onChange={this.handleChange} required />
                <p className={this.state.email.valid ? 'valid-input' : 'not-valid-input'}>{this.state.email.msg}</p>
                <input type="password" name="password" id="password" placeholder="Mot de passe" onChange={this.handleChange} required />
                <p className={this.state.password.valid ? 'valid-input' : 'not-valid-input'}>{this.state.password.msg}</p>
                <input type="password" name="confirmation" id="confirm" placeholder="Confirmez votre mot de passe" onChange={this.handleChange} required />
                <p className={this.state.confirmation.valid ? 'valid-input' : 'not-valid-input'}>{this.state.confirmation.msg}</p>

                <button type="submit" className="full-btn">Inscription</button>
            </form>
            <div>
                <p>Vous êtes déjà inscris ? <Link  to="/connexion">Connectez-vous ici.</Link></p>
            </div>
            </div>
            </div>
        );
    }
}

export default Inscription;