import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './styles/output.css'
import AllPokemonsPage from './pages/AllPokemonsPage'
import PokemonPage from './pages/PokemonPage'
import CatchedPokemonsPage from './pages/CatchedPokemonsPage'
import { store } from './store';
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/pokemons/:id">
              <PokemonPage/>
            </Route>
            <Route path="/catched-pokemons">
              <CatchedPokemonsPage/>
            </Route>
            <Route path="/">
              <AllPokemonsPage/>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
