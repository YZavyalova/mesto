//Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

//закрытие окон на нажатие Esc
function closePopupEsc(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(popupOpened);
    };
}

//закрытие попапа кликом на область
function closePopupByClickOverlay(evt){
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup_opened')){
        closePopup(popupOpened);
    };
};

export { openPopup, closePopup, closePopupEsc, closePopupByClickOverlay, };
