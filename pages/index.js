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
const buttonSaveCard = document.querySelector(".button_type_card-save");
const buttonSaveUser = document.querySelector(".button_type_user-save");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// rendering start cards

initialCards.forEach((card) => {
  renderCard(card, cardTemplate, cardContainer);
  pressButtonsLike();
  pressButtonDelete();
  pressButtonImage();
});

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
function createCard(arr, template) {
  const newCard = template.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  cardImage.src = arr.src;
  cardImage.alt = arr.name;
  newCard.querySelector(".card__title").textContent = arr.name;
  return newCard;
}

// render card
function renderCard(arr, template, container) {
  container.prepend(createCard(arr, template)); // не уверен правильно ли я понял
}

//functon press like
function handleClickLike(evt) {
  evt.target.classList.toggle("button_like_active");
}

function pressButtonsLike() {
  const buttonsLike = document.querySelectorAll(".button_type_like");
  buttonsLike.forEach((btn) => {
    btn.addEventListener("click", handleClickLike);
  });
}
// function for open popup with image
function pressButtonImage() {
  const buttonImage = document.querySelectorAll(".button_type_image");
  buttonImage.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      openPopup(popupImage);
      const popupImg = popupImage.querySelector(".popup__image");
      popupImg.src = evt.target.src;
      popupImg.alt = evt.target.alt;
      popupImage.querySelector(".popup__image-description").textContent =
        evt.target.alt;
    });
  });
}

//function for delete
function pressButtonDelete() {
  const buttonsDel = document.querySelectorAll(".button_type_delete");
  buttonsDel.forEach((btn) => {
    btn.addEventListener("click", () => {
      const deletedItem = btn.closest(".card");
      deletedItem.remove();
    });
  });
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

// change content

// function for make Array from inputs values (for cards)
function createCardData(inputName, inputDescription) {
  const cardData = {};
  cardData.name = inputName;
  cardData.src = inputDescription;
  return cardData;
}

//function for add new card after press save
buttonSaveCard.addEventListener("click", (evt) => {
  evt.preventDefault();
  renderCard(
    createCardData(inputTitle.value, inputUrl.value),
    cardTemplate,
    cardContainer
  );
  pressButtonsLike();
  pressButtonDelete();
  pressButtonImage();
  inputTitle.value = "";
  inputUrl.value = "";
  closePopup(popupAdd);
});

// function for change profile
buttonSaveUser.addEventListener("click", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
});
