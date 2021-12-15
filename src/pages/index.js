import '../pages/index.css';
import { Card } from '../components/Card.js'; 
import { Section } from '../components/Section.js';
import { initialCards } from '../components/initial-сards.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { 
    validationConfig,
    cardsList,
    cardLink,
    formProfile,
    formCard,
    cardName,
    popupAddButtonElement,
    popupEditButtonElement,
    popupImage,
    popupCard,
    popupProfile,
    profileConfig,
    nameInput,
    jobInput
    } from '../utils/consts.js';


const userInfo = new UserInfo(profileConfig);

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.template', handleCardClick);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
        },
    },
    cardsList);

cardList.renderItems();

const popupWithFormProfile = new PopupWithForm (popupProfile, (userData) => {
    userInfo.setUserInfo(userData);
});

const popupWithFormCard = new PopupWithForm (popupCard, () => {
    const addedCard = [{
        name: cardName.value,
        link: cardLink.value,
    }]
    const newCardList = new Section({
        items: addedCard,
        renderer: (item) => {
            const card = new Card(item, '.template', handleCardClick);
            const cardElement = card.generateCard();
            newCardList.addItem(cardElement);
            }
        },
        cardsList);
        newCardList.renderItems();
});

const formProfileValidation = new FormValidator(validationConfig, formProfile);
const formCardValidation = new FormValidator(validationConfig, formCard);

formProfileValidation.enableValidation();
formCardValidation.enableValidation();

function handleCardClick(name, link) {
    const popupWithImage = new PopupWithImage(popupImage);
    popupWithImage.open(name, link);
    popupWithImage.setEventListeners();
}

popupEditButtonElement.addEventListener('click', () => {
    formProfileValidation.clearValidation();
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
    popupWithFormProfile.open();
})

popupAddButtonElement.addEventListener('click', () => {
    formCardValidation.clearValidation();
    popupWithFormCard.open();
})

popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();