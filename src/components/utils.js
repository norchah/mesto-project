// open popup
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc); //listener by Esc for opened popup
};

// close popup
export const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc); // delete listener by esc
};

// close popups by Esc
const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

export function renderLoading(isLoading, btn) {
  if (isLoading) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
  }
}
