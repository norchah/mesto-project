import {
  popupImage,
  imageInPopup,
  imageDescription,
} from "./variables.js";
import { pushLike, delLike, deleteCard } from "./api.js";
import { openPopup } from "./utils.js";

// likes functions
const pressButtonsLike = (cardId, count, btn) => {
  if (btn.classList.contains("button_like_active")) {
    delLike(cardId, count)
      .then((data) => {
        count.textContent = data.likes.length;
        btn.classList.remove("button_like_active");
      })
      .catch((err) => console.log(err));
  } else {
    pushLike(cardId, count)
      .then((data) => {
        count.textContent = data.likes.length;
        btn.classList.add("button_like_active");
      })
      .catch((err) => console.log(err));
  }
};

// open full image from card image
const pressButtonImage = (data) => {
  openPopup(popupImage);
  imageInPopup.src = data.link;
  imageInPopup.alt = data.name;
  imageDescription.textContent = data.name;
};

// create card
const createCard = (data, template, id) => {
  const newCard = template.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const buttonLike = newCard.querySelector(".button_type_like");
  const buttonDel = newCard.querySelector(".button_type_delete");
  const buttonImage = newCard.querySelector(".card__image");
  const likeCount = newCard.querySelector(".card__like-count");
  const likesArr = data.likes;
  newCard.querySelector(".card__title").textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  likeCount.textContent = data.likes.length;
  likesArr.forEach((el) => {
    if (el._id === id) {
      buttonLike.classList.add("button_like_active");
    }
  });
  if (data.owner._id === id) {
    buttonDel.classList.add("button_delete_active");
  }

  buttonLike.addEventListener("mouseup", () =>
    pressButtonsLike(data._id, likeCount, buttonLike)
  );
  buttonDel.addEventListener("click", () =>
    pressButtonDelete(data._id, newCard)
  );
  buttonImage.addEventListener("click", () => pressButtonImage(data));
  return newCard;
};

// for cards from server
export const renderAppendCard = (data, template, container, id) => {
  container.append(createCard(data, template, id));
};

// for add cards
export const renderPrependCard = (data, template, container, id) => {
  container.prepend(createCard(data, template, id));
};

// delete function
export const pressButtonDelete = (cardId, card) => {
  deleteCard(cardId)
      .then(() => {
        card.remove();
      })
      .catch((err) => console.log(err))
};
