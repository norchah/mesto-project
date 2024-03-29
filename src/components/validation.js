// show errors
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(errorClass);
};

// hide errors
const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  inputError.textContent = "";
  inputError.classList.remove(errorClass);
};

// set disable buttons
function setDisableBtn(btnEl) {
  btnEl.setAttribute("disabled", true)
}

// check errors
const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

// check valid inputs
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// state of submit buttons
const toggleButtonState = (buttonElement, inactiveButtonClass, inputList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    setDisableBtn(buttonElement);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

// set listeners
const setEventListener = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(
    buttonElement,
    inactiveButtonClass,
    inputList,
    inputSelector
  );
  inputList.forEach((inputElement) => {
    // disabled button when reset form
    formElement.addEventListener('reset', () => { // Интересная фича, спасибо
      setTimeout(() => { // из-за сет таймаута обработчик уходит в конец стека и ждет когда завершится полная очистка формы (напоминалка для себя)
        toggleButtonState(
          buttonElement,
          inactiveButtonClass,
          inputList,
          inputSelector
        );
      }, 0)
    })
    inputElement.addEventListener("input", () => {
      // enable button while input
      toggleButtonState(
        buttonElement,
        inactiveButtonClass,
        inputList,
        inputSelector
      );
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
    });
  });
};

// on validation
export const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListener(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

// disabled submit button
export const disableButtonSubmit = (btn) => {
  setDisableBtn(btn);
  btn.classList.add("button_type_disabled");
};