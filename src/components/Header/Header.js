import {Link, NavLink, useLocation} from "react-router-dom";
import Logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import './Header.css';

function Header (props) {
  const {pathname} = useLocation();
  const isColorHead = pathname === '/' ? 'header' : 'header header-style';
    return (
      <header className={isColorHead}>
        <div className="header__group">
        <Link href="#" target="_blank"  rel="noopener noreferrer"><img className="logo" src={Logo}
                                                           alt="логотип"/></Link>
        {props.loggedIn && ( pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') ? (
                        <Navigation />
                ) : (
                    <>
      <div className="header__container">
      <NavLink className="header__button" target="_blank" to="/signup">
                                Регистрация
                            </NavLink>
                            <NavLink className="header__button header__button-active" target="_blank"  to="/signin">
                                Войти
                            </NavLink>
      </div>
      </>
                )}
  </div>
      </header>
    )
  }

export default Header; 