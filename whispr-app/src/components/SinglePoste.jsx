import React, { Component } from 'react';
import Separation from './Separation';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import Commentaires from './Commentaires'
import Favoris from './Favoris'



class SinglePoste extends Component {
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }

    componentDidMount() { //emp^che les données d'arriver 
        this.setState({data: this.props.dataFromParent})

    }

    deletePost = () => {
        console.log(this.state.data);
        let index = this.state.data.postIndex
        
            this.props.deleteThePost(index)
        axios.delete(`http://localhost:8080/post/${this.state.data.id}`)
        .then(res => {
            console.log(res.data);
            
           
        })

    }

    render() {
        return (
            <div>


                <div className="poste" >

                
                <div>
                    <div className="user">                       
                            <Link to={`/profil/${this.props.dataFromParent.user_id}`}><img src={this.props.dataFromParent.image} alt={"profile-user" + this.props.dataFromParent.user_id}/></Link>
                            <Link to={`/profil/${this.props.dataFromParent.user_id}`}><p>{this.props.dataFromParent.prenom + ' ' + this.props.dataFromParent.nom}</p></Link>
                    </div>
                    
                    <div className="content">
                    <p>{this.props.dataFromParent.content}</p>
                    <p>{this.props.dataFromParent.date}</p>
                    </div>
                </div>
                    <div className="interactions">
                                   <Favoris nbFavoris ={this.props.dataFromParent.TotalFavoris}/>
                                   <Commentaires nbCommentaires={this.props.dataFromParent.TotalComment}/>
                                   <div className="img-bloc">
                                   { this.props.userId === this.props.dataFromParent.user_id || this.props.isAdmin ? <button onClick={this.deletePost} className="btn-delete"></button> : null}
                                   </div>
                    </div>

                    
                               
                               
                               
                </div>
                <Separation />
            </div>
        );
    }
}


function mapStateToProps(state) { //Accéder aux données de notre store dans les props
    return {
      userId: state.userStore.id,
      isAdmin: state.adminStore.isLogged
      // products: state.products.products
    };
  }

  export default connect(
    mapStateToProps
  )(SinglePoste);