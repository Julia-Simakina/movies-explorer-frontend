class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then(err => {
      return Promise.reject(`${err.message}`);
    });
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(res => this._checkResponse(res));
  }

  getMovies() {
    return this._request('/', {
      headers: this._headers
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
