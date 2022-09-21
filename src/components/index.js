import "../index.css";
import { enableValidation, buttonSubmitDisabled } from "./validation.js";
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
} from "./variables.js";
import { openPopup, closePopup } from "./modal.js";
import { submitAddCard, submitChangeAvatar, submitProfile } from "./utils.js";
import { getCards, getUser } from "./api.js";

// to get start data
getUser();
getCards();

// buttons open popups
buttonEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
  buttonSubmitDisabled(popupAdd);
});

buttonAvatar.addEventListener("click", () => {
  openPopup(popupAvatar);
});

//close popups by overlay and button
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
