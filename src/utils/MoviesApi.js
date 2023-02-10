class MoviesApi {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.url;
  }
  // Получаем фильмы
  getInitialMovies() {
    return fetch(`${this._url}`, {
      headers: this._headers,
      //изменил creditnails на omit по просьбе cors
      credentials: "omit",
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
const moviesApi = new MoviesApi({
  url: `https://api.nomoreparties.co/beatfilm-movies`,
  headers: {
    "Content-Type": "application/json",
  },
});
export default moviesApi;
