import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg";
import { useForm } from "react-hook-form"; // фреймворк для валидации форм

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  function onSubmit(evt) {
    //evt.preventDefault();
    // вносим пользователя в БД
    props.onRegister(email, password, name);
  }

  // меняем Email
  function changeEmail(evt) {
    setEmail(evt.target.value);
  }
  // Меняем пароль
  function changePassword(evt) {
    setPassword(evt.target.value);
  }

  // Меняем имя
  function changeName(evt) {
    setName(evt.target.value);
  }

  return (
    <section className="register">
      <div className="register__container">
        <img className="register__logo" src={Logo} alt="логотип" />
        <h1 className="register__title">Добро пожаловать!</h1>

        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="register__box">
            <p className="register__input-name">Имя</p>
            <input
              className="register__input"
              type="text"
              {...register("name", {
                required: "Поле обязательно к заполнению", // поле обязательно для заполнения
                minLength: {
                  // минимальное кол-во символов
                  value: 2,
                  message: "Минимум 2 символа",
                },
                pattern: {
                  value: /^[a-zа-я\-/]{2,20}$/, // содержит только латиницу, кириллицу, пробел или дефис
                  message: "Используются запрещенные символы",
                },
              })}
              value={name}
              onChange={changeName}
              placeholder="Руслан"
              //required
            />
          </div>
          <span className="register__subtitle">
            {errors?.name && (errors?.name?.message || "Ошибка")}
          </span>

          <div className="register__box">
            <p className="register__input-name">E-mail</p>
            <input
              className="register__input"
              type="email"
              {...register("email", {
                required: "Поле обязательно к заполнению", // поле обязательно для заполнения
                minLength: {
                  // минимальное кол-во символов
                  value: 2,
                  message: "Минимум 2 символа",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, // соответствует шаблону электронной почты
                  message: "Почта указана некорректно",
                },
              })}
              value={email}
              onChange={changeEmail}
              placeholder="ruslanbestaev77@yandex.ru"
              //required
            />
          </div>
          <span className="register__subtitle">
            {errors?.email && (errors?.email?.message || "Ошибка")}
          </span>

          <div className="register__box">
            <p className="register__input-name">Пароль</p>
            <input
              className="register__input"
              type="password"
              {...register("password", {
                required: "Поле обязательно к заполнению", // поле обязательно для заполнения
                minLength: {
                  // минимальное кол-во символов
                  value: 4,
                  message: "Минимум 4 символа",
                },
              })}
              value={password}
              onChange={changePassword}
              placeholder="*************"
              //required
            />
          </div>
          <span className="register__subtitle">
            {errors?.password && (errors?.password?.message || "Ошибка")}
          </span>

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
