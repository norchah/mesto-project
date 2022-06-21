const buttonEdit = document.querySelector('.button_type_edit');
const buttonClose = document.querySelector('.button_type_close');
const buttonsLike = document.querySelectorAll('.button_type_like');
const popup = document.querySelector('.popup');

buttonEdit.addEventListener('click', () => {
    popup.classList.add('popup_opened');
})
buttonClose.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.remove('popup_opened');
})

buttonsLike.forEach(function(btn) {
    btn.addEventListener('click', () => {
        btn.classList.toggle('button_like_active');
    });
});