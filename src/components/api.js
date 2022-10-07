const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15/",
  methodGet: "GET",
  methodPost: "POST",
  methodDel: "DELETE",
  methodPatch: "PATCH",
  methodPut: "PUT",
  headers: {
    authorization: "71d1de88-4fa7-4dcd-8a4d-ca9958b8c0d0",
    "Content-Type": "application/json",
  },
};
// function for check response
function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// function for request without body
function request(url, options, method) {
  return fetch(`${options.baseUrl}${url}`, {
    method: method,
    headers: options.headers,
  }).then(checkRes)
}

// function for request with body
function requestWithBody(url, options, method, name, link) {
  return fetch(`${options.baseUrl}${url}`, {
    method: method,
    headers: options.headers,
    body: JSON.stringify({
      name: name,
      link: link,
      about: link,
      avatar: name,
    }),
  }).then(checkRes)
}

// get user data
export function getUserInfo() {
  return request("users/me", config, config.methodGet)
}
// get cards data
export function getCards() {
  return request("cards", config, config.methodGet)
}
// push card data
export function pushCards(name, link) {
  return requestWithBody("cards", config, config.methodPost, name, link)
}
// push user data
export function pushUser(name, about) {
  return requestWithBody("users/me", config, config.methodPatch, name, about)
}
// delete card
export function deleteCard(cardId) {
  return request(`cards/${cardId}`, config, config.methodDel)
}
// push avatar data
export function pushAvatar(avatar) {
  return requestWithBody("users/me/avatar", config, config.methodPatch, avatar) 
}
// push like
export function pushLike(cardId) {
  return request(`cards/likes/${cardId}`, config, config.methodPut)
}
// delete like
export function delLike(cardId) {
  return request(`cards/likes/${cardId}`, config, config.methodDel)
}
