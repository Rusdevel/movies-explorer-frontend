import React from "react";
import "./Login.css";
import "../Register/Register.css";
import { Link } from "react-router-dom";
//import Logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../Validation/UseForm";
import LogoHeader from "../LogoHeader/LogoHeader";

function Login(props) {
  const { values, errors, handleChange, isValid } = useFormWithValidation(
    props.clearFormError
  );

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const { profileUpdateMessage, setProfileUpdateMessage } = props;

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values.email, values.password);
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
  return (
    <section className="login">
      <div className="register__container">
        <LogoHeader />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__box">
            <p className="register__input-name">E-mail</p>
            <input
              className="register__input"
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={email || ""}
              onChange={changeEmail}
              placeholder="ruslanbestaev77@yandex.ru"
              required
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
            Войти
          </button>
        </form>
        <div className="register__footer">
          <p className="register__text">Еще не зарегистрированы?</p>
          <Link className="register__link" to="/signup">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
