import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <div className='filter__group'>
            <div className='filter-checkbox'>
                <label className='filter-checkbox__container'>
                    <input className='filter-checkbox__input' type='checkbox'/>
                    <span className='filter-checkbox__slider'></span>
                </label>
                <p className='filter-checkbox__title'>Короткометражки</p>
            </div>
        </div>
    )
}

export default FilterCheckbox;