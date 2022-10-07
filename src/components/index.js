import "../index.css";
import { enableValidation } from "./validation.js";
import {
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  popupEdit,
  popupAdd,
  popupAvatar,
  inputName,
  inputDescription,
  profileName,
  profileDescription,
  formProfile,
  formAddCard,
  formChangeAvatar,
  popups,
  cardTemplate,
  cardContainer,
} from "./variables.js";
import {
  submitAddCard,
  submitProfile,
  submitChangeAvatar,
  renderUserName,
} from "./modal.js";
import {  openPopup, closePopup } from "./utils.js";
import { getCards, getUserInfo } from "./api.js";
import { renderAppendCard } from "./card.js";

let userId;

// to get start data
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    renderUserName(userData.name, userData.about, userData.avatar);
    cardsData.forEach((card) => {
      renderAppendCard(card, cardTemplate, cardContainer, userId);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// buttons open popups
buttonEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

buttonAvatar.addEventListener("click", () => {
  openPopup(popupAvatar);
});

// close popups by overlay and button
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("button_type_close")
    ) {
      closePopup(popup);
    }
  });
});

// forms submits
formProfile.addEventListener("submit", submitProfile);
formAddCard.addEventListener("submit", submitAddCard);
formChangeAvatar.addEventListener("submit", submitChangeAvatar);

// validation forms
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_disabled",
  inputErrorClass: "form__input_error",
  errorClass: "form__item-error_active",
});
