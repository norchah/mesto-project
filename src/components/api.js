import { renderAppendCard, renderPrependCard } from "./card.js";
import {
  cardContainer,
  cardTemplate,
  profileName,
  profileDescription,
  profileAvatar,
  popupEdit,
  popupAdd,
  popupAvatar,
} from "./variables.js";
import { renderUserName, renderLoading } from "./utils.js";
import { closePopup } from "./modal.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  methodGet: "GET",
  methodPost: "POST",
  methhodDel: "DELETE",
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

export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: config.methodGet,
    headers: config.headers,
  })
    .then((res) => checkRes(res))
    .then((data) => {
      renderUserName(data.name, data.about, data.avatar);
    })
    .catch((err) => console.log(err));
}

export function getCards() {
  fetch(`${config.baseUrl}/cards`, {
    method: config.methodGet,
    headers: config.headers,
  })
    .then((res) => checkRes(res))
    .then((data) => {
      data.forEach((el) => {
        renderAppendCard(el, cardTemplate, cardContainer);
      });
    })
    .catch((err) => console.log(err));
}

export function pushCards(name, link, evt) {
  return fetch(`${config.baseUrl}/cards`, {
    method: config.methodPost,
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => checkRes(res))
    .then((data) => {
      renderPrependCard(data, cardTemplate, cardContainer);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, evt);
      closePopup(popupAdd);
    });
}

export function pushUser(name, about, evt) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: config.methodPatch,
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => checkRes(res))
    .then((data) => {
      console.log(data);
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, evt);
      closePopup(popupEdit);
    });
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: config.methhodDel,
    headers: config.headers,
  })
    .then((res) => checkRes(res))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export function pushAvatar(avatar, evt) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: config.methodPatch,
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((res) => checkRes(res))
    .then((data) => {
      profileAvatar.src = data.avatar;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, evt);
      closePopup(popupAvatar);
    });
}

export function pushLike(count, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: config.methodPut,
    headers: config.headers,
  })
    .then((res) => checkRes(res))
    .then((data) => {
      count.textContent = data.likes.length;
    })
    .catch((err) => console.log(err));
}

export function delLike(count, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: config.methhodDel,
    headers: config.headers,
  })
    .then((res) => checkRes(res))
    .then((data) => {
      count.textContent = data.likes.length;
    })
    .catch((err) => console.log(err));
}
