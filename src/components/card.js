import {
  pressButtonDelete,
  pressButtonsLike,
  pressButtonImage,
} from "./utils.js";

// create card
const createCard = (cardData, template) => {
  const newCard = template.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  cardImage.src = cardData.src;
  cardImage.alt = cardData.name;
  newCard.querySelector(".card__title").textContent = cardData.name;
  const buttonLike = newCard.querySelector(".button_type_like");
  const buttonDel = newCard.querySelector(".button_type_delete");
  const buttonImage = newCard.querySelector(".button_type_image");
  pressButtonsLike(buttonLike);
  pressButtonDelete(buttonDel);
  pressButtonImage(buttonImage);
  return newCard;
};

export const renderCard = (cardData, template, container) => {
  container.prepend(createCard(cardData, template));
};

// function for make Array from inputs values (for cards)
export const createCardData = (inputName, inputDescription) => {
  const cardData = {};
  cardData.name = inputName;
  cardData.src = inputDescription;
  return cardData;
};
