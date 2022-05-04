import React from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <section className='search-form'>
            <form className='search-form__group'>
                <div className='search-form__container'>
                    <input className='search-form__input' maxLength='30' type="text" placeholder="Фильм" required/>
                    <button className='search-form__button' type="submit"></button>
                </div>
                <FilterCheckbox/>
            </form>
        </section>
    )
}

export default SearchForm;