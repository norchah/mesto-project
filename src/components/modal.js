import { buttonSubmitDisabled } from "./utils.js";

// open popup
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc); //listener by Esc for opened popup
  // disabled submit button when popups open (but not popup with image)
  if (!popup.classList.contains("popup_type_image")) {
    buttonSubmitDisabled(popup);
  }
};

//close popup
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc); // delete listener by esc
};

//close popups by Esc

export const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};
