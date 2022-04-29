import React from 'react';
import '../Register/Register.css';
import {Link} from "react-router-dom";
import Logo from "../../images/logo.svg";


function Login() {
    const [email] = React.useState('')
    const [password] = React.useState('')
    return (
        <section className='login'>
            <div className='register__container'>
            <img className="logo" src={Logo} alt="логотип"/>
                <h1 className='register__title'>Добро пожаловать!</h1>
                <form className='register__form'>
                    <div className='register__box'>
                        <p className='register__input-name'>E-mail</p>
                        <input className='register__input' type='email' name='email'
                               value={email || ''} placeholder='zaxarov@mail.ru' required/>
                    </div>
                    <div className='register__box'>
                        <p className='register__input-name'>Пароль</p>
                        <input className='register__input' type='passw' name='passw'
                               value={password} placeholder='*************' required/>
                    </div>
                    <button className='register__button' type='submit'>Войти</button>
                </form>
                <div className='register__footer'>
                    <p className='register__text'>Еще не зарегистрированы?</p>
                    <Link className='register__link' to='/signup'>Регистрация</Link>
                </div>
            </div>
        </section>
    )
}

export default Login;