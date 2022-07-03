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
    url: `http://localhost:3000`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  export default api;