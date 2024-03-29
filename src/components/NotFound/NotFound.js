import React from "react";
import "./NotFound.css";
import { Link, useHistory } from "react-router-dom";

function NotFound(props) {
  const history = useHistory();
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link
          className="not-found__link"
          to="/movies"
          onClick={() => history.goBack()}
        >
          Назад
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
