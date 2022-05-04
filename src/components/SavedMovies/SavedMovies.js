import React from 'react';
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
    return (
        <main className='main'>
            <SearchForm/>
            <MoviesCardList/>
            <Footer/>
        </main>
    )
}

export default SavedMovies;