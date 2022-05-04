import React from 'react';
import './Portfolio.css';
import Pic from "../../images/pic.svg";

function Portfolio() {
    return(
        <section className='portfolio'>
            <div className='AboutProject__container'>
                <h2 className='portfolio__header-title'>Портфолио</h2>
            <ul className='portfolio__box'>
                <li className='portfolio__list'>
                    <a href="https://github.com/Rusdevel/how-to-learn" target="_blank"  rel="noopener noreferrer" className='portfolio__title portfolio__title-style'>Статичный сайт</a>
                    <img className='portfolio__image' src={Pic} alt='ссылка на проект'/>
                </li>
                <li className='portfolio__list'>
                    <a href="https://Rusdevel.github.io/russian-travel/" target="_blank"  rel="noopener noreferrer" className='portfolio__title'>Адаптивный сайт</a>
                    <img className='portfolio__image' src={Pic} alt='ссылка на проект'/>
                </li>
                <li className='portfolio__list'>
                    <a href="https://github.com/Rusdevel/mesto-react" target="_blank"  rel="noopener noreferrer" className='portfolio__title'>Одностраничное приложение</a>
                    <img className='portfolio__image' src={Pic} alt='ссылка на проект'/>
                </li>
            </ul>
            </div>
        </section>
    )
}

export default Portfolio;