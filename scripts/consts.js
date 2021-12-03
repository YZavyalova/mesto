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

const saveButton = popupCard.querySelector('.popup__save-btn');
const template = document.querySelector('.template').content;
const photoCard = template.querySelector('.photo-card');
const cardsList = document.querySelector('.photo__items');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
};
export {
    validationConfig,
    saveButton,
    popupPic,
    popupFigcaption,
    cardLink,
    cardName,
    jobInput,
    nameInput,
    profileJob,
    profileName,
    formCard,
    formProfile,
    popupCloseButtonImage,
    popupCloseButtonCard,
    popupCloseButtonProfile,
    popupAddButtonElement,
    popupEditButtonElement,
    popupImage,
    popupCard,
    popupProfile,
    popupList,
    template, 
    photoCard,
    cardsList,
}