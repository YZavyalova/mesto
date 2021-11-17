const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupList = Array.from(document.querySelectorAll('.popup'));

const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
const popupImage = document.querySelector(".popup_type_image");

const popupEditButtonElement = document.querySelector(".profile__edit-btn");
const popupAddButtonElement = document.querySelector(".profile__add-btn");

const popupCloseButtonProfile = document.querySelector(".popup__close-btn_profile");
const popupCloseButtonCard = document.querySelector(".popup__close-btn_card");
const popupCloseButtonImage = document.querySelector(".popup__close-btn_image");

const formProfile = document.querySelector(".popup__form_profile");
const formCard = document.querySelector(".popup__form_card");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const cardName = document.querySelector('.popup__input_type_card-name'); 
const cardLink = document.querySelector('.popup__input_type_card-src');

const popupFigcaption = popupImage.querySelector('.popup__figcaption');
const popupPic = popupImage.querySelector('.popup__pic');

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

//изменение данных в полях ввода и закрытие
function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

const template = document.querySelector('.template').content;
const cardsList = document.querySelector('.photo__items');
const photoCard = template.querySelector('.photo-card');

//Функция наполнения каточек
function createCard(name, link) {
    const photoCard = template.querySelector('.photo-card').cloneNode(true);
    photoCard.querySelector(".photo-card__text").innerText = name;
    photoCard.querySelector(".photo-card__img").src = link;
    photoCard.querySelector(".photo-card__text").alt = name;
    setListeners(photoCard);
    return photoCard;
}

//открытие попапа с картинкой
function openImagePopup(element) {
    const placesText = element.querySelector('.photo-card__text'); 
    const placesPhoto = element.querySelector('.photo-card__img');
    popupFigcaption.textContent = placesText.textContent;
    popupPic.src = placesPhoto.src;
    popupPic.alt = placesPhoto.alt;
    openPopup(popupImage);
}

//слушатели
function setListeners(element) {
    element.querySelector(".photo-card__like-btn").addEventListener("click", makeLike);
    element.querySelector(".photo-card__delete-btn").addEventListener("click", deleteCard);
    element.querySelector(".photo-card__img").addEventListener("click", function () {
        openImagePopup(element);
    })
}

//Функция сохранения формы 
function formAddHandler (event) {
    event.preventDefault();
    const addedCard = createCard (cardName.value, cardLink.value);
    cardsList.prepend(addedCard);
    closePopup(popupCard);
    cardName.value = "";
    cardLink.value = "";
}

//Функция добавление карточек 
function prependCard() {
    initialCards.forEach((item) => {
        const newCard = createCard(item.name, item.link);
        cardsList.prepend(newCard);
    })
}

prependCard();
//функция лайк
function makeLike(event) {
    event.target.classList.toggle('photo-card__like-btn_active');
}

//Функция удаления карточки
function deleteCard(event) {
    event.target.closest('.photo-card').remove();
}
//функция сабмита при нажатии Enter
function keyHandler(evt) {
    if (evt.key === 'Enter') {
        createCard(cardName.value, cardLink.value);
    }
} 
cardName.addEventListener('keydown', keyHandler);
cardLink.addEventListener('keydown', keyHandler);

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

document.addEventListener('mousedown',closePopupByClickOverlay);

//слушатели
popupAddButtonElement.addEventListener('click', function() {
    openPopup(popupCard);
})

popupEditButtonElement.addEventListener('click', function() {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

popupCloseButtonCard.addEventListener('click', function() {
    closePopup(popupCard);
})

popupCloseButtonProfile.addEventListener('click', function() {
    closePopup(popupProfile);
})
popupCloseButtonImage.addEventListener('click', function() {
    closePopup(popupImage);
})

formProfile.addEventListener('submit', formSubmitHandler);
formCard.addEventListener('submit', formAddHandler);