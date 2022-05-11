import React from 'react';
import "./SavedMovies.css";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
    return (
        <main className='main__save-movies'>
            <SearchForm/>
            <MoviesCardList/>
            <Footer/>
        </main>
    )
}

export default SavedMovies;