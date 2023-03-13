import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const storageSerch = JSON.parse(localStorage.getItem("search"));
  const [search, setSearch] = React.useState("");
  const [isShort, setShort] = React.useState(false);
  const { pathname } = useLocation();

  const { moviesState, paging, setPreloaderStatus } = props;

  const isLiked = pathname === "/saved-movies";

  React.useEffect(() => {
    if (!isLiked && storageSerch !== null) {
      setSearch(storageSerch.line);
      setShort(storageSerch.isShort);
    }
  }, [isLiked]);

  function changeSearch(e) {
    setSearch(e.target.value);
  }

  function changeShort() {
    setShort(!isShort);
    console.log(moviesState.movies.length);
  }

  async function moviesStates() {
    const searchInput = { line: search, isShort, isLiked };
    if (isLiked) {
      await moviesState.searchMoviesLiked({
        search: searchInput,
        paging,
      });
    } else {
      await moviesState.searchMovies({
        search: searchInput,
        paging,
      });
    }
  }

  function searchClick(e) {
    !e || e.preventDefault();
    setPreloaderStatus(true);
    new Promise((res) => setTimeout(() => res("done"), 1000))
      .then(() => moviesStates())
      .finally(() => {
        setPreloaderStatus(false);
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
            value={search || ""}
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
        <FilterCheckbox isShort={isShort} onChange={changeShort} />
      </form>
    </section>
  );
}

export default SearchForm;
