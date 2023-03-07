import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const [search, setSearch] = React.useState("");
  const [isShort, setShort] = React.useState(true);
  const { pathname } = useLocation();

  const { moviesState, paging, setPreloaderStatus } = props;

  const isLiked = pathname === "/saved-movies";

  function changeSearch(e) {
    setSearch(e.target.value);
  }

  function changeShort(e) {
    setShort(!isShort);
    console.log(isShort);
  }

  async function moviesStates() {
    const searchInput = { line: search, isShort, isLiked };
    await moviesState.searchMovies({
      search: searchInput,
      paging,
    });
  }

  function searchClick(e) {
    !e || e.preventDefault();
    setPreloaderStatus(true);
    new Promise((res) => setTimeout(() => res("done"), 1000))
      .then(() => moviesStates())
      .finally(() => {
        setPreloaderStatus(false);
        console.log(moviesState.searchMovies);
      });
    // moviesStates()
    // .finally(() => {
    //   setPreloaderStatus(false);
    //  });
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
