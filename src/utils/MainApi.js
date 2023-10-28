class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // User

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ name, email, password })
    }).then(res => this._checkResponse(res));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(res => this._checkResponse(res));
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(res => this._checkResponse(res));
  }

  editProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ name, email })
    }).then(res => this._checkResponse(res));
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }).then(res => this._checkResponse(res));
  }
}

// const BASE_URL = 'https://api.movie.julias.nomoredomainsrocks.ru';

const BASE_URL = 'http://localhost:3000';
//для локального просмотра используй локалхост 3001 вместо этого адреса

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;
