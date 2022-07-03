import { NavLink, useLocation} from "react-router-dom";
import LogoHeader from "../LogoHeader/LogoHeader";

import Navigation from "../Navigation/Navigation";
import './Header.css';

function Header (props) {
  const {pathname} = useLocation();
  const isColorHead = pathname === '/' ? 'header' : 'header header-style';
    return (
      <header className={isColorHead}>
        <div className="header__group">
        
        { ( pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') ? (
                        <Navigation />
                ) : (
                    <div className="header__main">
                    <LogoHeader/>
      <div className="header__container">
      <NavLink className="header__button"  to="/signup">
                                Регистрация
                            </NavLink>
                            <NavLink className="header__button header__button-active"   to="/signin">
                                Войти
                            </NavLink>
      </div>
      </div>
                )}
  </div>
      </header>
    )
  }

export default Header; 