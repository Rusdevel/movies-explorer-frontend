import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  const [isSaved, setIsSaved] = React.useState(false); //Добавлена ли карточка в избранное
  const [isDelete, setIsDelete] = React.useState(false); // Удалена ли карточка из избранного
  function handleToggleSaved() {
    setIsSaved(!isSaved);
  }

  const { pathname } = useLocation();
  const { moviesState, movie } = props;
  React.useEffect(() => {
    setIsSaved(moviesState.likedMovies.some((m) => m.movieId === movie.id));
  });

  return (
    <>
      {
        // Проверяем удалена ли карточка
        !isDelete ? (
          <section className="movies-card">
            {pathname === "/movies" ? (
              isSaved ? (
                <button className="movies-card__saved-save_active" />
              ) : (
                <button
                  className="movies-card__saved"
                  onClick={() => {
                    moviesState
                      .updateLikedMoviesIds(movie)
                      .then(() => setIsSaved(true));
                  }}
                >
                  Save
                </button>
              )
            ) : (
              <button
                className="movies-card__delete"
                onClick={() => {
                  moviesState
                    .deleteLikedMoviesIds(movie)
                    .then(() => setIsSaved(false), setIsDelete(true));
                }}
              >
                X
              </button>
            )}
            <div className="movies-card__container">
              <a
                href={props.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="movies-img"
                  src={props.url}
                  alt={props.title}
                ></img>
              </a>

              <div className="movies-card__group">
                <h2 className="movies-card__title">{props.title}</h2>
                <p className="movies-card__subtitle">{props.subtitle}</p>
              </div>
            </div>
          </section>
        ) : (
          // если карточка удалена, то скрываем ее
          <section className="movies-card__hide"></section>
        )
      }
    </>
  );
}
export default MoviesCard;
