import { Popup } from "./Popup";
export class PopupWithForm  extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputs = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
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
            this.close();
        })
    }
}