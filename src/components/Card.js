
export class Card {
    // в конструкторе будут динамические данные,
    // для каждого экземпляра свои
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.photo-card__img');
        this._likeButton = this._element.querySelector('.photo-card__like-btn');
        this._deleteButton = this._element.querySelector('.photo-card__delete-btn');
        this._setListeners();
        // Добавим данные
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.photo-card__text').textContent = this._name;
        // Вернём элемент наружу
        return this._element;
    }
    _setListeners() {
        this._likeButton.addEventListener('click', () => {
            this._makeLike();
        });
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    _makeLike() {
        this._likeButton.classList.toggle('photo-card__like-btn_active');
    }
    _deleteCard() {
        this._element.remove();
        this._element = null
    }
}