import React, { Component } from 'react';
import Separation from './Separation';

class SinglePoste extends Component {
    render() {
        return (
            <div>
                <div className="poste" >
                    <div className="user">
                            <img src={this.props.dataFromParent.image} alt={"profile-user" + this.props.dataFromParent.user_id}/>
                            <p>{this.props.dataFromParent.prenom + ' ' + this.props.dataFromParent.nom}</p>
                    </div>
                    <div className="content">
                    <p>{this.props.dataFromParent.content}</p>
                    <p>{this.props.dataFromParent.date}</p>
                    </div>
                    <div className="interactions">
                                <ul>
                                   <li><button>Favoris ({this.props.dataFromParent.TotalFavoris})</button></li>
                                   <li><button>Commentaires ({this.props.dataFromParent.TotalComment})</button></li>
                               </ul>
                    </div>
                               
                               
                               
                </div>
                <Separation color="red" />
            </div>
        );
    }
}

export default SinglePoste;