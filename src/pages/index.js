import '../pages/index.css';
import { Card } from '../components/Card.js'; 
import { Section } from '../components/Section.js';
import { initialCards } from '../utils/initial-сards.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { 
    validationConfig,
    cardsList,
    formProfile,
    formCard,
    popupAddButtonElement,
    popupEditButtonElement,
    profileConfig,
    nameInput,
    jobInput
    } from '../utils/consts.js';

const userInfo = new UserInfo(profileConfig);

const popupWithFormProfile = new PopupWithForm ('.popup_type_profile', (data) => {
    userInfo.setUserInfo(data);
});

const popupWithImage = new PopupWithImage('.popup_type_image');

const createCard = (item) => {
    console.log(item);
    const card = new Card(item, '.template', (name, link) => {
            popupWithImage.open(name, link);
        });
    return card.generateCard();
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
        }
    },
    cardsList);
cardList.renderItems();

const popupWithFormCard = new PopupWithForm ('.popup_type_card', (item) => {
    const newCard = createCard(item);
    cardList.addItem(newCard);
});

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

const formProfileValidation = new FormValidator(validationConfig, formProfile);
const formCardValidation = new FormValidator(validationConfig, formCard);

formProfileValidation.enableValidation();
formCardValidation.enableValidation();

popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithImage.setEventListeners();
