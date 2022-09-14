import { popups } from "./variables.js";
// open popup
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};
//close popup
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

//close popups by Esc
function handlePressEsc(evt) {
  popups.forEach((popup) => {
    if (popup.classList.contains("popup_opened") && evt.key === "Escape") {
      closePopup(popup);
    }
  });
}

export const closePopupByEsc = () => {
  document.addEventListener("keyup", handlePressEsc);
};
