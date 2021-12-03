import { Card } from './Card.js'; 
import { initialCards } from './initial-сards.js';
import { openPopup, closePopup, closePopupByClickOverlay, } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { 
    validationConfig,
    cardsList,
    cardLink,
    cardName,
    jobInput,
    nameInput,
    profileJob,
    profileName,
    formCard,
    formProfile,
    popupCloseButtonCard,
    popupCloseButtonProfile,
    popupAddButtonElement,
    popupEditButtonElement,
    popupImage,
    popupCard,
    popupProfile, } from './consts.js';


//изменение данных в полях ввода и закрытие
function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

function renderCard() {
    initialCards.forEach((item) => {
        addCard(item);
    });
}

function addCard(item) {
    const card = new Card(item, '.template');
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
}

renderCard();

//Функция сохранения формы 
function formAddHandler (event) {
    event.preventDefault();
    const addedCard = {
        name: cardName.value,
        link: cardLink.value,
    }
    addCard(addedCard);
    closePopup(popupCard);
    formCard.reset();
}
const formProfileValidation = new FormValidator(validationConfig, formProfile);
const formCardValidation = new FormValidator(validationConfig, formCard);

formProfileValidation.enableValidation();
formCardValidation.enableValidation();

//слушатели
popupAddButtonElement.addEventListener('click', () => {
    openPopup(popupCard);
    formCardValidation.clearValidation();
})

popupEditButtonElement.addEventListener('click', () => {
    formProfileValidation.clearValidation();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupProfile);
})

popupCloseButtonCard.addEventListener('click', () => {
    closePopup(popupCard);
})

popupCloseButtonProfile.addEventListener('click', () => {
    closePopup(popupProfile);
})

popupProfile.addEventListener('click', closePopupByClickOverlay);
popupCard.addEventListener('click', closePopupByClickOverlay);
popupImage.addEventListener('click', closePopupByClickOverlay);

formProfile.addEventListener('submit', formSubmitHandler);

formCard.addEventListener('submit', formAddHandler);