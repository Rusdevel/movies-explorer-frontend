import React from "react";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute';
import * as auth from "../../utils/auth";
import './App.css';
import api from "../../utils/MainApi";



function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  //Авторизация
  const [loggedIn, setLoggedIn] = React.useState(false); // проверка вошел ли пользователь в учетку
  const [userEmail, setUserEmail] = React.useState('') // переменная для вывода почты в шапку
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      const promises = [api.getUserInfo()];

      Promise.all(promises)
        .then(([userData]) => {
          console.log(userData.data.name, userData.data.email);
          setCurrentUser({name: userData.data.name, email: userData.data.email});
          
        })
        .catch((result) => console.log(`${result} при загрузке данных`));
    }
  }, [loggedIn]);

  // обработка регистрации
  function register(name, email, password) {
    auth.register(name, email, password).then(
        () => {
            history.push('/signin');
        })
        .catch((err) => {
            console.log(err)
        })
}

// обработка входа
function login(email, password) {

  auth.authorization(email, password).then(
      (data) => {
          setUserEmail(email)
          setLoggedIn(true);
          console.log(setLoggedIn)
          history.push('/movies');
      })
      .catch((err) => {
          console.log(err)
          
      })
}

// выход из учетной записи
function signOut() {
  auth.logout().then(
    ()=> {history.push('/signin');
    setLoggedIn(false);}
  )
  .catch((err) => {
    console.log('Что то не так')
    
})
  
}
// проверка токена для допуска к фильмам
const checkToken = React.useCallback(() => {
  auth.checkToken().then(
      (data) => {
          setLoggedIn(true);
          console.log(data.data.email);
          console.log(data.email);
          setUserEmail(data.data.email);
          history.push('/movies');
      })
      .catch((err) => {
              console.log(err);
          }
      );
}, [history]);

React.useEffect(() => { 
      checkToken();
}, [checkToken]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Switch>
      <ProtectedRoute  path='/movies'
                          loggedIn={loggedIn}
                            component={Movies}
                    />
<ProtectedRoute  path='/profile'
                            loggedIn={loggedIn}
                            onSignOut={signOut}
                            component={Profile}
                    />
<ProtectedRoute path='/saved-movies'
                            loggedIn={loggedIn}
                            component={SavedMovies}
                    />
      <Route exact path="/">
        <Main />
      </Route>
      <Route  path="/signin">
        <Login onLogin={login}  />
      </Route>
      <Route path="/signup">
        <Register onRegister ={register} />
      </Route>
      <Route>
                        {loggedIn ? <Redirect to='/movies'/> : <Redirect to='/sign-in'/>}
                    </Route>
     
      </Switch> 

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
