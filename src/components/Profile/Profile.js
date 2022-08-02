import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      email: email,
    });
  }

  //меняем имя профиля
  function changeName(e) {
    setName(e.target.value);
  }

  //меняем почту
  function changeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <section className="profile" onSubmit={handleSubmit}>
      <Navigation />
      <div className="profile__container">
        <h1 className="profile__title">Привет {currentUser.name}</h1>
        <form className="profile__form">
          <div className="profile__box">
            <p className="profile__input-name">Имя</p>
            <input
              className="profile__input"
              type="text"
              name="name"
              value={name || ""}
              placeholder="Руслан"
              required
              onChange={changeName}
            />
          </div>
          <div className="profile__box profile__box-style">
            <p className="profile__input-name">E-mail</p>
            <input
              className="profile__input"
              type="email"
              name="email"
              value={email || ""}
              placeholder="ruslanbestaev77@yandex.ru"
              required
              onChange={changeEmail}
            />
          </div>
          <button className="profile__subtitle" type="submit">
            Редактировать
          </button>
          <Link
            className="profile__exit"
            to="/signin"
            onClick={props.onSignOut}
          >
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;
