import { openPopup, closePopup } from "./modal.js";
import {
  popupImage,
  profileName,
  profileDescription,
  cardTemplate,
  cardContainer,
  popupAdd,
  popupEdit,
  inputName,
  inputDescription,
  inputTitle,
  inputUrl,
  imagePopup,
  ImageDescription,
} from "./variables.js";
import { renderCard, createCardData } from "./card.js";

//disabled submit button
export const buttonSubmitDisabled = (popup) => {
  const btnSave = popup.querySelector(".button_type_save");
  btnSave.setAttribute("disabled", true);
  btnSave.classList.add("button_type_disabled");
};

// likes functions
export const pressButtonsLike = (btn) => {
  btn.classList.toggle("button_like_active");
};

//delete function
export const pressButtonDelete = (card) => {
  card.remove();
};

// open full image from card image
export const pressButtonImage = (data) => {
  const popupImg = popupImage.querySelector(".popup__image"); //поиск элементов происходит только в открытом попапе (с картинкой)
  const popupDescription = popupImage.querySelector(
    ".popup__image-description"
  );
  openPopup(popupImage);
  popupImg.src = data.src;
  popupImg.alt = data.name;
  popupDescription.textContent = data.name;
};

//submits
export const submitProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
};

export const submitAddCard = (evt) => {
  evt.preventDefault();
  renderCard(
    createCardData(inputTitle.value, inputUrl.value),
    cardTemplate,
    cardContainer
  );
  inputTitle.value = "";
  inputUrl.value = "";
  closePopup(popupAdd);
};
