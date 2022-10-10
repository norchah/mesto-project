export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json(res);
    }
    return Promise.reject(`Error: ${res.status}`)
  }

  _request(method, url, {data}) {
    if (method === "GET" || method === "PUT" || method === "DELETE") {
      return fetch(`${this._baseUrl}${url}`, {
        method: method,
        headers: this._headers,
      }).then(this._checkRes)
    } else {
      return fetch(`${this._baseUrl}${url}`, {
        method: method,
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
          about: data.about,
          avatar: data.avatar,
        }),
      }).then(checkRes)
    }
  }

  getUserInfo() {
    return this._request("GET", "users/me",{});
  }

  getCards() {
    return this._request("GET", "cards", {});
  }

  pushCards(name, link) {
    const data = {name: name, link: link};
    return this._request("POST", "cards", {data});
  }

  pushUser(name, about) {
    const data = {name: name, about: about}
    return this._request("PATCH", "users/me", {data});
  }

  pushAvatar(avatar) {
    const data = {avatar: avatar};
    return this._request("PATCH", "users/me/avatar", {data});
  }

  pushLike(cardId) {
    return this._request("PUT", `cards/likes/${cardId}`, {});
  }

  deleteLike(cardId) {
    return this._request("DELETE", `cards/likes/${cardId}`, {});
  }

  deleteCard(cardId) {
    return this._request("DELETE", `cards/${cardId}`, {});
  }
}