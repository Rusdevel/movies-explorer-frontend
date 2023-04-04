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
  const { moviesState, movie, setMoviesState } = props;
  // React.useEffect(() => {

  //   console.log(1);
  // }, [moviesState]);
  React.useEffect(() => {
    setIsSaved(moviesState.allLikedMovies.some((m) => m.movieId === movie.id));
    setMoviesState({
      ...moviesState,
      likedMovies: moviesState.allLikedMovies,
    });

    console.log(pathname);
  }, [pathname]);
  // удаление из роута /movies
  const deleteFromSaved = (id) => {
    const movieToDelete = moviesState.allLikedMovies.find(
      (m) => m.movieId === id
    );
    moviesState
      .deleteLikedMoviesIds(movieToDelete)
      .then(() => setIsSaved(false), setIsDelete(true));
  };

  return (
    <>
      {pathname === "/movies" ? (
        <section className="movies-card">
          {isSaved ? (
            <button
              className="movies-card__saved-save_active"
              onClick={() => {
                deleteFromSaved(movie.id);
              }}
            />
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
        <>
          {!isDelete ? (
            <section className="movies-card">
              <>
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
              </>
            </section>
          ) : null}
        </>
      )}
    </>
  );
}
export default MoviesCard;
