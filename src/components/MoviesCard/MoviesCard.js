import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  const [isSaved, setIsSaved] = React.useState(false);
  function handleToggleSaved() {
    setIsSaved(!isSaved);
  }

  const { pathname } = useLocation();
  return (
    <section className="movies-card">
      {pathname === "/movies" ? (
        <>
          <button
            className={` ${
              !isSaved ? "movies-card__saved" : "movies-card__saved-hidden"
            }`}
            onClick={handleToggleSaved}
          >
            Сохранить
          </button>
          <button
            className={` ${
              isSaved
                ? "movies-card__saved-save_active"
                : "movies-card__saved-save"
            }`}
          ></button>
        </>
      ) : (
        <button className="movies-card__delete ">X</button>
      )}
      <div className="movies-card__container">
        <img className="movies-img" src={props.url} alt={props.title}></img>

        <div className="movies-card__group">
          <h2 className="movies-card__title">{props.title}</h2>
          <p className="movies-card__subtitle">{props.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
export default MoviesCard;
