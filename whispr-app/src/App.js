import Header from "./components/Header"
import Decouvrir from "./components/Decouvrir"
import Home from "./components/Home"
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import Profil from "./components/Profil";

import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";

function App() {
  return (
    <Router>
          <Header />

          <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/decouvrir">
            <Decouvrir />
          </Route>
          <Route path="/profil">
            <Profil />
          </Route>
          <Route path="/connexion">
            <Connexion />
          </Route>
          <Route path="/inscription">
            <Inscription />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
