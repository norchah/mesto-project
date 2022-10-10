import {
  popupAdd,
  popupEdit,
  inputName,
  inputDescription,
  inputTitle,
  inputUrl,
  cardTemplate,
  cardContainer,
  popupAvatar,
  inputAvatar,
  profileAvatar,
  profileName,
  profileDescription,
} from "./variables.js";
import { Api } from "./Api.js";
import { renderPrependCard } from "./card.js";
import { renderLoading, closePopup } from "./utils.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15/",
  headers: {
    authorization: "71d1de88-4fa7-4dcd-8a4d-ca9958b8c0d0",
    "Content-Type": "application/json",
  },
})


export const submitProfile = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  api.pushUser(inputName.value, inputDescription.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
};

export const submitAddCard = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  api.pushCards(inputTitle.value, inputUrl.value, evt)
    .then((data) => {
      renderPrependCard(data, cardTemplate, cardContainer, data.owner._id);
      closePopup(popupAdd);
      evt.target.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
};

export const submitChangeAvatar = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  api.pushAvatar(inputAvatar.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      evt.target.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
};

// submits
export function renderUserName(name, description, url) {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileAvatar.src = url;
}