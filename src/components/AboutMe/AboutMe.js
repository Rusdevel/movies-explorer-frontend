import './AboutMe.css';
import Photo from "../../images/photoFrontend.svg"
function AboutMe () {
    return (
      <section className="AboutMe">
      <div className="AboutMe__container">
      <h1 className='AboutMe__title'>Студент</h1>
      <div className='AboutMe__block'>
          <div className='AboutMe__box'>
      <img className='AboutMe__photo' src={Photo} alt='фото студента' />
      </div>
      <div className='AboutMe__box'>
      <h3 className='AboutMe__subtitle'>Руслан</h3>
      <p className='AboutMe__text'>Фронтенд-разработчик, 26 лет</p>
      <p className='AboutMe__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. 
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами 
          и ушёл с постоянной работы.</p>
          </div>
      </div>
      <div className='AboutMe__links'>
      <a href="https://www.facebook.com/" target="_blank"  rel="noopener noreferrer" className="AboutMe__link">Facebook</a>
      <a href="https://github.com/Rusdevel" target="_blank"  rel="noopener noreferrer" className="AboutMe__link">Github</a>
                </div>
      </div>
      </section>
    )
  }

export default AboutMe; 