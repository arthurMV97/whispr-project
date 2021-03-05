import MobileHeader from "./components/MobileHeader"
import MobileNav from "./components/MobileNav"
import Header from "./components/Header"
import Decouvrir from "./components/Decouvrir"
import Home from "./components/Home"
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import Profil from "./components/Profil";
import HomeAdmin from "./components/HomeAdmin";
import AdminDashboard from "./components/AdminDashboard";

import {Helmet} from "react-helmet";
import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserView, MobileView } from "react-device-detect";
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

  const dispatch = useDispatch()

  const updateData = (data)  => {
    console.log("app-re-render", data)
    setUserData(data)
  }

  useEffect( () => {
    if (isUserLogged) {
     axios.get(`http://localhost:8080/profile/${userId}`)
      .then(res => {

        let newData = res.data
        const splitted = {
          abonnements: res.data.abonnements.split(','),
          abonnes: res.data.abonnes.split(','),
          

        }
       splitted.nbAbonnements =  splitted.abonnements.length
       splitted.nbAbonnes =  splitted.abonnes.length
        newData = {...newData, ...splitted}
        setUserData(newData)
        dispatch({type: 'CONNECT', ...newData})

      })
      axios.get(`http://localhost:8080/favoris/${userId}`)
        .then(response => {
          console.log('favvv', response.data);
          let favorisIds = []
          response.data.forEach(e => favorisIds.push(e.id))
          console.log(favorisIds);
            dispatch({type: 'CONNECTION', favorisIds: favorisIds})
        })
    }
    console.log('App', userData);

   
}, [isUserLogged, userId])

  
  return (
    <Router>
      <Helmet>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Whispr</title>

      </Helmet>

      <BrowserView>
          <Header />
      </BrowserView>

      <MobileView>
        <MobileHeader />
        <MobileNav />
      </MobileView>
          <Switch>
          <Route exact path="/">
            <Home displayUserData = {userData} />
          </Route>

           <Route path="/decouvrir"> {isUserLogged ? <Decouvrir displayUserData = {userData} /> : <Redirect to="/"/>} </Route>
         <Route path="/profil/:id">  {isUserLogged || isAdmin? <Profil updateUserData ={updateData} />  : <Redirect to="/"/> }</Route>
          
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
