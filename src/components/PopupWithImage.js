import { Popup } from "./Popup";
export class PopupWithImage  extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popupPic = popupSelector.querySelector('.popup__pic');
        this._popupFigcaption = popupSelector.querySelector('.popup__figcaption');
    }
    open(name, link) {
        this._popupPic.src = link;
        this._popupFigcaption.textContent = name;
        this._popupPic.alt = name;
        super.open();
    }
}