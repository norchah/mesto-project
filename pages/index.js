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
const buttonsSaveCard = document.querySelector(".button_type_card-save");
const buttonsSaveUser = document.querySelector(".button_type_user-save");

//Array with started cards info
const initialCards = [
  {
    name: "Архыз",
    src: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    src: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    src: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    src: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    src: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    src: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// rendering start cards

initialCards.forEach((card) => {
  renderCard(card, cardTemplate, cardContainer);
});

//declaration functions

// open popup
function popupOpened(popup) {
  popup.classList.add("popup_opened");
}

// close popup
function popupClosed(popup) {
  popup.classList.remove("popup_opened");
}

// render card
function renderCard(arr, template, container) {
  const newCard = template.querySelector(".card").cloneNode(true);
  newCard.querySelector(".card__image").src = arr.src;
  newCard.querySelector(".card__image").alt = arr.name;
  newCard.querySelector(".card__title").textContent = arr.name;
  container.prepend(newCard);
  pressButtonsLike();
  pressButtonDelete();
  pressButtonImage();
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
      popupOpened(popupImage);
      popupImage.querySelector(".popup__image").src = evt.target.src;
      popupImage.querySelector(".popup__image").alt = evt.target.alt;
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
  popupOpened(popupEdit);
});

buttonAdd.addEventListener("click", () => {
  popupOpened(popupAdd);
});

// button close popups
buttonsClose.forEach((btn) => {
  btn.addEventListener("click", () => {
    popupClosed(btn.parentElement.parentElement);
  });
});

// change content

// function for make Array from inputs values (for cards)
function createObjCard(inputName, inputDescription) {
  let arr = [];
  arr.name = inputName;
  arr.src = inputDescription;
  return arr;
}

//function for add new card after press save
buttonsSaveCard.addEventListener("click", (evt) => {
  evt.preventDefault();
  renderCard(
    createObjCard(inputTitle.value, inputUrl.value),
    cardTemplate,
    cardContainer
  );
  inputTitle.value = "";
  inputUrl.value = "";
  popupClosed(popupAdd);
});

// function for change profile
buttonsSaveUser.addEventListener("click", (evt) => {
  evt.preventDefault();
  document.querySelector(".profile__name").textContent = inputName.value;
  document.querySelector(".profile__description").textContent =
    inputDescription.value;
  inputName.value = "";
  inputDescription.value = "";
  popupClosed(popupEdit);
});
