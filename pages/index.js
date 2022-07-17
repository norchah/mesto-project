import { initialCards } from "./initialCards.js";
const buttonEdit = document.querySelector(".button_type_edit");
const buttonAdd = document.querySelector(".button_type_add");
const buttonsClose = document.querySelectorAll(".button_type_close");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_image");
const cardTemplate = document.querySelector("#card_template").content;
const cardContainer = document.querySelector(".cards");
const inputName = document.querySelector(".form__item_type_user-name");
const inputDescription = document.querySelector(
  ".form__item_type_user-descrition"
);
const inputTitle = document.querySelector(".form__item_type_card-title");
const inputUrl = document.querySelector(".form__item_type_card-link");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formProfile = document.querySelector(".form_edit_profile");
const formAddCard = document.querySelector(".form_add_card");

//declaration functions

// open popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// close popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// create card
function createCard(cardData, template) {
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
}

// render card
function renderCard(cardData, template, container) {
  container.prepend(createCard(cardData, template));
}

//functons for press like
function handleClickLike(evt) {
  evt.target.classList.toggle("button_like_active");
}
function pressButtonsLike(button) {
  button.addEventListener("click", handleClickLike);
}

// function for open popup with image
function pressButtonImage(button) {
  button.addEventListener("click", (evt) => {
    openPopup(popupImage);
    const popupImg = popupImage.querySelector(".popup__image");
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupImage.querySelector(".popup__image-description").textContent =
      evt.target.alt;
  });
}

//function for forms
function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
}

function submitAddCard(evt) {
  evt.preventDefault();
  renderCard(
    createCardData(inputTitle.value, inputUrl.value),
    cardTemplate,
    cardContainer
  );
  inputTitle.value = "";
  inputUrl.value = "";
  closePopup(popupAdd);
}

//function for delete
function pressButtonDelete(button) {
  button.addEventListener("click", () => {
    const deletedItem = button.closest(".card");
    deletedItem.remove();
  });
}

// function for make Array from inputs values (for cards)
function createCardData(inputName, inputDescription) {
  const cardData = {};
  cardData.name = inputName;
  cardData.src = inputDescription;
  return cardData;
}

// buttons open popups
buttonEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  console.log(inputName.value);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

// button close popups
buttonsClose.forEach((btn) => {
  btn.addEventListener("click", () => {
    closePopup(btn.parentElement.parentElement);
  });
});

// forms submits
formProfile.addEventListener("submit", submitProfile);
formAddCard.addEventListener("submit", submitAddCard);

// rendering start cards
initialCards.forEach((card) => {
  renderCard(card, cardTemplate, cardContainer);
});
