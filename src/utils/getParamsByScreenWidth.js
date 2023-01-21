export function getParamsByScreenWidth() {
  const innerWidth = window.innerWidth; // отвечает за ширину приложения

  if (innerWidth >= 1280) {
    return {
      moviesStartCount: 12, // рендерим 12 карточек
      addMoviesCount: 3, // добавляем 3
    };
  } else if (innerWidth >= 768 && innerWidth < 1280) {
    return {
      moviesStartCount: 8,
      addMoviesCount: 2,
    };
  } else {
    return {
      moviesStartCount: 5,
      addMoviesCount: 1,
    };
  }
}
