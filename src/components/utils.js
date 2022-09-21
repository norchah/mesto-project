import { openPopup } from "./modal.js";
import {
  popupImage,
  profileName,
  profileDescription,
  inputName,
  inputDescription,
  inputTitle,
  inputUrl,
  inputAvatar,
  imagePopup,
  imageDescription,
  profileAvatar,
} from "./variables.js";
import {
  pushCards,
  pushUser,
  deleteCard,
  pushAvatar,
  pushLike,
  delLike,
} from "./api.js";

// likes functions
//Так как при загрузке карточки кнопке лайка добавляется модификатор (если в списке айди лайков есть мой),
//то в этой функции запросы отравляются по наличию или отстутсвию этого модификатора
export const pressButtonsLike = (cardId, count, btn) => {
  if (btn.classList.contains("button_like_active")) {
    delLike(count, cardId);
    btn.classList.remove("button_like_active");
  } else {
    pushLike(count, cardId);
    btn.classList.add("button_like_active");
  }
};

//delete function
export const pressButtonDelete = (cardId, card) => {
  deleteCard(cardId);
  card.remove();
};

// open full image from card image
export const pressButtonImage = (data) => {
  openPopup(popupImage);
  imagePopup.src = data.link;
  imagePopup.alt = data.name;
  imageDescription.textContent = data.name;
};

//submits
export const submitProfile = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.target);
  pushUser(inputName.value, inputDescription.value, evt.target);
};

export const submitAddCard = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.target);
  pushCards(inputTitle.value, inputUrl.value, evt.target);
  inputTitle.value = "";
  inputUrl.value = "";
};

export const submitChangeAvatar = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt.target);
  pushAvatar(inputAvatar.value, evt.target);
};

export function renderUserName(name, description, url) {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileAvatar.src = url;
}

export function renderLoading(isLoading, evt) {
  const buttonSave = evt.querySelector(".button_type_save");
  if (isLoading) {
    buttonSave.textContent = "Сохранение...";
  } else {
    buttonSave.textContent = "Сохранить";
  }
}
