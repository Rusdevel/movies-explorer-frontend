import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="AboutProject">
      <div className="AboutProject__container">
        <h1 className="AboutProject__title">О проекте</h1>
        <div className="AboutProject__block">
          <div className="AboutProject__box">
            <h3 className="AboutProject__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="AboutProject__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="AboutProject__box">
            <h3 className="AboutProject__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="AboutProject__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="aboutProject__info">
          <p className="aboutProject__week">1 неделя</p>
          <p className="aboutProject__week">4 недели</p>
          <p className="aboutProject__footnote">Back-end</p>
          <p className="aboutProject__footnote">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
