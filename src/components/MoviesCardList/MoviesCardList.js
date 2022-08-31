import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  return (
    <section className="movies-cardList">
      <div className="movies-cardList__container">
        <div className="movies-cardList__card">
          {props.movies.map((movie) => {
            return (
              <MoviesCard
                url={"https://api.nomoreparties.co" + movie.image.url}
                title={movie.nameRu}
                subtitle={movie.duration}
              />
            );
          })}
        </div>
        {/*<button className='movies-cardList__button'>Ещё</button>*/}
      </div>
    </section>
  );
}

export default MoviesCardList;
