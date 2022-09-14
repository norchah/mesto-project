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
} from "./variables.js";
import { renderCard, createCardData } from "./card.js";

// likes functions
const handleClickLike = (evt) => {
  evt.target.classList.toggle("button_like_active");
};

export const pressButtonsLike = (button) => {
  button.addEventListener("click", handleClickLike);
};

// open full image from card image
export const pressButtonImage = (button) => {
  button.addEventListener("click", (evt) => {
    openPopup(popupImage);
    const popupImg = popupImage.querySelector(".popup__image");
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupImage.querySelector(".popup__image-description").textContent =
      evt.target.alt;
  });
};

//delete card
export const pressButtonDelete = (button) => {
  button.addEventListener("click", () => {
    const deletedItem = button.closest(".card");
    deletedItem.remove();
  });
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
