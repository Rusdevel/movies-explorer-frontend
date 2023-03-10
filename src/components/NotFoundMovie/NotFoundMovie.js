import React from "react";
import "./NotFoundMovie.css";
import { Link, useHistory } from "react-router-dom";

function NotFoundMovie(props) {
  const history = useHistory();
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found-movie__title">Фильмы не найдены</h1>
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

export default NotFoundMovie;
