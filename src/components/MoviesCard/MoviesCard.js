import React from 'react';
import './MoviesCard.css';
import {useLocation} from "react-router-dom";

function MoviesCard(props) {
    const {pathname} = useLocation();
    return (
        <section className='movies-card'>
            <div className='movies-card__container'>
                <img className='movies-img' src={props.url} alt={props.title}></img>
                <div className='movies-card__group'>
                    <h2 className='movies-card__title'>{props.title}</h2>
                    {pathname === "/movies" ? (
                        <button className='movies-card__like'></button>
                    ) : (
                        <button className='movies-card__delete'></button>
                    )}
                </div>
                <p className='movies-card__subtitle'>{props.subtitle}</p>
            </div>
        </section>
    )
}
export default MoviesCard;