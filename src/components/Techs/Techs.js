import React from 'react';
import './Techs.css';
import '../AboutProject/AboutProject.css';

function Techs() {
  return(
      <section className='techs'>
          <div className='AboutProject__container'>
<h2 className='AboutProject__title'>Технологии</h2>
          <h3 className='techs__title'>7 технологий</h3>
          <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии,
              которые применили в дипломном проекте.</p>
              <ul className='techs__box'>
                  <li className='techs__list'>HTML</li>
                  <li className='techs__list'>CSS</li>
                  <li className='techs__list'>JS</li>
                  <li className='techs__list'>React</li>
                  <li className='techs__list'>Git</li>
                  <li className='techs__list'>Express.js</li>
                  <li className='techs__list'>mongoDB</li>
              </ul>
          </div>
      </section>

  )
}

export default Techs;