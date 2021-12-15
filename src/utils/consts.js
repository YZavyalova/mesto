
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
const popupImage = document.querySelector(".popup_type_image");

const popupEditButtonElement = document.querySelector(".profile__edit-btn");
const popupAddButtonElement = document.querySelector(".profile__add-btn");

const formProfile = document.querySelector(".popup__form_profile");
const formCard = document.querySelector(".popup__form_card");

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const cardName = document.querySelector('.popup__input_type_card-name'); 
const cardLink = document.querySelector('.popup__input_type_card-src');

const cardsList = document.querySelector('.photo__items');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
};

const profileConfig = {
    profileName: '.profile__title',
    profileJob: '.profile__description',
};

export {
    validationConfig,
    cardLink,
    cardName,
    formCard,
    formProfile,
    popupAddButtonElement,
    popupEditButtonElement,
    popupImage,
    popupCard,
    popupProfile,
    cardsList,
    profileConfig,
    nameInput,
    jobInput,
}
