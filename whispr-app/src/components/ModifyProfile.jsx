import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';



class ModifyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prenom: {
                content: this.props.userData.prenom,
                valid: null,
                msg: ''
            },
            nom: {
                content: this.props.userData.nom,
                valid: null,
                msg: ''
            },
            image: {
                content: this.props.userData.image,
                valid: null,
                msg: ''
            },
            description: {
                content: this.props.userData.description,
                valid: null,
                msg: ''
            },
            lieu: {
                content: this.props.userData.lieu,
                valid: null,
                msg: ''
            }
        }
    }

    close() {
        this.props.closeModif(false)
    }

    handleChange = event => {
        const targetName = event.target.name
        const validationObj = this.handleValidation(event)
        if (validationObj.bool) {
            this.setState(prevState => ({
                [targetName]: {                   
                    ...prevState[targetName],    
                    content: event.target.value,
                    valid: validationObj.bool,
                    msg: validationObj.msg      
                }
            }))
        } else {
            this.setState(prevState => ({
                [targetName]: {                   
                    ...prevState[targetName],    
                    msg: validationObj.msg,
                    valid: validationObj.bool     
                }
            }))
        }
    }

    handleValidation = event => {
        const response = {
            msg: '',
            bool: false
        }
        const val = event.target.value
        const name = event.target.name
        const rgxNames = /^[a-z ,.'-]+$/i
        if ((name === 'nom' || name === 'prenom' || name === 'lieu') && !rgxNames.test(val)) {
            response.msg = `Veuillez entrer un ${name} valide`
            return response
        }
        else {
            response.bool = true
            response.msg = 'Champ valide'
            return response
        }
    }

    formValidation() {//Verifie pour chaque champs s'il est valide
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
        const user = {
            nom: this.state.nom.content,
            prenom: this.state.prenom.content,
            description: this.state.description.content,
            lieu: this.state.lieu.content,
            image: this.state.image.content,
                    }
                    
        axios.put(`http://localhost:8080/user/${this.props.userId}`, user)
        .then(res => {
            console.log(res.data)
            this.close()
            console.log('wsssh');
            this.props.modifyData(user)

        })
        .catch(error => {
            console.log(JSON.stringify(error) || null)
          });
        
       } else {
           window.alert("Les champs du formulaire ne sont pas valables")
       }
        

    }

    render() {
        return (
            <div className="modify-pop-up">
                <div className="pop-header">
                <button className="empty-btn" onClick={() => this.close()}>X</button>
                <h3>Modifier le profil</h3>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="prenom" id="prenom" defaultValue={this.state.prenom.content}onChange={this.handleChange} />
                    <p className={this.state.prenom.valid ? 'valid-input' : 'not-valid-input'}>{this.state.prenom.msg}</p>

                    <input type="text" name="nom" id="nom" defaultValue={this.state.nom.content} onChange={this.handleChange} />
                    <p className={this.state.nom.valid ? 'valid-input' : 'not-valid-input'}>{this.state.nom.msg}</p>

                    <input type="text" name="image" id="image" defaultValue={this.state.image.content} />
                    <textarea  maxLength="100" name="description" id="description" defaultValue={this.state.description.content}onChange={this.handleChange} />
                    <input type="text" name="lieu" id="lieu" defaultValue={this.state.lieu.content}  onChange={this.handleChange} />
                    <p className={this.state.lieu.valid ? 'valid-input' : 'not-valid-input'}>{this.state.lieu.msg}</p>
                    <div className="btn-div">
                    <button type="submit" className="full-btn">Valider</button>
                    <button type="reset" className="full-btn">Annuler</button>
                    </div>
                </form>

            </div>
        );
    }
}

function mapStateToProps(state) { //Accéder aux données de notre store dans les props
    return {
      userId: state.userStore.id
      // products: state.products.products
    };
  }



export default connect(
    mapStateToProps
  )(ModifyProfile);