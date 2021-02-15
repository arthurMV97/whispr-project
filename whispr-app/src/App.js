import Header from "./components/Header"
import Decouvrir from "./components/Decouvrir"
import Home from "./components/Home"
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import Profil from "./components/Profil";
import HomeAdmin from "./components/HomeAdmin";
import AdminDashboard from "./components/AdminDashboard";
import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect

} from "react-router-dom";

function App() {
  const userId = useSelector(state => state.userStore.id)
  const isUserLogged = useSelector(state => state.userStore.isLogged)
  const isAdmin = useSelector(state => state.adminStore.isLogged)
  const [userData, setUserData] = useState({})
  
  useEffect(() => {
    if (isUserLogged) {
      axios.get(`http://localhost:8080/profile/${userId}`)
      .then(res => {
        console.log("user data", res.data)

        let newData = res.data
        const splitted = {
          abonnements: res.data.abonnements.split(','),
          abonnes: res.data.abonnes.split(','),
          

        }
       splitted.nbAbonnements =  splitted.abonnements.length
       splitted.nbAbonnes =  splitted.abonnes.length
        newData = {...newData, ...splitted}
        console.log('update:', newData)

        setUserData(newData)
      })
    }
   
}, [isUserLogged, userId])

  
  return (
    <Router>
          <Header />
          
          <Switch>
          <Route exact path="/">
            <Home displayUserData = {userData} />
          </Route>

           <Route path="/decouvrir"> {isUserLogged ? <Decouvrir displayUserData = {userData} /> : <Redirect to="/"/>} </Route>
         <Route path="/profil/:id">  {isUserLogged || isAdmin? <Profil displayAbonnements = {{abonnements: userData.abonnements, abonnes: userData.abonnes}}/>  : <Redirect to="/"/> }</Route>
          
          <Route path="/connexion">
            {!isUserLogged ? <Connexion /> : <Redirect to="/"/>}
          </Route>
          <Route path="/inscription">
          {!isUserLogged ? <Inscription /> : <Redirect to="/"/>}
          </Route>

          <Route path="/mysecureadmin">
            {!isAdmin && !isUserLogged ? <HomeAdmin /> : <Redirect to="admin-dashboard"/>}
          </Route>
          <Route path="/admin-dashboard">
            {isAdmin ? <AdminDashboard /> : <Redirect to="/"/>}
          </Route>

        </Switch>
       
    </Router>
  )
}

export default App;
