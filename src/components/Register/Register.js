import React from 'react';
import './Register.css';
import {Link} from "react-router-dom";
import Logo from "../../images/logo.svg";



function Register(props) {
    const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault()
    // вносим пользователя в БД
    props.onRegister(email, password, name)
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

        <section className='register'>

            <div className='register__container'>
            <img className="register__logo" src={Logo} alt="логотип"/>
                <h1 className='register__title'>Добро пожаловать!</h1>
                <form className='register__form' onSubmit={handleSubmit}>
                    <div className='register__box'>
                        <p className='register__input-name'>Имя</p>
                        <input className='register__input' type='text' name='name'
                            value={name} onChange={changeName}  placeholder='Руслан' required/>
                    </div>
                    <div className='register__box'>
                        <p className='register__input-name'>E-mail</p>
                        <input className='register__input' type='email' name='email'
                               value={email} onChange={changeEmail}  placeholder='ruslanbestaev77@yandex.ru' required/>
                    </div>
                    <div className='register__box'>
                        <p className='register__input-name'>Пароль</p>
                        <input className='register__input' type='password' name='password'
                               value={password} onChange={changePassword}  placeholder='*************' required/>
                    </div>
                    <span className='register__subtitle'>Что-то пошло не так...</span>
                    <button className='register__button' type='submit'>Зарегистрироваться</button>
                </form>
                <div className='register__footer'>
                    <p className='register__text'>Уже зарегистрированы?</p>
                    <Link className='register__link' to='/signin'>Войти</Link>
                </div>
            </div>
        </section>
    )
}


export default Register;