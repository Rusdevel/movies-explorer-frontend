import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute';
import './App.css';



function App() {

//Авторизация
const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="App">
      <Switch>
     
      <ProtectedRoute exact path='/movies'
                            loggedIn={loggedIn}
                            component={Movies}
                    />
<ProtectedRoute exact path='/profile'
                            loggedIn={loggedIn}
                            component={Profile}
                    />
<ProtectedRoute exact path='/saved-movies'
                            loggedIn={loggedIn}
                            component={SavedMovies}
                    />
      <Route exact path="/">
        <Main />
      </Route>
      
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/signup">
        <Register />
      </Route>
      <Route>
                        {loggedIn ? <Redirect to='/movies'/> : <Redirect to='/'/>}
                    </Route>
      </Switch>
      
    </div>
  );
}

export default App;
