import React from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
//import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute';
import * as auth from "../../utils/auth";
import './App.css';



function App() {
  const [currentUser, setCurrentUser] = React.useState({});

//Авторизация
const [loggedIn, setLoggedIn] = React.useState(false); // проверка вошел ли пользователь в учетку
  const [userEmail, setUserEmail] = React.useState('') // переменная для вывода почты в шапку
  const history = useHistory();

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
// проверка токена для допуска к фильмам
const checkToken = React.useCallback(() => {
  auth.checkToken().then(
      (data) => {
        setLoggedIn(true);
          console.log(data.data.email);
          console.log(data.email);
          
          setUserEmail(data.data.email);
          history.push('/users/me');
      })
      .catch((err) => {
              console.log(err);
          }
      );
}, []);

React.useEffect(() => { 
     checkToken();
}, [checkToken]);


  return (
    <div className="App">
      <Switch>
      <ProtectedRoute  path='/movies'
                          loggedIn={loggedIn}
                            component={Movies}
                    />
<ProtectedRoute  path='/profile'
                            loggedIn={loggedIn}
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
     
      </Switch> 

    </div>

  );
}

export default App;
