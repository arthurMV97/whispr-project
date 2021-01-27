import React, { Component } from 'react';

class SinglePoste extends Component {
    render() {
        return (
            <div>
                <div className="poste" >
                               <img src={this.props.dataFromParent.image} alt={"profile-user" + this.props.dataFromParent.user_id}/>
                               <p>{this.props.dataFromParent.prenom + ' ' + this.props.dataFromParent.nom}</p>
                               <p>{this.props.dataFromParent.content}</p>
                               <ul>
                                   <li><a>Favoris ({this.props.dataFromParent.TotalFavoris})</a></li>
                                   <li><a>Commentaires ({this.props.dataFromParent.TotalComment})</a></li>
                               </ul>
                               <p>{this.props.dataFromParent.date}</p>
                </div>
            </div>
        );
    }
}

export default SinglePoste;