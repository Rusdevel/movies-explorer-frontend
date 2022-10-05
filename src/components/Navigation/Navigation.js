import React from "react";
import { Link } from "react-router-dom";
import LogoHeader from "../LogoHeader/LogoHeader";
import MenuNavigation from "../MenuNavigation/MenuNavigation";
import LogoAcount from "../../images/logoAcount.svg";

function Navigation(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleToggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="header__group header__group-style">
      <MenuNavigation
        isMenuOpen={isMenuOpen}
        handleToggleMenu={handleToggleMenu}
      />
      <>
        <LogoHeader />
        <div className="header__box-link">
          <Link to="/movies" className="header__nav-link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header__nav-link">
            Сохраненые фильмы
          </Link>
          <Link
            to="/profile"
            className="header__nav-link header__nav-link-style"
          >
            Аккаунт
          </Link>
          <Link to="/" target="_blank" rel="noopener noreferrer">
            <img
              className="logo__account header__nav-link"
              src={LogoAcount}
              alt="логотип"
            />
          </Link>
        </div>

        <button className="header__menu" onClick={handleToggleMenu} />
      </>
    </div>
  );
}
export default Navigation;
