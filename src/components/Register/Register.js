import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
//import Logo from "../../images/logo.svg";
import LogoHeader from "../LogoHeader/LogoHeader";
import { useFormWithValidation } from "../../Validation/UseForm";

function Register(props) {
  const { values, errors, handleChange, isValid } = useFormWithValidation(
    props.clearFormError
  );
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // вносим пользователя в БД
    props.onRegister(values.name, values.email, values.password);
  }

  // меняем Email
  function changeEmail(evt) {
    //setProfileUpdateMessage("");
    setEmail(evt.target.value);
    handleChange(evt);
    console.log(errors);
  }
  // Меняем пароль
  function changePassword(evt) {
    setPassword(evt.target.value);
    handleChange(evt);
    console.log(errors.password);
  }

  // Меняем имя
  function changeName(evt) {
    setName(evt.target.value);
    handleChange(evt);
  }

  return (
    <section className="register">
      <div className="register__container">
        <LogoHeader />
        <h1 className="register__title">Добро пожаловать!</h1>

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__box">
            <p className="register__input-name">Имя</p>
            <input
              className="register__input"
              type="text"
              name="name"
              pattern="[A-zА-я\-/]{2,20}$"
              value={name}
              onChange={changeName}
              placeholder="Руслан"
              minLength={2}
              maxLength={15}
              required
            />
          </div>
          {errors.name && (
            <span className="register__subtitle">{errors.name}</span>
          )}
          {props.formError.registerError && (
            <span className="register__subtitle">
              {props.formError.errorMessage || "Что-то пошло не так..."}
            </span>
          )}

          <div className="register__box">
            <p className="register__input-name">E-mail</p>
            <input
              className="register__input"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              name="email"
              value={email}
              minLength={2}
              onChange={changeEmail}
              placeholder="ruslanbestaev77@yandex.ru"
              //required
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

          <div className="register__box">
            <p className="register__input-name">Пароль</p>
            <input
              className="register__input"
              name="password"
              type="password"
              minLength={4}
              value={password || ""}
              onChange={changePassword}
              placeholder="*************"
              required
            />
          </div>
          {errors.password && (
            <span className="register__subtitle">{errors.password}</span>
          )}
          {props.formError.registerError && (
            <span className="register__subtitle">
              {props.formError.errorMessage || "Что-то пошло не так..."}
            </span>
          )}

          <button
            className="register__button"
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>

        <div className="register__footer">
          <p className="register__text">Уже зарегистрированы?</p>
          <Link className="register__link" to="/signin">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
