import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter__group">
      <div className="filter-checkbox">
        <p className="filter-checkbox__title">Короткометражки</p>
        <label className="filter-checkbox__container">
          <input className="filter-checkbox__input" type="checkbox" />
          <span className="filter-checkbox__slider"></span>
        </label>
      </div>
    </div>
  );
}

export default FilterCheckbox;
