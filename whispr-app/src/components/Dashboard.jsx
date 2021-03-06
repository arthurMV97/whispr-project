import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
import SinglePost from './SinglePoste'
import ProfileResume from './ProfileResume'

let socket

// const [userData, setUserData] = useState({})
// useEffect(() => {
//     setUserData(props.displayUserData)
// }, [props.displayUserData])

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.deletePost = this.deletePost.bind(this)
        this.seeState = this.seeState.bind(this)
        this.state = {
            posteToSend: '',
            postes: [],
            userData: {}
        }
    }


    static getDerivedStateFromProps(props, state) {  //peut etre inutil ? A voir si fonctionne sans
        if (props.displayUserData !== state.userData) {
            console.log('Dashboard', state.userData);
            console.log("hello", props.displayUserData);
            
            return {userData: props.displayUserData}
        } else {
            return null
        }
    }

    handleChange = event => {
        const targetName = event.target.name
    this.setState({[targetName]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        const dataToEmit = {
            content: this.state.posteToSend,
            user_id: this.props.userData.id,
            nom: this.props.userData.nom,
            prenom: this.props.userData.prenom,
            image: this.props.userData.image
        }
        console.log(dataToEmit)
        socket.emit('posteData', dataToEmit)
        this.setState({posteToSend: ""})
        
    }

    seeState() {
        console.log(this.state)
    }

    deletePost(i) {
        console.log(i)
        let newState = this.state.postes
        newState.splice(i, 1)
        console.log(newState);
        this.setState({postes: newState})
        console.log(this.state.postes)
    }


    componentDidMount() {
        axios.get(`http://localhost:8080/feed/${this.props.userData.id}`, {
            headers: {
                'Authorization': this.props.userData.token
            }
        } )
        .then(res => {
            this.setState({postes: res.data})
        })
        socket = io('localhost:8080')
        
        socket.on("connect", () => {

            socket.on('message-console', (data) => {
                console.log(data)
            })
            console.log(socket.id);
            
            const idUser = {  
                socket: socket.id,
                user: this.props.userData.id
            }
            socket.emit('socket-id', idUser ) //Envoyer l'id user et l'id socket correspondant

            

          });

          socket.on('new-post', (data) => {
              let newState = [data].concat(this.state.postes)
                this.setState({postes: newState})
                console.log(this.state.postes)
          })
          
          
      
    }

    
    render() {
        return (
            <div className="accueil">
                
                    <ProfileResume displayUserData = {this.state.userData} />
            
                <div className="feed">
                <form onSubmit={this.handleSubmit}>
                        <textarea placeholder="Racontez-nous quelque chose..." name="posteToSend" onChange={this.handleChange} value={this.state.posteToSend}></textarea>
                        <button className="full-btn">Publier</button>
                        

                    </form>
                    {/* <button onClick={this.seeState} className="full-btn">See State</button> */}
                    {
                        this.state.postes.map((element, i) => {
                            element.postIndex = i
                           return  <SinglePost deleteThePost= {this.deletePost} dataFromParent= {element} key={`${element.nom}-${i}-${Math.random()}`}/>
                           
                        })
                    }
                    
                
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) { 
    return {
      userData: state.userStore,
    };
  }


export default connect(mapStateToProps)(Dashboard);