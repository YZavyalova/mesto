
export class Card {
    constructor(data, cardSelector, userId, {handleCardClick, handleDeleteIconClick, handleLikeClick, handleDislikeClick}) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._owner = data.owner._id;
        this._userId = userId;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDislikeClick = handleDislikeClick;
    }
    _getTemplate() {
        const photoCard = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.photo-card')
        .cloneNode(true);

        return photoCard;
    }


    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.photo-card__img');
        this._likeButton = this._element.querySelector('.photo-card__like-btn');
        this._deleteButton = this._element.querySelector('.photo-card__delete-btn');
        this._likeNumber = this._element.querySelector('.photo-card__like-numbers');
        this._setListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.photo-card__text').textContent = this._name;
        this._likeNumber.textContent = this._likes.length;

        if (this._userId !== this._owner) {
            this._deleteButton.style.visibility = 'hidden';
        };
        
        const isLiked = this._likes.some(({_id}) => _id === this._userId); 

        if (isLiked) {
            this._likeButton.classList.add('photo-card__like-btn_active')
        };

        return this._element;
    }
    
    _setListeners() {
        this._likeButton.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('photo-card__like-btn_active')) {
                this._handleDislikeClick(evt, this._likeNumber);
            } else {
                this._handleLikeClick(evt, this._likeNumber);
            }
        });

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteIconClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }
}