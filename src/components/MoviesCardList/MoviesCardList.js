import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import image2 from "../../images/movie2.svg";
import image3 from "../../images/movie3.svg";
import image4 from "../../images/movie4.svg";
import image5 from "../../images/movie5.svg";
import image6 from "../../images/movie6.svg";
import image7 from "../../images/movie7.svg";
import image8 from "../../images/movie8.svg";
import image9 from "../../images/movie9.svg";
import image10 from "../../images/movie10.svg";
import image11 from "../../images/movie11.svg";
import image12 from "../../images/movie12.svg";

function MoviesCardList(props) {
  return (
    <section className="movies-cardList">
      <div className="movies-cardList__container">
        <div className="movies-cardList__card">
          {props.movies.map((movie) => (
            <MoviesCard
              url={"https://api.nomoreparties.co" + movie.image.url}
              title={movie.nameRu}
              subtitle={movie.duration}
            />
          ))}
        </div>
        {/*<button className='movies-cardList__button'>Ещё</button>*/}
      </div>
    </section>
  );
}

export default MoviesCardList;
