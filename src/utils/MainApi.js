class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.url;
  }
  // Получаем информацию о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkRes);
  }

  //отправляем измененные данные пользовотеля на сервер
  editeUserDate(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkRes);
  }

  // сохраняем понравившиеся фильмы
  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country || "данные отсутствуют",
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: "https://api.nomoreparties.co" + movie.image.url,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU || "Фильм не имеет русского имени",
        nameEN: movie.nameEN || "Фильм не имеет английского имени",
        thumbnail:
          "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url,
        movieId: movie.id,
      }),
    }).then(this._checkRes);
  }
  //удаление понравившегося фильма
  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkRes);
  }

  //показать все сохраненные фильмы
  getAllLikedMovie() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkRes);
  }

  // проверяем приняли ли запрос
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // другие методы работы с API
}
const api = new Api({
  url: `https://api-movies.nomoredomains.work`,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
