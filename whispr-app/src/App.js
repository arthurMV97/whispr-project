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
  Route

} from "react-router-dom";

function App() {
  const userId = useSelector(state => state.userStore.id)
  const isUserLogged = useSelector(state => state.userStore.isLogged)

  const [userData, setUserData] = useState({})
  
  useEffect(() => {
    if (isUserLogged) {
      axios.get(`http://localhost:8080/profile/${userId}`)
      .then(res => {
        console.log("user data", res.data)
        setUserData(res.data)
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
          <Route path="/decouvrir">
            <Decouvrir displayUserData = {userData} />
          </Route>
          <Route path="/profil/:id">
            <Profil />
          </Route>
          <Route path="/connexion">
            <Connexion />
          </Route>
          <Route path="/inscription">
            <Inscription />
          </Route>
          <Route path="/mysecureadmin">
            <HomeAdmin />
          </Route>
          <Route path="/admin-dashboard">
            <AdminDashboard />
          </Route>

        </Switch>
    </Router>
  )
}

export default App;
