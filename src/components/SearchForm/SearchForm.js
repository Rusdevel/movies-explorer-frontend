import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const [search, setSearch] = React.useState("");
  const [isShort, setShort] = React.useState(false);
  const { pathname } = useLocation();

  const { moviesState, paging } = props;

  const isLiked = pathname === "/saved-movies";

  // React.useEffect(() => {
  //   if (paging === { index: 1, size: 6 }) {
  //   } else searchClick();
  // }, [paging]);

  function changeSearch(e) {
    setSearch(e.target.value);
  }

  function changeShort(e) {
    setShort(e.target.value);
  }

  function searchClick(e) {
    !e || e.preventDefault();

    const searchInput = { line: search, isShort, isLiked };
    moviesState.searchMovies({ search: searchInput, paging });
  }

  return (
    <section className="search-form">
      <form className="search-form__group">
        <div className="search-form__container">
          <input
            className="search-form__input"
            maxLength="30"
            type="text"
            placeholder="Фильм"
            required
            onChange={changeSearch}
          />
          <button
            onClick={searchClick}
            className="search-form__button"
            type="submit"
          >
            Поиск
          </button>
        </div>
        <FilterCheckbox onChange={changeShort} />
      </form>
    </section>
  );
}

export default SearchForm;
