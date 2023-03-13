import React from "react";
import "./PopapMoviesNotFound.css";
import fail from "../../images/fail.svg";

function PopapMoviesNotFound(props) {
  return (
    <div className={`popup popup_type_reg ${props.isOpen ? "popup_open" : ""}`}>
      <div className="popup__container">
        <div className="popup__content popup__form_tooltip">
          <button
            type="button"
            className="popup__close"
            onClick={props.onClose}
          ></button>
          <img
            className="popup__tooltip_image"
            src={fail}
            alt={"Фильмы не найдены"}
          />
          <h2 className="popup__title popup__title-tooltip">
            Фильмы не найдены
          </h2>
        </div>
      </div>
    </div>
  );
}

export default PopapMoviesNotFound;
