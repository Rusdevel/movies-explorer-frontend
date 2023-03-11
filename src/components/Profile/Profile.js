import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../Validation/UseForm";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { profileUpdateMessage, setProfileUpdateMessage } = props;

  const { values, errors, handleChange, isValid, resetForm } =
    useFormWithValidation(props.clearFormError);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.handleUpdateUser({
      name: values.name,
      email: values.email,
    });
  }

  //меняем имя профиля
  function changeName(e) {
    setProfileUpdateMessage("");
    setName(e.target.value);
    if (currentUser.name === e.target.value) {
      e.target.setCustomValidity(
        "Имя пользователя не может сопадать с существующем!"
      );
    } else {
      e.target.setCustomValidity("");
    }

    handleChange(e);
  }

  //меняем почту
  function changeEmail(e) {
    setProfileUpdateMessage("");
    setEmail(e.target.value);
    if (currentUser.email === e.target.value) {
      e.target.setCustomValidity("email не может сопадать с существующем!");
    } else {
      e.target.setCustomValidity("");
    }

    handleChange(e);
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
              required
              placeholder={currentUser.name}
              onChange={changeName}
            />
          </div>
          {errors.name && (
            <span className="register__subtitle">{errors.name}</span>
          )}
          <div className="profile__box profile__box-style">
            <p className="profile__input-name">E-mail</p>
            <input
              className="profile__input"
              type="email"
              name="email"
              value={email || ""}
              required
              placeholder={currentUser.email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onChange={changeEmail}
            />
          </div>
          {errors.email && (
            <span className="register__subtitle">{errors.email}</span>
          )}

          {props.formError.registerError && (
            <span className="register__subtitle">
              {props.formError.errorMessage || "Что-то пошло не так..."}
            </span>
          )}

          {profileUpdateMessage && (
            <span className="register__subtitle">{profileUpdateMessage}</span>
          )}

          <button
            className="profile__subtitle"
            type="submit"
            disabled={!isValid}
          >
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
