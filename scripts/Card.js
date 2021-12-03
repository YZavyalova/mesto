import { popupPic, popupFigcaption, popupCloseButtonImage, popupImage,} from './consts.js';
import { openPopup } from './utils.js';

export class Card {
    // в конструкторе будут динамические данные,
    // для каждого экземпляра свои
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
     // забираем разметку из HTML и клонируем элемент
        const photoCard = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.photo-card')
        .cloneNode(true);
    
  // вернём DOM-элемент карточки
        return photoCard;
    }
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setListeners();
        // Добавим данные
        this._element.querySelector('.photo-card__img').src = this._link;
        this._element.querySelector('.photo-card__text').textContent = this._name;
        this._element.querySelector('.photo-card__img').alt = this._name;
        // Вернём элемент наружу
        return this._element;
    }
    _setListeners() {
        this._element.querySelector('.photo-card__like-btn').addEventListener('click', () => {
            this._makeLike();
        });
        this._element.querySelector('.photo-card__delete-btn').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.photo-card__img').addEventListener('click', () => {
            this._openImagePopup();
        });
        popupCloseButtonImage.addEventListener('click', () => {
            this._closePopup();
        })
    }
    _makeLike() {
        this._element.querySelector('.photo-card__like-btn').classList.toggle('photo-card__like-btn_active');
    }
    _deleteCard() {
        this._element.closest('.photo-card').remove();
    }
    _openImagePopup() {
        popupPic.src = this._link;
        popupFigcaption.textContent = this._name;
        popupPic.alt = this._name;
        openPopup(popupImage);
    }
    _closePopup() {
        popupImage.classList.remove('popup_opened');
    }
}
