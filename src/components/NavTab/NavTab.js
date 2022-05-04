import './NavTab.css';
import {Link} from "react-router-dom";

function NavTab () {
    return (
      <section className="navTab">
      <div className="navTab__container">
      <Link className='navTab__link' to='/signup'>О проекте</Link>
      <Link className='navTab__link' to='/signup'>Технологии</Link>
      <Link className='navTab__link' to='/signup'>Студент</Link>
      </div>
      </section>
    )
  }

export default NavTab; 