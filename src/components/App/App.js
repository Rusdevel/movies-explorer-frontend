import React from "react";
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './App.css';


function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies">
        <Movies />
      </Route>
      <Route path="/saved-movies">
        <SavedMovies />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/signup">
        <Register />
      </Route>
      </Switch>
      
    </div>
  );
}

export default App;
