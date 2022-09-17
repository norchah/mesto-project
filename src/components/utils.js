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
  imageDescription,
} from "./variables.js";
import { renderCard, createCardData } from "./card.js";

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
  openPopup(popupImage);
  imagePopup.src = data.src;
  imagePopup.alt = data.name;
  imageDescription.textContent = data.name;
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
