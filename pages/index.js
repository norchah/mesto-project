const buttonEdit = document.querySelector('.button_type_edit');
const popup = document.querySelector('.popup');

buttonEdit.addEventListener('click', () => {
    popup.classList.add('popup_opened');
})