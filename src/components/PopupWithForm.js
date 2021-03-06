import { Popup } from "./Popup";
export class PopupWithForm  extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._currentActiveButton = this._popup.querySelector('.popup__button');
        this._currentActiveButtonText = this._currentActiveButton.textContent;
    }
    _getInputValues() {
        this._formValues = {};
        this._inputs.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    
    close() {
        this._form.reset();
        super.close();
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        })
    }

    renderLoading (isLoading) {
        if (isLoading) {
            this._currentActiveButton.textContent = 'Загрузка...';
        } else {
            this._currentActiveButton.textContent = this._currentActiveButtonText;
        }
    }
}