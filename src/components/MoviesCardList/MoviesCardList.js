import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

import image2 from '../../images/movie2.svg';
import image3 from '../../images/movie3.svg';
import image4 from '../../images/movie4.svg';
import image5 from '../../images/movie5.svg';
import image6 from '../../images/movie6.svg';
import image7 from '../../images/movie7.svg';
import image8 from '../../images/movie8.svg';
import image9 from '../../images/movie9.svg';
import image10 from '../../images/movie10.svg';
import image11 from '../../images/movie11.svg';
import image12 from '../../images/movie12.svg';


function MoviesCardList(props) {
    return (
        <section className='movies-cardList'>
            <div className='movies-cardList__container'>
                <div className='movies-cardList__card'>
                    <MoviesCard url={image2} title='Киноальманах «100 лет дизайна»' subtitle='1ч 47м'/>
                    <MoviesCard url={image3} title='В погоне за Бенкси' subtitle='1ч 47м'/>
                    <MoviesCard url={image4} title='Баския: Взрыв реальности' subtitle='1ч 47м'/>
                    <MoviesCard url={image5} title='Бег это свобода' subtitle='1ч 47м'/>
                    <MoviesCard url={image6} title='Книготорговцы' subtitle='1ч 47м'/>
                    <MoviesCard url={image7} title='Когда я думаю о Германии ночью' subtitle='1ч 47м'/>
                    <MoviesCard url={image8} title='Gimme Danger: История Игги и The Stooge...' subtitle='1ч 47м'/>
                    <MoviesCard url={image9} title='Дженис: Маленькая девочка грустит' subtitle='1ч 47м'/>
                    <MoviesCard url={image10} title='Соберись перед прыжком' subtitle='1ч 47м'/>
                    <MoviesCard url={image11} title='Пи Джей Харви: A dog called money' subtitle='1ч 47м'/>
                    <MoviesCard url={image12} title='По волнам: Искусство звука в кино' subtitle='1ч 47м'/>
                </div>
                {/*<button className='movies-cardList__button'>Ещё</button>*/}
            </div>

        </section>
    )
}

export default MoviesCardList;