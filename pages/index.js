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
const forms = document.querySelectorAll(".form");

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
  const buttonsLike = newCard.querySelectorAll(".button_type_like");
  const buttonsDel = newCard.querySelectorAll(".button_type_delete");
  const buttonsImage = newCard.querySelectorAll(".button_type_image");
  pressButtonsLike(buttonsLike);
  pressButtonDelete(buttonsDel);
  pressButtonImage(buttonsImage);
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

function pressButtonsLike(buttonsArr) {
  buttonsArr.forEach((evt) => {
    evt.addEventListener("click", handleClickLike);
  });
}
// function for open popup with image
function pressButtonImage(buttonsArr) {
  buttonsArr.forEach((btn) => {
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
function pressButtonDelete(buttonsArr) {
  buttonsArr.forEach((btn) => {
    btn.addEventListener("click", () => {
      const deletedItem = btn.closest(".card");
      deletedItem.remove();
    });
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

// change content

// forms submits

forms.forEach((form) => {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    switch (form.getAttribute("name")) {
      case "card":
        renderCard(
          createCardData(inputTitle.value, inputUrl.value),
          cardTemplate,
          cardContainer
        );
        inputTitle.value = "";
        inputUrl.value = "";
        closePopup(popupAdd);
        break;
      case "author":
        profileName.textContent = inputName.value;
        profileDescription.textContent = inputDescription.value;
        closePopup(popupEdit);
        break;
      default:
        const arr = ["Wednesday", "Thursday", "Friday"];
        let ask = "";
        arr.forEach((item) => {
          ask = ask + item.slice(0, 1);
          return ask;
        });
        console.log(`${ask} ?`);
    }
  });
});

// rendering start cards

initialCards.forEach((card) => {
  renderCard(card, cardTemplate, cardContainer);
});
