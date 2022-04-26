import {Link, NavLink} from "react-router-dom";
import Logo from "../../images/logo.svg";
import './Header.css';

function Header () {
    return (
      <div className="header">
        <div className="header__group">
        <Link href="#" target="_blank"  rel="noopener noreferrer"><img className="logo" src={Logo}
                                                           alt="логотип"/></Link>
      <div className="header__container">
      <NavLink className="header__button" target="_blank" to="/signup">
                                Регистрация
                            </NavLink>
                            <NavLink className="header__button header__button-active" target="_blank"  to="/signin">
                                Войти
                            </NavLink>
      </div>
  </div>
      </div>
    )
  }

export default Header; 