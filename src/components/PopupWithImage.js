import { Popup } from "./Popup";
export class PopupWithImage  extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPic = this._popup.querySelector('.popup__pic');
        this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
    }
    open (name, link) {
        this._popupPic.src = link;
        this._popupFigcaption.textContent = name;
        this._popupPic.alt = name;
        super.open();
    }
}