import { Card } from './Card.js'; 
import { initialCards } from './initial-сards.js';
import { openPopup, closePopup } from './utils.js';
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
    popupAddButtonElement,
    popupEditButtonElement,
    popupImage,
    popupCard,
    popupProfile, 
    popupPic,
    popupFigcaption,
    popupList,
    } from './consts.js';


//изменение данных в полях ввода и закрытие
function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

function handleCardClick(name, link) {
    popupPic.src = link;
    popupFigcaption.textContent = name;
    popupPic.alt = name;
    openPopup(popupImage);
}

function renderCards() {
    initialCards.forEach(addCard);
}

function createCard(item) {
    const card = new Card(item, '.template', handleCardClick).generateCard();
    return card;
}

function addCard(item) {
    const cardElement = createCard(item);
    cardsList.prepend(cardElement);
}


renderCards();

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

function closePopupByClickOverlay() {
    popupList.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup);
            }
            if (evt.target.classList.contains('popup__close-btn')) {
                closePopup(popup);
            }
        })
    })
}
closePopupByClickOverlay();
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

formProfile.addEventListener('submit', formSubmitHandler);

formCard.addEventListener('submit', formAddHandler);