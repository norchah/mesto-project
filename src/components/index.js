import "../index.css";
import { enableValidation } from "./validation.js";
import {
  buttonEdit,
  buttonAdd,
  buttonsClose,
  popupEdit,
  popupAdd,
  cardTemplate,
  cardContainer,
  inputName,
  inputDescription,
  profileName,
  profileDescription,
  formProfile,
  formAddCard,
  popups,
} from "./variables.js";
import { initialCards } from "./initialCards.js";
import { openPopup, closePopup, closePopupByEsc } from "./modal.js";
import { submitAddCard, submitProfile } from "./utils.js";
import { renderCard } from "./card.js";

// buttons open popups
buttonEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

//close by esc
closePopupByEsc();

//close by overlay
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    closePopup(evt.target);
  });
});

// button close popups
buttonsClose.forEach((btn) => {
  btn.addEventListener("click", () => {
    closePopup(btn.parentElement.parentElement);
  });
});

// forms submits
formProfile.addEventListener("submit", submitProfile);
formAddCard.addEventListener("submit", submitAddCard);

// rendering start cards
initialCards.forEach((card) => {
  renderCard(card, cardTemplate, cardContainer);
});

// validation forms
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_disabled",
  inputErrorClass: "form__input_error",
  errorClass: "form__item-error_active",
});
