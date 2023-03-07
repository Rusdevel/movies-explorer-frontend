import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function onSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    // e.preventDefault();

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
    <section className="profile" onSubmit={handleSubmit(onSubmit)}>
      <Navigation />
      <div className="profile__container">
        <h1 className="profile__title">Привет {currentUser.name}</h1>
        <form className="profile__form">
          <div className="profile__box">
            <p className="profile__input-name">Имя</p>
            <input
              className="profile__input"
              type="text"
              {...register("name", {
                // required: "Поле обязательно к заполнению", // поле обязательно для заполнения
                minLength: {
                  // минимальное кол-во символов
                  value: 2,
                  message: "Минимум 2 символа",
                },
                pattern: {
                  value: /^[A-zА-я\-/]{2,20}$/, // содержит только латиницу, кириллицу, пробел или дефис
                  message: "Используются запрещенные символы",
                },
                validate: (value, formValues) => value !== currentUser.name,
              })}
              value={name || ""}
              placeholder="Руслан"
              required
              onChange={changeName}
            />
          </div>
          <span className="register__subtitle">
            {errors?.name && (errors?.name?.message || "Ошибка")}
          </span>
          <div className="profile__box profile__box-style">
            <p className="profile__input-name">E-mail</p>
            <input
              className="profile__input"
              type="email"
              {...register("email", {
                //required: "Поле обязательно к заполнению", // поле обязательно для заполнения
                minLength: {
                  // минимальное кол-во символов
                  value: 2,
                  message: "Минимум 2 символа",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]$/i, // соответствует шаблону электронной почты
                  message: "Почта указана некорректно",
                },
              })}
              value={email || ""}
              placeholder="ruslanbestaev77@yandex.ru"
              onChange={changeEmail}
            />
          </div>
          <span className="register__subtitle">
            {errors?.email && (errors?.email?.message || "Ошибка")}
          </span>

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
