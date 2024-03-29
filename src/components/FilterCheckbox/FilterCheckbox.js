import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  const { isShort } = props;
  return (
    <div className="filter__group">
      <div className="filter-checkbox">
        <p className="filter-checkbox__title">Короткометражки</p>
        <label className="filter-checkbox__container">
          <input
            className="filter-checkbox__input"
            value={isShort}
            checked={isShort}
            onChange={props.onChange}
            type="checkbox"
          />
          <span className="filter-checkbox__slider"></span>
        </label>
      </div>
    </div>
  );
}

export default FilterCheckbox;
