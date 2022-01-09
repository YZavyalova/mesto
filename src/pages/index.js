import '../pages/index.css';
import { Card } from '../components/Card.js'; 
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import { 
    validationConfig,
    cardsList,
    formProfile,
    formCard,
    popupAddButtonElement,
    popupEditButtonElement,
    profileConfig,
    nameInput,
    jobInput,
    formAvatar,
    profileAvatar,
    popupProfile
    } from '../utils/consts.js';

let userId;

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-33',
    headers: {
        authorization: '082e7c30-145f-4e11-a3cd-66bdd63d57bc',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo(profileConfig);

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cardsData, profileInfo]) => {
        userId = profileInfo._id;
        userInfo.setUserInfo(profileInfo);
        cardList.renderItems(cardsData);
})
    .catch((err) => {
        console.log(err);
});


const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
        }
    },
    cardsList);


const popupWithFormProfile = new PopupWithForm ('.popup_type_profile', (data) => {
    popupWithFormProfile.renderLoading(true)
    api.setUserInfo(data)
    .then((res) => {
        userInfo.setUserInfo(res)
        popupWithFormProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
        popupWithFormProfile.renderLoading(false);
    })
});

const popupAvatar = new PopupWithForm('.popup_type_avatar', (data) => {
    popupAvatar.renderLoading(true)
    api.setUserAvatar(data)
    .then((res) => {
        userInfo.setUserInfo(res);
        popupAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
        popupAvatar.renderLoading(false);
    })
})


const createCard = (data) => {
    const card = new Card(data, '.template', userId,
    {
        handleCardClick: () => {
            popupWithImage.open(data);
        },
        handleDeleteIconClick: () => {
            popupWithDel.open();
            popupWithDel.anotherSubmitHandler(() => {
                api.deleteCard(data)
                    .then(() => {
                        card.deleteCard();
                        popupWithDel.close();
                    })
                    .catch(err => console.log(err))
                })
        },
        handleLikeClick: () => {
            api.setLike(data)
                .then((res) => {
                    card.setLike();
                    card.countLikes(res);
                })
                .catch(err => console.log(err))
        },
        handleDislikeClick: () => {
            api.unsetLike(data)
                .then((res) => {
                    card.unsetLike();
                    card.countLikes(res);
                })
                .catch(err => console.log(err))
        }
    })
    
    return card.generateCard();
}
const popupWithImage = new PopupWithImage('.popup_type_image');


const popupWithFormCard = new PopupWithForm ('.popup_type_card', (data) => {
    popupWithFormCard.renderLoading(true);
    api.postCard(data)
        .then((item) => {
            const newCard = createCard(item);
            cardList.addItem(newCard);
            popupWithFormCard.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupWithFormCard.renderLoading(false);
        })
});

const popupWithDel = new PopupWithSubmit('.popup_type_deleting-card');

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

profileAvatar.addEventListener('click', () => {
    formAvatarValidation.clearValidation();
    popupAvatar.open();
})


const formProfileValidation = new FormValidator(validationConfig, formProfile);
const formCardValidation = new FormValidator(validationConfig, formCard);
const formAvatarValidation = new FormValidator(validationConfig, formAvatar);

formProfileValidation.enableValidation();
formCardValidation.enableValidation();
formAvatarValidation.enableValidation();

popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithImage.setEventListeners();
popupAvatar.setEventListeners();
popupWithDel.setEventListeners();

