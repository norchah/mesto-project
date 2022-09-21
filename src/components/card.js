import {
  pressButtonDelete,
  pressButtonsLike,
  pressButtonImage,
} from "./utils.js";
import { MY_ID } from "./variables.js";

//TODO сделать setButtonActive

// create card
const createCard = (cardData, template) => {
  const newCard = template.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const buttonLike = newCard.querySelector(".button_type_like");
  const buttonDel = newCard.querySelector(".button_type_delete");
  const buttonImage = newCard.querySelector(".card__image");
  const likeCount = newCard.querySelector(".card__like-count");
  const likeArr = Array.from(cardData.likes);

  newCard.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;

  likeArr.forEach((el) => {
    if (el._id === MY_ID) {
      buttonLike.classList.add("button_like_active");
    }
  });
  if (cardData.owner._id === MY_ID) {
    buttonDel.classList.add("button_delete_active");
  }

  buttonLike.addEventListener("mouseup", () =>
    pressButtonsLike(cardData._id, likeCount, buttonLike)
  );
  buttonDel.addEventListener("click", () =>
    pressButtonDelete(cardData._id, newCard)
  );
  buttonImage.addEventListener("click", () => pressButtonImage(cardData));
  console.log(cardData.owner);

  return newCard;
};

//если использовать только append или только prepend, то карточки загружаются с одной стороны, а добавляются с другой,
//что б все загружались с одной стороны использую две функции рендера

//for cards from server
export const renderAppendCard = (cardData, template, container) => {
  container.append(createCard(cardData, template));
};

//for add cards
export const renderPrependCard = (cardData, template, container) => {
  container.prepend(createCard(cardData, template));
};
